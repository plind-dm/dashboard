import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { NftDispatch, NftStore } from './nft.reducer.types'
import { nftReducer, initialNftStore } from './nft.reducer'
import { NftActionTypes } from './nft.actions.types'

const NftStoreContext = createContext<NftStore | undefined>(undefined)

const NftDispatchContext = createContext<NftDispatch | undefined>(undefined)

const NftProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<NftActionTypes, NftStore>
      reducer={nftReducer}
      initialReducerStore={initialNftStore}
      storeContext={NftStoreContext}
      dispatchContext={NftDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useNftState(): NftStore {
  return stateHook<NftStore>(NftStoreContext)
}

function useNftDispatch(): CustomDispatch<NftActionTypes, NftStore> {
  return dispatchHook<NftActionTypes, NftStore>(NftDispatchContext)
}
function useAuth(): {
  state: NftStore
  dispatch: CustomDispatch<NftActionTypes, NftStore>
} {
  return { state: useNftState(), dispatch: useNftDispatch() }
}

export { NftProvider, useAuth, useNftState, useNftDispatch }
