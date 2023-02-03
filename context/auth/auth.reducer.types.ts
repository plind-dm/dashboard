/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomDispatch } from '@caramelpoint/contuxt'
import { UserState } from 'bnc-onboard/dist/src/interfaces'
import { Networks, NetworksId } from '../../types'
import { AuthActionTypes } from './auth.actions.types'

export type AuthStore = {
  isWalletConnected?: boolean
  walletAddress?: string
  walletState?: UserState
  walletStateBalance?: string
  currentNetworkId: NetworksId
  currentNetworkName: Networks
  connectedAccounts: Set<string>
  onboard?: any
}

export type AuthDispatch = CustomDispatch<AuthActionTypes, AuthStore>
