import { Portfolio } from '../components/portfolio/portfolio'
import PageLayout from '../components/layouts/page-layout'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Networks, NetworksId, Tabs } from '../types'
import { switchNetwork, useAuthDispatch, useAuthState } from '../context/auth'
import { isInvalidNetworkId } from '../utils/network-utils'

const PortfolioPage = (): React.ReactElement => {
  const router = useRouter()
  const { tab } = router.query
  const authDispatch = useAuthDispatch()
  const { currentNetworkId, walletState, onboard } = useAuthState()

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

  return (
    <PageLayout>
      <Portfolio currentTab={(tab as string) || Tabs.MAIN} />
    </PageLayout>
  )
}

export default PortfolioPage
