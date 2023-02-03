import styled from 'styled-components'
import { $H3, $H5, $MediumTextBold, Loader, UnderMaintenanceCard, EmptyCard } from '../uiKit'
import { Devices } from '../../styles/constants/devices'
import { useStakingState } from '../../context/staking'
import { PoolTable } from './pool-table'
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { useAuthState } from '../../context/auth'
import { InvestmentTable } from './liquidity-investment-table'
import { NetworkDropdown } from '../network-dropdown/network-dropdown'
import { Networks, NetworksLogo, Routes } from '../../types'
import { config } from '../../config/env.config'
import rightDisabledArrow from '../../public/images/right-disabled-arrow.svg'
import rightEnabledArrow from '../../public/images/right-enabled-arrow.svg'
import leftEnabledArrow from '../../public/images/left-enabled-arrow.svg'
import leftDisabledArrow from '../../public/images/left-disabled-arrow.svg'
import shyftPoolIconEnabled from '../../public/images/shyft-pool-icon-enabled.svg'
import { useRouter } from 'next/router'

const $LiquidityPool = styled.div`
  display: flex;
  margin-top: 60px;
  min-height: calc(100vh - 258px);
  flex-direction: column;
  @media ${Devices.laptop} {
    margin-top: 32px;
  }
`

const Title = styled($H3)`
  @media ${Devices.laptop} {
    display: inline-block;
  }
`

const SubTitle = styled($MediumTextBold)`
  max-width: 80%;
  color: ${(props) => props.theme.palette.greyV4};
`

const $InteractionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  @media ${Devices.laptop} {
    margin: 0px 24px 12px 24px;
  }
`

const $Opportunities = styled($H5)`
  margin-top: 20px;
  margin-bottom: 24px;
  @media ${Devices.laptop} {
    margin-top: 32px;
    margin-bottom: 24px;
  }
`

const $Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin: 0 5px;
  max-width: 75px;
  @media ${Devices.laptop} {
    margin: 0 10px;
    max-width: 100px;
  }
`

const $PaginationIndexButton = styled.div`
  position: relative;
  background-color: transparent;
  color: ${(props) => props.theme.dark.text};
  border: none;
  transition: all 0.3s;
  height: 22px;
  width: 22px;
  &:hover {
    color: ${(props) => props.theme.dark.primary};
    cursor: pointer;
  }
`

const $PaginationIndexValue = styled.div`
  visibility: hidden;
  width: 32px;
  @media ${Devices.laptop} {
    display: inline-block;
    min-width: 10ch;
    visibility: visible;
    font-family: 'Neuzeit Grotesk';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    align-self: center;
    text-align: center;
  }
`
const $Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const $LoaderContainer = styled($Center)`
  height: 100vh;
`

const $CurrentInvestmentWrapper = styled.div`
  margin-bottom: 8px;
  @media ${Devices.laptop} {
    margin: 0px 24px 12px 24px;
  }
`

const $Investment = styled($H5)`
  margin-top: 20px;
  margin-bottom: 24px;
  @media ${Devices.laptop} {
    margin-top: 32px;
    margin-bottom: 24px;
  }
`

const $DropdownWrapper = styled.div`
  margin-top: 8px;
  width: min(80%, 224px);
  margin-bottom: 16px;
  @media ${Devices.laptop} {
    width: max(25%, 330px);
    margin-bottom: 0px;
  }
`

const $Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
`

const $Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${Devices.laptop} {
    margin-left: 24px;
    margin-bottom: 32px;
  }
`

const $ContainerEmptyComponent = styled.div`
  display: flex;
  height: 350px;
  width: 100%;
  align-items: center;
`

export const LiquidityPool = (): React.ReactElement => {
  const { appsSupported, stakedBalances, loadingStakedBalance } = useStakingState()
  const { currentNetworkName } = useAuthState()
  const [poolNetwork, setPoolNetwork] = useState(NetworksLogo.ETHEREUM)
  const [paginationIndex, setPaginationIndex] = useState(1)
  const [cryptoList, setCryptoList] = useState(
    appsSupported?.filter((pool) => pool.network === currentNetworkName.toLowerCase())
  )
  const router = useRouter()

  const poolData = useMemo(() => {
    if (cryptoList.length > 0) {
      const flattedAr = cryptoList.map((crypto) => crypto.stakingItems.flat())
      return flattedAr.flat().sort(function (a, b) {
        if (a.liquidity > b.liquidity) return -1
        else if (a.liquidity < b.liquidity) return 1
        else return 0
      })
    } else {
      return []
    }
  }, [cryptoList])

  const handledButtonClick = (): void => {
    router.push(Routes.POOL_SHYFT)
  }

  useEffect(() => {
    setCryptoList(appsSupported?.filter((pool) => pool.network === currentNetworkName.toLowerCase()))
  }, [currentNetworkName, appsSupported, stakedBalances])

  useEffect(() => {
    switch (currentNetworkName) {
      case Networks.POLYGON:
        setPoolNetwork(NetworksLogo.POLYGON)
        break
      case Networks['BINANCE-SMART-CHAIN']:
        setPoolNetwork(NetworksLogo.BINANCE)
        break
      case Networks.ETHEREUM:
        setPoolNetwork(NetworksLogo.ETHEREUM)
        break
    }
  }, [currentNetworkName])

  const getHeader = (): React.ReactElement => {
    return (
      <>
        <$Container>
          <Title>Liquidity Pools</Title>
          <SubTitle>Earn trading fees by providing liquidity in a single transaction.</SubTitle>
          <$DropdownWrapper>
            <NetworkDropdown menuPlacement="bottom" />
          </$DropdownWrapper>
        </$Container>
        <$Line />
      </>
    )
  }
  if (config.site.underMaintenanceMood) {
    return (
      <$LiquidityPool>
        {getHeader()}
        <UnderMaintenanceCard />
      </$LiquidityPool>
    )
  }

  return (
    <$LiquidityPool>
      {getHeader()}
      {currentNetworkName === Networks.SHYFT || currentNetworkName === Networks.SHYFT_TESTNET ? (
        <$ContainerEmptyComponent>
          <EmptyCard
            image={shyftPoolIconEnabled}
            text="Staking on Shyft Network"
            textButton="Go to SHFT Stake"
            size="bigger"
            onClick={handledButtonClick}
          >
            {`If you want to stake your SHFT tokens on Shyft network, go to SHFT Stake section.`}
          </EmptyCard>
        </$ContainerEmptyComponent>
      ) : (
        <>
          {loadingStakedBalance ? (
            <>
              <$CurrentInvestmentWrapper>
                <$Investment>Current Investment</$Investment>
              </$CurrentInvestmentWrapper>
              <$Center>
                <Loader />
              </$Center>
            </>
          ) : stakedBalances.length > 0 &&
            stakedBalances[0]?.products[0]?.assets[0]?.tokens[0]?.network === currentNetworkName ? (
            <>
              <$CurrentInvestmentWrapper>
                <$Investment>Current Investment</$Investment>
              </$CurrentInvestmentWrapper>
              <InvestmentTable data={stakedBalances} poolNetwork={poolNetwork} />
            </>
          ) : null}
          <$InteractionContainer>
            <$Opportunities>Explore</$Opportunities>
            <$Pagination>
              <$PaginationIndexButton
                onClick={() => (paginationIndex > 1 ? setPaginationIndex(paginationIndex - 1) : null)}
              >
                <Image src={paginationIndex === 1 ? leftDisabledArrow : leftEnabledArrow} layout="fill" />
              </$PaginationIndexButton>
              <$PaginationIndexValue>
                {paginationIndex} of {Math.ceil(poolData.length / 20)}
              </$PaginationIndexValue>
              <$PaginationIndexButton
                onClick={() =>
                  paginationIndex < Math.ceil(poolData.length / 20) ? setPaginationIndex(paginationIndex + 1) : null
                }
              >
                <Image
                  src={paginationIndex === Math.ceil(poolData.length / 20) ? rightDisabledArrow : rightEnabledArrow}
                  layout="fill"
                />
              </$PaginationIndexButton>
            </$Pagination>
          </$InteractionContainer>
          {poolData && poolData.length > 0 ? (
            <PoolTable data={poolData} poolNetwork={poolNetwork} paginationIndex={paginationIndex} itemsPerPage={20} />
          ) : (
            <$LoaderContainer>
              <Loader />
            </$LoaderContainer>
          )}
        </>
      )}
    </$LiquidityPool>
  )
}
