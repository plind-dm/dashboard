import {
  DropdownActionTypes,
  RESET_DROPDOWN,
  SET_WALLET_DROPDOWN_STATE,
  SET_CURRENCY_DROPDOWN_STATE,
  SET_NETWORK_DROPDOWN_STATE,
  SET_NETWORK_VISIBILITY_SWITCH_STATE
} from './dropdown.actions.types'

export const setResetDropdown = (): DropdownActionTypes => ({ type: RESET_DROPDOWN })

export const setWalletDropdownState = (payload: boolean): DropdownActionTypes => ({
  type: SET_WALLET_DROPDOWN_STATE,
  payload
})

export const setCurrencyDropdownState = (payload: boolean): DropdownActionTypes => ({
  type: SET_CURRENCY_DROPDOWN_STATE,
  payload
})

export const setNetworkDropdownState = (payload: boolean): DropdownActionTypes => ({
  type: SET_NETWORK_DROPDOWN_STATE,
  payload
})

export const setNetworkSwitchState = (payload: boolean): DropdownActionTypes => ({
  type: SET_NETWORK_VISIBILITY_SWITCH_STATE,
  payload
})
