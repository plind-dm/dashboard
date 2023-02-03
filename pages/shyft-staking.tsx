import PageLayout from '../components/layouts/page-layout'
import { ShyftPool } from '../components/shyft-pool'
import { useEffect, useState } from 'react'
import { switchNetwork, useAuthDispatch, useAuthState } from '../context/auth'
import { Networks, NetworksId } from '../types'
import { addShyftTestnetRPC, addShyftRPC } from '../api-services/web3.service'
import { config } from '../config/env.config'
import { Loader } from '../components/uiKit'
import styled from 'styled-components'
import { isInShyftNetwork } from '../utils/network-utils'

const $LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 258px);
`

const Pool = (): React.ReactElement => {
  const authDispatch = useAuthDispatch()
  const { onboard, walletState } = useAuthState()
  const [networkReady, setNetworkReady] = useState<boolean>(false)

  useEffect(() => {
    const setShyftEnv = (): void => {
      if (config.site.isMainnet) {
        addShyftRPC()
        authDispatch(switchNetwork(NetworksId[Networks.SHYFT], Networks.SHYFT))
      } else {
        addShyftTestnetRPC()
        authDispatch(switchNetwork(NetworksId[Networks.SHYFT_TESTNET], Networks.SHYFT_TESTNET))
      }
    }
    setShyftEnv()
  }, [])

  useEffect(() => {
    if (onboard && walletState && isInShyftNetwork(walletState.network)) {
      setNetworkReady(true)
    }
  }, [onboard, walletState])

  return (
    <PageLayout>
      {networkReady ? (
        <ShyftPool />
      ) : (
        <$LoaderContainer>
          <Loader />
        </$LoaderContainer>
      )}
    </PageLayout>
  )
}

export default Pool
