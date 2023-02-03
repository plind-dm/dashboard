import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { BalanceDispatch, BalanceStore } from './balance.reducer.types'
import { balanceReducer, initialBalanceStore } from './balance.reducer'
import { BalanceActionTypes } from './balance.actions.types'

const BalanceStoreContext = createContext<BalanceStore | undefined>(undefined)

const BalanceDispatchContext = createContext<BalanceDispatch | undefined>(undefined)

const BalanceProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<BalanceActionTypes, BalanceStore>
      reducer={balanceReducer}
      initialReducerStore={initialBalanceStore}
      storeContext={BalanceStoreContext}
      dispatchContext={BalanceDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useBalanceState(): BalanceStore {
  return stateHook<BalanceStore>(BalanceStoreContext)
}

function useBalanceDispatch(): CustomDispatch<BalanceActionTypes, BalanceStore> {
  return dispatchHook<BalanceActionTypes, BalanceStore>(BalanceDispatchContext)
}
function useAuth(): {
  state: BalanceStore
  dispatch: CustomDispatch<BalanceActionTypes, BalanceStore>
} {
  return { state: useBalanceState(), dispatch: useBalanceDispatch() }
}

export { BalanceProvider, useAuth, useBalanceState, useBalanceDispatch }
