import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { StakingDispatch, StakingStore } from './staking.reducer.types'
import { stakingReducer, initialStakingStore } from './staking.reducer'
import { StakingActionTypes } from './staking.actions.types'

const StakingStoreContext = createContext<StakingStore | undefined>(undefined)

const StakingDispatchContext = createContext<StakingDispatch | undefined>(undefined)

const StakingProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<StakingActionTypes, StakingStore>
      reducer={stakingReducer}
      initialReducerStore={initialStakingStore}
      storeContext={StakingStoreContext}
      dispatchContext={StakingDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useStakingState(): StakingStore {
  return stateHook<StakingStore>(StakingStoreContext)
}

function useStakingDispatch(): CustomDispatch<StakingActionTypes, StakingStore> {
  return dispatchHook<StakingActionTypes, StakingStore>(StakingDispatchContext)
}
function useAuth(): {
  state: StakingStore
  dispatch: CustomDispatch<StakingActionTypes, StakingStore>
} {
  return { state: useStakingState(), dispatch: useStakingDispatch() }
}

export { StakingProvider, useAuth, useStakingState, useStakingDispatch }
