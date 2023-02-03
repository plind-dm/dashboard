import {
  TransactionActionTypes,
  SET_TRANSACTIONS_LIST,
  SET_CURRENT_TRANSACTION,
  SET_GROUPED_TRANSACTIONS
} from './transaction.actions.types'
import { TransactionDispatch } from './transaction.reducer.types'
import axios from 'axios'
import { Transaction, TransactionWithDate } from '../../types'
import { groupTransactionsByDate } from '../../utils/transactions.utils'

export const setTransactionState = (transactions: Array<Transaction>): TransactionActionTypes => {
  return { type: SET_TRANSACTIONS_LIST, payload: transactions }
}

export const setCurrentTransaction = (transaction: Transaction): TransactionActionTypes => {
  return { type: SET_CURRENT_TRANSACTION, payload: transaction }
}
export const setGroupedTransactions = (transactions: Array<TransactionWithDate>): TransactionActionTypes => {
  return { type: SET_GROUPED_TRANSACTIONS, payload: transactions }
}

export const getTransactions =
  (address: string, currentNetworkName: string) => async (dispatch: TransactionDispatch) => {
    try {
      const result = await axios.get('/api/transaction-history', { params: { address, currentNetworkName } })
      const transactionData = result.data as Array<Transaction>
      dispatch(setTransactionState(transactionData))
      const groupedTransactions = groupTransactionsByDate(transactionData) as Array<TransactionWithDate>
      dispatch(setGroupedTransactions(groupedTransactions))
    } catch (error) {
      console.log(error)
    }
  }
