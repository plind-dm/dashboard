import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from '@caramelpoint/contuxt'
import { DropdownDispatch, DropdownStore } from './dropdown.reducer.types'
import { dropdownReducer, initialDropdownStore } from './dropdown.reducer'
import { DropdownActionTypes } from './dropdown.actions.types'

const DropdownStoreContext = createContext<DropdownStore | undefined>(undefined)

const DropdownDispatchContext = createContext<DropdownDispatch | undefined>(undefined)

const DropdownProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <BaseContext<DropdownActionTypes, DropdownStore>
      reducer={dropdownReducer}
      initialReducerStore={initialDropdownStore}
      storeContext={DropdownStoreContext}
      dispatchContext={DropdownDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useDropdownState(): DropdownStore {
  return stateHook<DropdownStore>(DropdownStoreContext)
}

function useDropdownDispatch(): CustomDispatch<DropdownActionTypes, DropdownStore> {
  return dispatchHook<DropdownActionTypes, DropdownStore>(DropdownDispatchContext)
}
function useDropdown(): {
  state: DropdownStore
  dispatch: CustomDispatch<DropdownActionTypes, DropdownStore>
} {
  return { state: useDropdownState(), dispatch: useDropdownDispatch() }
}

export { DropdownProvider, useDropdown, useDropdownState, useDropdownDispatch }
