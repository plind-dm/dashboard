export interface Transaction {
  network: string
  hash: string
  blockNumber: number
  name: string
  direction: string
  timeStamp: string
  symbol: string
  address: string
  amount: string
  from: string
  destination: string
  contract: string
  subTransactions: SubTransaction[]
  nonce: string
  gasPrice: number
  gasLimit: number
  input: string
  gas: number
  txSuccessful: boolean
  account: string
  destinationEns: null
  accountEns: null
}

export interface TransactionWithDate {
  date: string
  transactions: Array<Transaction>
}

export interface SubTransaction {
  type: string
  symbol: string
  amount: number
  address: string
}

export interface ShyftTransaction {
  blockHash: string
  blockNumber: number
  confirmations: number
  contractAddress: string
  cumulativeGasUsed: number
  from: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  nonce: string
  timeStamp: string
  to: string
  transactionIndex: number
  txreceipt_status: number
  value: string
  subTransactions: SubTransaction[]
}

export interface ShyftInternalTransaction {
  blockNumber: number
  contractAddress: string
  errCode: string
  from: string
  gas: string
  gasUsed: string
  index: string
  input: string
  isError: string
  timeStamp: string
  to: string
  transactionHash: string
  type: string
  value: number
}
