import PageLayout from '../components/layouts/page-layout'
import { ShyftLPPool } from '../components/shyft-lp-pool'
import { useEffect, useState } from 'react'
import { switchNetwork, useAuthDispatch, useAuthState } from '../context/auth'
import { Networks, NetworksId } from '../types'
import { Loader } from '../components/uiKit'
import styled from 'styled-components'
import { isInvalidNetworkId } from '../utils/network-utils'

const $LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 258px);
`

const LPPool = (): React.ReactElement => {
  const authDispatch = useAuthDispatch()
  const { currentNetworkId, onboard, walletState } = useAuthState()
  const [networkReady, setNetworkReady] = useState<boolean>(true)

  useEffect(() => {
    if (isInvalidNetworkId(currentNetworkId)) {
      authDispatch(switchNetwork(NetworksId[Networks.ETHEREUM], Networks.ETHEREUM))
      setNetworkReady(true)
    }
  }, [])

  useEffect(() => {
    if (onboard && walletState && isInvalidNetworkId(walletState.network)) {
      authDispatch(switchNetwork(NetworksId[Networks.ETHEREUM], Networks.ETHEREUM))
      setNetworkReady(true)
    }
  }, [])

  return (
    <PageLayout>
      {networkReady ? (
        <ShyftLPPool />
      ) : (
        <$LoaderContainer>
          <Loader />
        </$LoaderContainer>
      )}
    </PageLayout>
  )
}

export default LPPool
