import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { ShyftLPStakeDispatch, ShyftLPStakeStore } from './shyft-lp-stake.reducer.types'
import { shyftLPStakeReducer, initialShyftLPStakeStore } from './shyft-lp-stake.reducer'
import { ShyftLPStakeActionTypes } from './shyft-lp-stake.actions.types'

const ShyftLPStakeStoreContext = createContext<ShyftLPStakeStore | undefined>(undefined)

const ShyftLPStakeDispatchContext = createContext<ShyftLPStakeDispatch | undefined>(undefined)

const ShyftLPStakeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<ShyftLPStakeActionTypes, ShyftLPStakeStore>
      reducer={shyftLPStakeReducer}
      initialReducerStore={initialShyftLPStakeStore}
      storeContext={ShyftLPStakeStoreContext}
      dispatchContext={ShyftLPStakeDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useShyftLPStakeState(): ShyftLPStakeStore {
  return stateHook<ShyftLPStakeStore>(ShyftLPStakeStoreContext)
}

function useShyftLPStakeDispatch(): CustomDispatch<ShyftLPStakeActionTypes, ShyftLPStakeStore> {
  return dispatchHook<ShyftLPStakeActionTypes, ShyftLPStakeStore>(ShyftLPStakeDispatchContext)
}
function useAuth(): {
  state: ShyftLPStakeStore
  dispatch: CustomDispatch<ShyftLPStakeActionTypes, ShyftLPStakeStore>
} {
  return { state: useShyftLPStakeState(), dispatch: useShyftLPStakeDispatch() }
}

export { ShyftLPStakeProvider, useAuth, useShyftLPStakeState, useShyftLPStakeDispatch }
