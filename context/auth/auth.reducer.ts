import {} from '.'
import { Networks, NetworksId } from '../../types'
import {
  AuthActionTypes,
  CLEAR_AUTH_STATE,
  SET_AUTH_STATE,
  SET_CURRENT_NETWORK_ID,
  SET_CURRENT_NETWORK_NAME,
  SET_WALLET_ADDRESS,
  SET_CURRENT_BALANCE
} from './auth.actions.types'
import { AuthStore } from './auth.reducer.types'

export const initialAuthStore: AuthStore = {
  isWalletConnected: false,
  walletAddress: undefined,
  walletState: undefined,
  walletStateBalance: '',
  onboard: undefined,
  connectedAccounts: new Set<string>(),
  currentNetworkId: NetworksId[Networks.ETHEREUM],
  currentNetworkName: Networks.ETHEREUM
}

export const authReducer = (state: AuthStore, action: AuthActionTypes): AuthStore => {
  switch (action.type) {
    case SET_AUTH_STATE:
      return { ...state, ...action.payload }
    case CLEAR_AUTH_STATE:
      return { ...initialAuthStore }
    case SET_CURRENT_NETWORK_ID:
      return { ...state, currentNetworkId: action.payload }
    case SET_CURRENT_NETWORK_NAME:
      return { ...state, currentNetworkName: action.payload }
    case SET_WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload }
    case SET_CURRENT_BALANCE:
      return { ...state, walletStateBalance: action.payload }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
