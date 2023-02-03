import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { TokenDispatch, TokenStore } from './token.reducer.types'
import { tokenReducer, initialTokenStore } from './token.reducer'
import { TokenActionTypes } from './token.actions.types'

const TokenStoreContext = createContext<TokenStore | undefined>(undefined)

const TokenDispatchContext = createContext<TokenDispatch | undefined>(undefined)

const TokenProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<TokenActionTypes, TokenStore>
      reducer={tokenReducer}
      initialReducerStore={initialTokenStore}
      storeContext={TokenStoreContext}
      dispatchContext={TokenDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useTokenState(): TokenStore {
  return stateHook<TokenStore>(TokenStoreContext)
}

function useTokenDispatch(): CustomDispatch<TokenActionTypes, TokenStore> {
  return dispatchHook<TokenActionTypes, TokenStore>(TokenDispatchContext)
}
function useAuth(): {
  state: TokenStore
  dispatch: CustomDispatch<TokenActionTypes, TokenStore>
} {
  return { state: useTokenState(), dispatch: useTokenDispatch() }
}

export { TokenProvider, useAuth, useTokenState, useTokenDispatch }
