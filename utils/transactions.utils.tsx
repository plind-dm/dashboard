import { Networks, Transaction } from '../types'
import groupBy from 'lodash.groupby'
import { unix } from 'moment'
import dummyImage from '../public/images/test/dummy-image.svg'

export const groupTransactionsByDate = (transactions: Array<Transaction>): unknown => {
  const transactionsWithDate = transactions.map((transaction) => {
    const date = unix(parseInt(transaction.timeStamp)).format('MMMM Do YYYY')
    return { ...transaction, date: date }
  })
  const groupedTransactions = groupBy(transactionsWithDate, 'date')
  return Object.keys(groupedTransactions).map(function (key) {
    return { date: key, transactions: groupedTransactions[key] }
  })
}

export const imageGetter = (
  setTransactionImage: (dummyImage: string) => void,
  currentTransaction: Transaction
): void => {
  const transactionImageUrl = `https://storage.googleapis.com/zapper-fi-assets/tokens/${currentTransaction.network}/${currentTransaction.address}.png`
  fetch(transactionImageUrl).then((response) =>
    response.status === 404 ? setTransactionImage(dummyImage) : setTransactionImage(transactionImageUrl)
  )
}

export const getImageSrc = (network: string, address: string): Promise<string> => {
  let transactionImageUrl = ''
  if (network === Networks.SHYFT || network === Networks.SHYFT_TESTNET) {
    transactionImageUrl = `https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0xb17c88bda07d28b3838e0c1de6a30eafbcf52d85.png`
  } else {
    transactionImageUrl = `https://storage.googleapis.com/zapper-fi-assets/tokens/${network}/${address}.png`
  }
  return fetch(transactionImageUrl).then((response) => {
    if (response.status === 404) {
      return dummyImage
    }
    return transactionImageUrl
  })
}

export const getBaseNetworkScanUri = (network: Networks): string => {
  let uri = ''
  switch (network) {
    case Networks.ETHEREUM:
      uri = 'https://etherscan.io/tx/'
      break
    case Networks.POLYGON:
      uri = 'https://polygonscan.com/tx/'
      break
    case Networks['BINANCE-SMART-CHAIN']:
      uri = 'https://bscscan.com/tx/'
      break
    case Networks.SHYFT_TESTNET:
      uri = 'http://bx.testnet.shyft.network/tx/'
      break
    case Networks.SHYFT:
      uri = 'http://bx.shyft.network/tx/'
      break
  }
  return uri
}
