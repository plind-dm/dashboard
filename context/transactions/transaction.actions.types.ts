import { Transaction, TransactionWithDate } from '../../types'

export const SET_TRANSACTIONS_LIST = 'SET_TRANSACTIONS_LIST'
export const SET_CURRENT_TRANSACTION = 'SET_CURRENT_TRANSACTION'
export const SET_GROUPED_TRANSACTIONS = 'SET_GROUPED_TRANSACTIONS'

interface SetTransactionState {
  type: typeof SET_TRANSACTIONS_LIST
  payload: Array<Transaction>
}

interface SetCurrentTransaction {
  type: typeof SET_CURRENT_TRANSACTION
  payload: Transaction
}

interface SetGroupedTransactions {
  type: typeof SET_GROUPED_TRANSACTIONS
  payload: Array<TransactionWithDate>
}

export type TransactionActionTypes = SetTransactionState | SetCurrentTransaction | SetGroupedTransactions
