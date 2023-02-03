import Cookie from 'js-cookie'
import {
  AuthActionTypes,
  SET_AUTH_STATE,
  SET_CURRENT_NETWORK_ID,
  SET_CURRENT_NETWORK_NAME,
  SET_WALLET_ADDRESS,
  SET_CURRENT_BALANCE
} from './auth.actions.types'
import { AuthDispatch, AuthStore } from './auth.reducer.types'
import { NextRouter } from 'next/router'
import { Networks, NetworksId } from '../../types'
import { getBalance } from '../../api-services/web3.service'

const setAuthState = (authState: AuthStore): AuthActionTypes => {
  return { type: SET_AUTH_STATE, payload: authState }
}

const setCurrentNetworkId = (currentNetworkId: NetworksId): AuthActionTypes => {
  return { type: SET_CURRENT_NETWORK_ID, payload: currentNetworkId }
}

const setCurrentNetworkName = (currentNetworkName: Networks): AuthActionTypes => {
  return { type: SET_CURRENT_NETWORK_NAME, payload: currentNetworkName }
}

const setWalletAddress = (address: string): AuthActionTypes => {
  return { type: SET_WALLET_ADDRESS, payload: address }
}

const setCurrentBalance = (balance: string): AuthActionTypes => {
  return { type: SET_CURRENT_BALANCE, payload: balance }
}

const _saveAccount = (address: string): void => {
  const accountsSaved = Cookie.get('accounts')
  if (accountsSaved) {
    const accounts = JSON.parse(accountsSaved)
    if (!accounts.find((account: string) => account === address)) {
      Cookie.set('accounts', JSON.stringify([...accounts, address]))
    }
  }
}

export const loadAccounts = () => async (dispatch: AuthDispatch, state: AuthStore) => {
  const accountsSaved = Cookie.get('accounts')
  if (accountsSaved) {
    const accounts = JSON.parse(accountsSaved)
    if (accounts.length > 0) {
      const connectedAccounts = new Set<string>()
      accounts.forEach((account: string) => {
        connectedAccounts.add(account)
      })
      dispatch(setAuthState({ ...state, connectedAccounts }))
    }
  }
}

export const getCurrentBalance = () => async (dispatch: AuthDispatch, state: AuthStore) => {
  if (state.walletAddress) {
    const balance = await getBalance(state.walletAddress)
    if (balance) {
      dispatch(setCurrentBalance(balance))
    }
  }
}

export const connectWallet =
  (router?: NextRouter, path?: string) => async (dispatch: AuthDispatch, state: AuthStore) => {
    if (state.onboard) {
      const walletSelectedAndChecked = (await state.onboard.walletSelect()) && (await state.onboard.walletCheck())
      if (walletSelectedAndChecked) {
        const walletState = await state.onboard.getState()
        const authState: AuthStore = {
          walletState: walletState,
          walletAddress: walletState.address,
          walletStateBalance: walletState.balance,
          isWalletConnected: true,
          onboard: state.onboard,
          currentNetworkId: state.currentNetworkId,
          currentNetworkName: state.currentNetworkName,
          connectedAccounts: state.connectedAccounts.add(walletState.address || '')
        }
        Cookie.set('accounts', JSON.stringify([walletState.address]))
        dispatch(setAuthState(authState))
        const walletName = walletState.wallet.name ? walletState.wallet.name : 'MetaMask'
        Cookie.set('selectedWallet', walletName)
        if (router && path) {
          router.push(path)
        }
      }
    }
  }

export const loadSession = (props: AuthStore) => async (dispatch: AuthDispatch) => {
  const authState: AuthStore = {
    isWalletConnected: props.isWalletConnected,
    walletAddress: props.walletAddress,
    walletStateBalance: props.walletStateBalance,
    onboard: props.onboard,
    walletState: props.onboard.getState(),
    currentNetworkId: props.currentNetworkId,
    currentNetworkName: props.currentNetworkName,
    connectedAccounts: props.connectedAccounts
  }
  if (props.isWalletConnected && props.walletAddress && props.walletAddress !== '') {
    authState.connectedAccounts = props.connectedAccounts.add(props.walletAddress)
    _saveAccount(props.walletAddress)
  }
  dispatch(setAuthState(authState))
}

export const logout = (router: NextRouter, path: string) => async (dispatch: AuthDispatch) => {
  Cookie.remove('selectedWallet')
  Cookie.remove('accounts')
  const authState: AuthStore = {
    isWalletConnected: false,
    walletAddress: undefined,
    walletState: undefined,
    walletStateBalance: '',
    currentNetworkId: NetworksId[Networks.ETHEREUM],
    currentNetworkName: Networks.ETHEREUM,
    connectedAccounts: new Set<string>()
  }
  dispatch(setAuthState(authState))
  router.push(path)
}

export const switchNetwork =
  (currentNetworkId: NetworksId, currentNetworkName: Networks) =>
  async (dispatch: AuthDispatch, state: Partial<AuthStore>) => {
    if (state.onboard) {
      state.onboard.config({ networkId: currentNetworkId })
      dispatch(setCurrentNetworkId(currentNetworkId))
      dispatch(setCurrentNetworkName(currentNetworkName))
      state.onboard.walletCheck()
    }
  }

export const switchAccount = (address: string) => async (dispatch: AuthDispatch) => {
  dispatch(setWalletAddress(address))
}
