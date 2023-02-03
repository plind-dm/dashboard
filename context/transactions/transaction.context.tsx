import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { TransactionDispatch, TransactionStore } from './transaction.reducer.types'
import { transactionReducer, initialTransactionStore } from './transaction.reducer'
import { TransactionActionTypes } from './transaction.actions.types'

const TransactionStoreContext = createContext<TransactionStore | undefined>(undefined)

const TransactionDispatchContext = createContext<TransactionDispatch | undefined>(undefined)

const TransactionProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<TransactionActionTypes, TransactionStore>
      reducer={transactionReducer}
      initialReducerStore={initialTransactionStore}
      storeContext={TransactionStoreContext}
      dispatchContext={TransactionDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useTransactionState(): TransactionStore {
  return stateHook<TransactionStore>(TransactionStoreContext)
}

function useTransactionDispatch(): CustomDispatch<TransactionActionTypes, TransactionStore> {
  return dispatchHook<TransactionActionTypes, TransactionStore>(TransactionDispatchContext)
}
function useAuth(): {
  state: TransactionStore
  dispatch: CustomDispatch<TransactionActionTypes, TransactionStore>
} {
  return { state: useTransactionState(), dispatch: useTransactionDispatch() }
}

export { TransactionProvider, useAuth, useTransactionState, useTransactionDispatch }
