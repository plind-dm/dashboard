import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { ShyftStakeDispatch, ShyftStakeStore } from './shyft-stake.reducer.types'
import { shyftStakeReducer, initialShyftStakeStore } from './shyft-stake.reducer'
import { ShyftStakeActionTypes } from './shyft-stake.actions.types'

const ShyftStakeStoreContext = createContext<ShyftStakeStore | undefined>(undefined)

const ShyftStakeDispatchContext = createContext<ShyftStakeDispatch | undefined>(undefined)

const ShyftStakeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<ShyftStakeActionTypes, ShyftStakeStore>
      reducer={shyftStakeReducer}
      initialReducerStore={initialShyftStakeStore}
      storeContext={ShyftStakeStoreContext}
      dispatchContext={ShyftStakeDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useShyftStakeState(): ShyftStakeStore {
  return stateHook<ShyftStakeStore>(ShyftStakeStoreContext)
}

function useShyftStakeDispatch(): CustomDispatch<ShyftStakeActionTypes, ShyftStakeStore> {
  return dispatchHook<ShyftStakeActionTypes, ShyftStakeStore>(ShyftStakeDispatchContext)
}
function useAuth(): {
  state: ShyftStakeStore
  dispatch: CustomDispatch<ShyftStakeActionTypes, ShyftStakeStore>
} {
  return { state: useShyftStakeState(), dispatch: useShyftStakeDispatch() }
}

export { ShyftStakeProvider, useAuth, useShyftStakeState, useShyftStakeDispatch }
