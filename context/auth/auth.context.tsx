import React, { createContext } from 'react'
import { AuthActionTypes } from './auth.actions.types'
import { initialAuthStore, authReducer } from './auth.reducer'
import { AuthDispatch, AuthStore } from './auth.reducer.types'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { SessionLoader } from './session-loader.component'

const AuthStoreContext = createContext<AuthStore | undefined>(undefined)

const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<AuthActionTypes, AuthStore>
      reducer={authReducer}
      initialReducerStore={initialAuthStore}
      storeContext={AuthStoreContext}
      dispatchContext={AuthDispatchContext}
    >
      <SessionLoader>{children}</SessionLoader>
    </BaseContext>
  )
}

function useAuthState(): AuthStore {
  return stateHook<AuthStore>(AuthStoreContext)
}

function useAuthDispatch(): CustomDispatch<AuthActionTypes, AuthStore> {
  return dispatchHook<AuthActionTypes, AuthStore>(AuthDispatchContext)
}
function useAuth(): {
  state: AuthStore
  dispatch: CustomDispatch<AuthActionTypes, AuthStore>
} {
  return { state: useAuthState(), dispatch: useAuthDispatch() }
}

export { AuthProvider, useAuth, useAuthState, useAuthDispatch }
