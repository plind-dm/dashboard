import { NextApiRequest, NextApiResponse } from 'next'
import { getTransactionHistory } from '../../api-services/zapper.services'
import { Networks } from '../../types'
import { getTransactions, getInternalTransactions } from '../../api-services/shyft-api.services'
import { Transaction, SubTransaction, ShyftTransaction, ShyftInternalTransaction } from '../../types'
import { weiToShft } from '../../api-services/web3.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { address, currentNetworkName } = req.query
  if (currentNetworkName === Networks.SHYFT || currentNetworkName === Networks.SHYFT_TESTNET) {
    const result = await getTransactions(address as string)
    const shyftTransactions = new Array<Transaction>()
    if (result) {
      await Promise.all(
        result.map(async (tx: ShyftTransaction) => {
          const subTransactions = new Array<SubTransaction>()
          const subTransaction: SubTransaction = {
            type: tx.from === address ? 'outgoing' : 'incoming',
            symbol: 'SHFT',
            amount: Number.parseFloat(weiToShft(tx.value)),
            address: address as string
          }
          subTransactions.push(subTransaction)
          const transaction: Transaction = {
            network: currentNetworkName,
            hash: tx.hash,
            blockNumber: tx.blockNumber,
            name: tx.from === address ? 'Send' : 'Receive',
            direction: tx.from === address ? 'outgoing' : 'incoming',
            timeStamp: tx.timeStamp,
            symbol: 'SHFT',
            address: address as string,
            amount: weiToShft(tx.value),
            from: tx.from,
            destination: tx.to,
            contract: tx.contractAddress,
            subTransactions: subTransactions,
            nonce: tx.nonce,
            gasPrice: Number(weiToShft(tx.gasPrice)),
            gasLimit: Number.parseFloat(
              weiToShft((Number.parseFloat(tx.gasPrice) * Number.parseFloat(tx.gas)).toString())
            ),
            input: tx.input,
            gas: Number.parseFloat(
              weiToShft((Number.parseFloat(tx.gasPrice) * Number.parseFloat(tx.gasUsed)).toString())
            ),
            txSuccessful: tx.isError === '0' ? true : false,
            account: address.toString(),
            destinationEns: null,
            accountEns: null
          }
          if (tx.value && Number(tx.value) === 0) {
            const internalTxs: ShyftInternalTransaction[] = await getInternalTransactions(tx.hash as string)
            const internalTxIndex = await internalTxs.findIndex((i: ShyftInternalTransaction) => {
              return i.value != 0
            })
            const internalTx: ShyftInternalTransaction = internalTxs[internalTxIndex]
            if (internalTx) {
              transaction.amount = weiToShft(internalTx.value.toString())
              transaction.name = internalTx.from === address ? 'Send' : 'Receive'
              transaction.direction = internalTx.from === address ? 'outgoing' : 'incoming'
              transaction.from = internalTx.from
              transaction.destination = internalTx.to
              transaction.subTransactions[0].type = internalTx.from === address ? 'outgoing' : 'incoming'
              transaction.subTransactions[0].amount = Number.parseFloat(weiToShft(internalTx.value.toString()))
            }
          }
          if (transaction.amount && Number(transaction.amount) != 0) shyftTransactions.push(transaction)
        })
      )
    }
    res
      .status(200)
      .json(shyftTransactions.sort((a: Transaction, b: Transaction) => (a.timeStamp < b.timeStamp ? 1 : -1)))
  } else {
    const result = await getTransactionHistory(address as string, currentNetworkName as string)
    res.status(200).json(result)
  }
}
