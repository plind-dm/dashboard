import { CustomDispatch } from '@caramelpoint/contuxt'
import { Transaction, TransactionWithDate } from '../../types'
import { TransactionActionTypes } from './transaction.actions.types'

export interface TransactionStore {
  transactions: Array<Transaction>
  currentTransaction: Transaction
  groupedTransactions?: Array<TransactionWithDate>
}

export type TransactionDispatch = CustomDispatch<TransactionActionTypes, TransactionStore>
