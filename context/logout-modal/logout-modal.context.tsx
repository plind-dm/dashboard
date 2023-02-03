import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { LogoutModalDispatch, LogoutModalStore } from './logout-modal.reducer.types'
import { logoutModalReducer, initialModalLogoutStore } from './logout-modal.reducer'
import { LogoutModalActionTypes } from './logout-modal.actions.types'

const LogoutModalStoreContext = createContext<LogoutModalStore | undefined>(undefined)

const LogoutModalDispatchContext = createContext<LogoutModalDispatch | undefined>(undefined)

const LogoutModalProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<LogoutModalActionTypes, LogoutModalStore>
      reducer={logoutModalReducer}
      initialReducerStore={initialModalLogoutStore}
      storeContext={LogoutModalStoreContext}
      dispatchContext={LogoutModalDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useLogoutModalState(): LogoutModalStore {
  return stateHook<LogoutModalStore>(LogoutModalStoreContext)
}

function useLogoutModalDispatch(): CustomDispatch<LogoutModalActionTypes, LogoutModalStore> {
  return dispatchHook<LogoutModalActionTypes, LogoutModalStore>(LogoutModalDispatchContext)
}
function useLogoutModal(): {
  state: LogoutModalStore
  dispatch: CustomDispatch<LogoutModalActionTypes, LogoutModalStore>
} {
  return { state: useLogoutModalState(), dispatch: useLogoutModalDispatch() }
}

export { LogoutModalProvider, useLogoutModal, useLogoutModalState, useLogoutModalDispatch }
