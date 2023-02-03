import {
  TransactionActionTypes,
  SET_TRANSACTIONS_LIST,
  SET_CURRENT_TRANSACTION,
  SET_GROUPED_TRANSACTIONS
} from './transaction.actions.types'
import { TransactionStore } from './transaction.reducer.types'
import { Transaction } from '../../types'

export const initialTransactionStore: TransactionStore = {
  transactions: [],
  currentTransaction: {} as Transaction
}

export const transactionReducer = (state: TransactionStore, action: TransactionActionTypes): TransactionStore => {
  switch (action.type) {
    case SET_TRANSACTIONS_LIST:
      return {
        ...state,
        transactions: action.payload
      }
    case SET_CURRENT_TRANSACTION:
      return {
        ...state,
        currentTransaction: action.payload
      }
    case SET_GROUPED_TRANSACTIONS:
      return {
        ...state,
        groupedTransactions: action.payload
      }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
