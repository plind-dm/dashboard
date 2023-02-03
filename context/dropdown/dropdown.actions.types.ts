export const RESET_DROPDOWN = 'RESET_DROPDOWN'
export const SET_WALLET_DROPDOWN_STATE = 'SET_WALLET_DROPDOWN_STATE'
export const SET_CURRENCY_DROPDOWN_STATE = 'SET_CURRENCY_DROPDOWN_STATE'
export const SET_NETWORK_DROPDOWN_STATE = 'SET_NETWORK_DROPDOWN_STATE'
export const SET_NETWORK_VISIBILITY_SWITCH_STATE = 'SET_NETWORK_VISIBILITY_SWITCH_STATE'

interface ResetDropdown {
  type: typeof RESET_DROPDOWN
}

interface SetWalletDropdownState {
  type: typeof SET_WALLET_DROPDOWN_STATE
  payload: boolean
}

interface SetCurrencyDropdownState {
  type: typeof SET_CURRENCY_DROPDOWN_STATE
  payload: boolean
}

interface SetNetworkDropdownState {
  type: typeof SET_NETWORK_DROPDOWN_STATE
  payload: boolean
}

interface SetNetworkVisibilitySwitchState {
  type: typeof SET_NETWORK_VISIBILITY_SWITCH_STATE
  payload: boolean
}

export type DropdownActionTypes =
  | ResetDropdown
  | SetWalletDropdownState
  | SetCurrencyDropdownState
  | SetNetworkDropdownState
  | SetNetworkVisibilitySwitchState
