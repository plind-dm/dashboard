import { CustomDispatch } from '@caramelpoint/contuxt'
import { DropdownActionTypes } from './dropdown.actions.types'

export interface DropdownStore {
  walletDropdownState: boolean
  currencyDropdownState: boolean
  networkDropdownState: boolean
  networkVisibilitySwtichState: boolean
}

export type DropdownDispatch = CustomDispatch<DropdownActionTypes, DropdownStore>
