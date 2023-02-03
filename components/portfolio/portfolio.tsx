import { useState, useEffect, ReactElement } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { config } from '../../config/env.config'
import noAssetImage from '../../public/images/no-assets.svg'
import { Devices } from '../../styles/constants/devices'
import { ExhibitCard } from '../exhibit-card/exhibit-card'
import { OverviewSection } from './overview-section'
import { $H4, $H1, $H5, $H3, $Divider, $Text, $HighLightText, UnderMaintenanceCard } from '../uiKit'
import { WalletModal } from '../../components/modal/wallet-modal'
import { useBalanceState, useBalanceDispatch, getBalanceFiat } from '../../context/balances'
import { NFTS } from './nfts'
import { TransactionHistory } from './transaction-history'
import { paletteColors } from '../../styles/colors'
import { NetworkVisibilityHandler } from '../uiKit/network.visibility.changer'
import { DigestedTokenBalance } from '../../pages/api/token-balances'
import { getSupportedApps, getStakedBalanceFiat, useStakingDispatch, useStakingState } from '../../context/staking'
import { useAuthState } from '../../context/auth'
import { useNftState, useNftDispatch, getNftBalance } from '../../context/nfts'
import { EmptyCard } from '../uiKit'
import { WalletCard } from './wallet-card'
import { StakingCard } from './staking-card'
import { Routes, StakedBalancesByNetwork, Tabs } from '../../types'
import { useFormatter } from '../../hooks/useFormatter'
import { Loader } from '../uiKit/loader'

interface ITabGroup {
  selected: boolean
}

const $Portfolio = styled.div`
  min-height: calc(100vh - 250px);
  margin-top: 60px;
  @media ${Devices.laptop} {
    min-height: calc(100vh - 290px);
    margin-top: 32px;
  }
`

const $HorizontalDivision = styled($Divider)`
  margin: 8px 0 16px 0px;
  @media ${Devices.laptop} {
    margin: 15px 0 40px 0;
    width: 100%;
  }
`
const $Title = styled($H3)`
  @media ${Devices.laptop} {
    margin: 0 0 0 24px;
  }
`
const $NetWorthSection = styled.div`
  margin: 16px 0 24px 0;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  @media ${Devices.laptop} {
    row-gap: 16px;
    margin: 32px 0 48px 24px;
  }
`
const $TabsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${Devices.laptop} {
    margin-left: 24px;
    justify-content: left;
    column-gap: 50px;
  }
`

const $TabsItem = styled($H5)<ITabGroup>`
  :hover {
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.selected ? props.theme.dark.primary : props.theme.dark.text)};
`

const $AccountText = styled.div`
  display: flex;
  flex-direction: column-reverse;
  row-gap: 15px;
  @media ${Devices.laptop} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 24px;
  }
`

const $NetworkVisibilityHandlerContainer = styled.div`
  width: 100%;
  max-width: 224px;
`

const $NetWorthSContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`

const $AssetContainer = styled($NetWorthSContainer)`
  column-gap: 8px;
`

export const Portfolio = ({ currentTab }: { currentTab: string }): ReactElement => {
  const router = useRouter()
  const { formatFiatValue } = useFormatter()
  const nftDispatch = useNftDispatch()
  const balanceDispatch = useBalanceDispatch()
  const stakingDispatch = useStakingDispatch()
  const { products, nftBalance } = useNftState()
  const { isWalletConnected, currentNetworkName, walletAddress } = useAuthState()
  const { stakedBalances, stakedBalanceFiat, stakedPools } = useStakingState()
  const { networks, convertedBalances, currentCurrency, fiatRates, balances, balanceFiat } = useBalanceState()
  const [tab, setTab] = useState(currentTab)
  const [modalOpen, setModalOpen] = useState(false)
  const [netValue, setNetValue] = useState<number>()
  const [assetValue, setAssetValue] = useState<number>()
  const [netWorthLoaderState, setNetWorthLoaderState] = useState<boolean>(true)
  const [assetLoaderState, setAssetLoaderState] = useState<boolean>(true)

  useEffect(() => {
    if (fiatRates && products) nftDispatch(getNftBalance(products, fiatRates, currentCurrency, networks))
  }, [products, currentCurrency, fiatRates, networks, walletAddress])

  useEffect(() => {
    if (walletAddress) stakingDispatch(getSupportedApps(currentNetworkName, walletAddress, networks))
  }, [currentNetworkName, walletAddress, networks, walletAddress])

  useEffect(() => {
    if (balances && fiatRates) balanceDispatch(getBalanceFiat(balances, fiatRates, currentCurrency, networks))
  }, [balances, currentCurrency, fiatRates, networks, walletAddress])

  useEffect(() => {
    if (fiatRates && stakedPools)
      stakingDispatch(getStakedBalanceFiat(stakedPools, fiatRates, currentCurrency, networks))
  }, [stakedBalances, currentCurrency, fiatRates, networks, walletAddress])

  useEffect(() => {
    setAssetValue(undefined)
    setNetValue(undefined)
  }, [walletAddress])

  useEffect(() => {
    setNetValue(undefined)
    let value = undefined
    if (balanceFiat || stakedBalanceFiat || nftBalance) {
      value = 0
      if (balanceFiat) value = value + (parseFloat(balanceFiat) || 0.0)
      if (nftBalance) value = value + (parseFloat(nftBalance) || 0.0)
      setAssetValue(value)
      if (stakedBalanceFiat) value = value + (parseFloat(stakedBalanceFiat) || 0.0)
      setNetValue(value)
    }
  }, [balanceFiat, stakedBalanceFiat, nftBalance])

  const toggleModal = (): void => {
    setModalOpen(!modalOpen)
  }

  const areThereNetworks = (): boolean => {
    let areThereNetworks = false
    if (convertedBalances && convertedBalances.length > 0) {
      for (let i = 0; i < convertedBalances.length; i++) {
        if (networks[convertedBalances[i].networkName.toUpperCase()] && convertedBalances[i].products.length > 0) {
          areThereNetworks = true
        }
      }
    }
    return areThereNetworks
  }

  useEffect(() => {
    if (isWalletConnected === false) {
      router.push(Routes.LOGIN)
    }
  }, [isWalletConnected])

  const parsedNetworkTotal = (network: DigestedTokenBalance, stakedPools?: StakedBalancesByNetwork): string => {
    const networkValue = network.totalBalance
    let stakedValue = 0
    if (stakedPools && stakedPools[network.networkName.toLowerCase()])
      stakedValue = stakedPools[network.networkName.toLowerCase()]
        ?.map((pool) => pool.meta[0].value)
        .reduce((previous, current) => previous + current, 0)
    return (networkValue + stakedValue).toFixed(2)
  }

  useEffect(() => {
    setNetWorthLoaderState(balanceFiat === 'loading' || stakedBalanceFiat === 'loading' || nftBalance === 'loading')
    setAssetLoaderState(balanceFiat === 'loading' || nftBalance === 'loading')
  }, [balanceFiat, stakedBalanceFiat, nftBalance])

  return (
    <$Portfolio>
      <$Title>Overview</$Title>
      <$NetWorthSection>
        <$H5>Net Worth</$H5>
        <div>
          <$NetWorthSContainer>
            <$H1>{config.site.underMaintenanceMood ? '-' : netValue ? `${formatFiatValue(+netValue)}` : `0.00`}</$H1>
            {netWorthLoaderState && <Loader size={0.5} />}
          </$NetWorthSContainer>
          <$AssetContainer>
            <$HighLightText color={paletteColors.greyV4}>Assets: </$HighLightText>
            <$Text>
              {config.site.underMaintenanceMood ? '-' : assetValue ? `${formatFiatValue(+assetValue)}` : `0.00`}
            </$Text>
            {assetLoaderState && <Loader size={0.25} />}
          </$AssetContainer>
        </div>
      </$NetWorthSection>
      <$TabsGroup>
        <$TabsItem selected={tab === Tabs.MAIN} onClick={() => setTab(Tabs.MAIN)}>
          Portfolio
        </$TabsItem>
        <$TabsItem selected={tab === Tabs.NFTS} onClick={() => setTab(Tabs.NFTS)}>
          NFTs
        </$TabsItem>
        <$TabsItem selected={tab === Tabs.HISTORY} onClick={() => setTab(Tabs.HISTORY)}>
          History
        </$TabsItem>
      </$TabsGroup>
      <$HorizontalDivision />
      {tab === Tabs.MAIN && (
        <>
          {config.site.underMaintenanceMood ? (
            <UnderMaintenanceCard />
          ) : (
            <>
              <$AccountText>
                <$H4>{'Account Overview'}</$H4>
                <$NetworkVisibilityHandlerContainer>
                  <NetworkVisibilityHandler />
                </$NetworkVisibilityHandlerContainer>
              </$AccountText>
              <OverviewSection>
                {balanceFiat && <WalletCard loading={balanceFiat === 'loading'} />}
                {stakedBalanceFiat && <StakingCard loading={stakedBalanceFiat === 'loading'} />}
                {parseFloat(stakedBalanceFiat) === 0 && parseFloat(balanceFiat) === 0 && (
                  <EmptyCard image={noAssetImage} text="No assets found">
                    You haven&apos;t gotten any assets in your wallet
                  </EmptyCard>
                )}
              </OverviewSection>
              {areThereNetworks() && (
                <$AccountText>
                  <$H4>Networks</$H4>
                </$AccountText>
              )}
              <OverviewSection>
                {convertedBalances && convertedBalances.length > 0 ? (
                  convertedBalances.map((network: DigestedTokenBalance, index: number) => {
                    if (
                      network &&
                      networks &&
                      networks[network.networkName.toUpperCase()] &&
                      network.products.length > 0
                    ) {
                      return (
                        <ExhibitCard image={network.networkImage} text={network.networkName} key={index}>
                          {formatFiatValue(+parsedNetworkTotal(network, stakedPools))}
                        </ExhibitCard>
                      )
                    }
                  })
                ) : (
                  <></>
                )}
              </OverviewSection>
            </>
          )}
        </>
      )}
      {tab === Tabs.NFTS && <NFTS />}
      {tab === Tabs.HISTORY && <TransactionHistory />}
      <WalletModal isOpen={modalOpen} onClose={toggleModal} />
    </$Portfolio>
  )
}
