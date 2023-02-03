import { Networks, NetworksId } from '../../types'
import { AuthStore } from './auth.reducer.types'
export const SET_AUTH_STATE = 'SET_AUTH_STATE'
export const SET_SESSION_STATUS = 'SET_SESSION_STATUS'
export const CLEAR_AUTH_STATE = 'CLEAR_AUTH_STATE'
export const SET_CURRENT_NETWORK_ID = 'SET_CURRENT_NETWORK_ID'
export const SET_CURRENT_NETWORK_NAME = 'SET_CURRENT_NETWORK_NAME'
export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS'
export const SET_CURRENT_BALANCE = 'SET_CURRENT_BALANCE'

interface SetAuthState {
  type: typeof SET_AUTH_STATE
  payload: AuthStore
}

interface ClearAuthState {
  type: typeof CLEAR_AUTH_STATE
}

interface SetCurrentNetworkId {
  type: typeof SET_CURRENT_NETWORK_ID
  payload: NetworksId
}
interface SetWalletAddress {
  type: typeof SET_WALLET_ADDRESS
  payload: string
}

interface SetCurrentNetworkName {
  type: typeof SET_CURRENT_NETWORK_NAME
  payload: Networks
}

interface SetCurrentBalance {
  type: typeof SET_CURRENT_BALANCE
  payload: string
}

export type AuthActionTypes =
  | SetAuthState
  | ClearAuthState
  | SetCurrentNetworkId
  | SetCurrentNetworkName
  | SetWalletAddress
  | SetCurrentBalance
