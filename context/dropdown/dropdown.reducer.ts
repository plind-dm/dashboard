import { DropdownStore } from './dropdown.reducer.types'
import {
  DropdownActionTypes,
  RESET_DROPDOWN,
  SET_WALLET_DROPDOWN_STATE,
  SET_CURRENCY_DROPDOWN_STATE,
  SET_NETWORK_DROPDOWN_STATE,
  SET_NETWORK_VISIBILITY_SWITCH_STATE
} from './dropdown.actions.types'

export const initialDropdownStore: DropdownStore = {
  walletDropdownState: false,
  currencyDropdownState: false,
  networkDropdownState: false,
  networkVisibilitySwtichState: false
}

export const dropdownReducer = (state: DropdownStore, action: DropdownActionTypes): DropdownStore => {
  switch (action.type) {
    case SET_WALLET_DROPDOWN_STATE:
      return { ...initialDropdownStore, walletDropdownState: action.payload }
    case SET_CURRENCY_DROPDOWN_STATE:
      return { ...initialDropdownStore, currencyDropdownState: action.payload }
    case SET_NETWORK_DROPDOWN_STATE:
      return { ...initialDropdownStore, networkDropdownState: action.payload }
    case SET_NETWORK_VISIBILITY_SWITCH_STATE:
      return { ...initialDropdownStore, networkVisibilitySwtichState: action.payload }
    case RESET_DROPDOWN:
      return { ...initialDropdownStore }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
