import PageLayout from '../components/layouts/page-layout'
import { LiquidityPool } from '../components/liquidity-pool'
import { getStakedBalance, getSupportedApps, useStakingDispatch } from '../context/staking'
import { useBalanceState } from '../context/balances'
import { useEffect } from 'react'
import { switchNetwork, useAuthDispatch, useAuthState } from '../context/auth'
import { getTokensPrice, useTokenDispatch } from '../context/token'
import { Networks, NetworksId } from '../types'
import { isInvalidNetworkId } from '../utils/network-utils'

const Pool = (): React.ReactElement => {
  const authDispatch = useAuthDispatch()
  const stakingDispatch = useStakingDispatch()
  const tokenDispatch = useTokenDispatch()
  const { networks } = useBalanceState()
  const { currentNetworkName, walletAddress, currentNetworkId, walletState, onboard } = useAuthState()

  useEffect(() => {
    if (isInvalidNetworkId(currentNetworkId)) {
      authDispatch(switchNetwork(NetworksId[Networks.ETHEREUM], Networks.ETHEREUM))
    }
  }, [])

  useEffect(() => {
    if (onboard && walletState && isInvalidNetworkId(walletState.network)) {
      authDispatch(switchNetwork(NetworksId[Networks.ETHEREUM], Networks.ETHEREUM))
    }
  }, [])

  useEffect(() => {
    if (walletAddress) {
      stakingDispatch(getSupportedApps(currentNetworkName, walletAddress, networks))
      tokenDispatch(getTokensPrice(currentNetworkName))
    }
  }, [currentNetworkName, walletAddress])

  useEffect(() => {
    const fetchStakedBalance = (): void => {
      if (walletAddress) {
        stakingDispatch(getStakedBalance(currentNetworkName, walletAddress, networks))
      }
    }
    const intervalId = setInterval(() => {
      fetchStakedBalance()
    }, 15000)
    return () => clearInterval(intervalId)
  }, [stakingDispatch])

  return (
    <PageLayout>
      <LiquidityPool />
    </PageLayout>
  )
}

export default Pool
