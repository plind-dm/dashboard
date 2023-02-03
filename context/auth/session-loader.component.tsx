import React, { useState, useEffect, ReactElement } from 'react'
import { AuthStore, loadSession, loadAccounts, useAuthDispatch, useAuthState } from '../auth'
import OnboardService from '../../api-services/onboard.service'
import { API, Subscriptions, UserState } from 'bnc-onboard/dist/src/interfaces'
import Cookie from 'js-cookie'
import { useBalanceDispatch, getBalance, getFiat } from '../balances'
import { useNftDispatch, getNfts } from '../nfts'
import { useTransactionDispatch, getTransactions } from '../transactions'
import { getTokensPrice, useTokenDispatch } from '../token'
import { Networks, NetworksId } from '../../types'
import { isInvalidNetworkName } from '../../utils/network-utils'

type SessionLoaderProps = {
  children: React.ReactNode
}
export const SessionLoader = ({ children }: SessionLoaderProps): ReactElement => {
  const authDispatch = useAuthDispatch()
  const { isWalletConnected, walletAddress, currentNetworkId, currentNetworkName, connectedAccounts } = useAuthState()
  const balanceDispatch = useBalanceDispatch()
  const nftDispatch = useNftDispatch()
  const tokenDispatch = useTokenDispatch()
  const txDispatch = useTransactionDispatch()

  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [onboard, setOnboard] = useState<API>()

  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      balanceDispatch(getBalance(walletAddress))
      balanceDispatch(getFiat())
      nftDispatch(getNfts(walletAddress))
      txDispatch(
        getTransactions(
          walletAddress,
          isInvalidNetworkName(currentNetworkName) ? Networks.ETHEREUM : currentNetworkName
        )
      )
      tokenDispatch(getTokensPrice(isInvalidNetworkName(currentNetworkName) ? Networks.ETHEREUM : currentNetworkName))
      authDispatch(loadAccounts())
    }
  }, [isWalletConnected, walletAddress])

  useEffect(() => {
    const subscriptions: Subscriptions = {
      address: setAddress,
      balance: setBalance
    }
    const onboard = OnboardService.switchNetwork(currentNetworkId, subscriptions)
    setOnboard(onboard)
    const authState: AuthStore = {
      walletAddress: address !== null ? address : '',
      walletStateBalance: balance,
      onboard: onboard,
      currentNetworkId,
      currentNetworkName,
      connectedAccounts
    }
    authDispatch(loadSession(authState))
  }, [])

  useEffect(() => {
    const previouslySelectedWallet = Cookie.get('selectedWallet')
    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
    }
  }, [onboard])

  const getCurrentNetworkId = (state: UserState): { id: NetworksId; name: Networks } => {
    let name = Networks.ETHEREUM
    let id = NetworksId.ethereum
    switch (state.network) {
      case 137:
        name = Networks.POLYGON
        id = NetworksId.polygon
        break
      case 56:
        name = Networks['BINANCE-SMART-CHAIN']
        id = NetworksId['binance-smart-chain']
        break
      case 11437:
        name = Networks.SHYFT_TESTNET
        id = NetworksId['shyft-testnet']
        break
      case 7341:
        name = Networks.SHYFT
        id = NetworksId.shyft
        break
    }
    return { id, name }
  }

  useEffect(() => {
    if (onboard) {
      if (address && balance) {
        const networkInfo = getCurrentNetworkId(onboard.getState())
        const authState: AuthStore = {
          walletAddress: address !== null ? address : '',
          walletStateBalance: balance,
          onboard: onboard,
          isWalletConnected: true,
          currentNetworkId: networkInfo.id,
          currentNetworkName: networkInfo.name,
          connectedAccounts
        }
        authDispatch(loadSession(authState))
      } else {
        const authState: AuthStore = {
          isWalletConnected: false,
          onboard: onboard,
          currentNetworkId,
          currentNetworkName,
          connectedAccounts
        }
        authDispatch(loadSession(authState))
      }
    }
  }, [balance, address])

  return <>{children}</>
}
