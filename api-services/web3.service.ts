import { Unit } from 'web3-utils'
import Web3 from 'web3'
import { ApprovalTransaction, StakingTransaction, TransactionNotification } from '../types'
import { Toast } from '../components/uiKit'

export const sendTransaction = async (
  transaction: StakingTransaction | ApprovalTransaction,
  txNotification: TransactionNotification
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const web3: Web3 = new Web3((window as any).ethereum)
  await web3.eth
    .sendTransaction(transaction)
    .on('transactionHash', function (hash) {
      console.log('transactionHash', hash)
      txNotification.onTxLoading(hash)
    })
    .on('receipt', function (receipt) {
      console.log('receipt', receipt)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber === 1) {
        Toast.dismiss()
        txNotification.onTxSuccess(receipt.transactionHash)
        setTimeout(() => {
          Toast.dismiss()
          txNotification.onTxFinished()
        }, 3000)
      }
      console.log('confirmation', confirmationNumber, receipt)
    })
    .on('error', (err) => {
      if (err.message.includes('Be aware that it might still be mined')) {
        console.log(err.message)
      }
      throw err
    }) // If a out of gas error, the second parameter is the receipt.
}

export const toWei = (value: string, unit: string): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const web3: Web3 = new Web3((window as any).ethereum)
    return web3.utils.toWei(value, unit as Unit)
  } catch (err) {
    return (+value * 1e18).toFixed(0)
  }
}

export const fromWei = (value: string, unit: string): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const web3: Web3 = new Web3((window as any).ethereum)
    return web3.utils.fromWei(value, unit as Unit)
  } catch (err) {
    return (+value / 1e18).toString()
  }
}

export const weiToShft = (wei: string): string => {
  return fromWei(wei, 'ether')
}

export const shftToWei = (shft: string): string => {
  return toWei(shft, 'ether')
}

export const getBalance = (address: string): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const web3: Web3 = new Web3((window as any).ethereum)
  return web3.eth.getBalance(address)
}

export const addPolygonRPC = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eth = (window as any).ethereum
  if (eth) {
    await eth.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x89', // A 0x-prefixed hexadecimal string (137 for Polygon)
          chainName: 'Matic Mainnet',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC', // 2-6 characters long
            decimals: 18
          },
          rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
          blockExplorerUrls: ['https://polygonscan.com/']
        }
      ]
    })
  }
}

export const addBinanceRPC = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eth = (window as any).ethereum
  if (eth) {
    await eth.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x38', // A 0x-prefixed hexadecimal string (56 for Binance)
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB', // 2-6 characters long
            decimals: 18
          },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com/']
        }
      ]
    })
  }
}

export const addShyftTestnetRPC = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eth = (window as any).ethereum
  if (eth) {
    await eth.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x2CAD', // A 0x-prefixed hexadecimal string (11437 for Shyft Testnet)
          chainName: 'Shyft Testnet',
          nativeCurrency: {
            name: 'SHFTT',
            symbol: 'SHFTT', // 2-6 characters long
            decimals: 18
          },
          rpcUrls: ['https://rpc.testnet.shyft.network:64738/'],
          blockExplorerUrls: ['https://bx.testnet.shyft.network/']
        }
      ]
    })
  }
}

export const addShyftRPC = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eth = (window as any).ethereum
  if (eth) {
    await eth.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x1CAD', // A 0x-prefixed hexadecimal string (7341 for Shyft)
          chainName: 'Shyft Mainnet',
          nativeCurrency: {
            name: 'SHFT',
            symbol: 'SHFT', // 2-6 characters long
            decimals: 18
          },
          rpcUrls: ['https://rpc.shyft.network:64738/'],
          blockExplorerUrls: ['https://bx.shyft.network/']
        }
      ]
    })
  }
}
