import React, { ReactElement, useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import DownArrow from '../public/images/red-down-arrow.svg'
import UpArrow from '../public/images/green-up-arrow.svg'
import CoinGecko from '../public/images/coingecko.svg'
import { useTokenState } from '../context/token/'
import { $H4, $H5, $H6, $Text, BackArrow, ChildPageContainer, Loader } from '../components/uiKit'
import { DigestedTokenAsset, DigestedTokenBalance } from '../pages/api/token-balances'
import { useBalanceState, useBalanceDispatch, setGraphTimeFrame } from '../context/balances'
import { LineChart } from '../components/chart/line-chart'
import { Devices } from '../styles/constants/devices'
import { IProps } from '../interfaces/Iprops'
import { useDevices } from '../hooks/useDevices'
import { useFormatter } from '../hooks/useFormatter'

const $Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`
const $NetworkName = styled($Text)`
  margin-left: 40px;
  font-size: 1.125rem;
  line-height: 1.5625rem;
  color: ${(props) => props.theme.palette.greyV4};
`

const $Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`

const $Name = styled($H4)``

const $TokenImage = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  img {
    border-radius: 8px;
  }
`
const $PriceRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const $FloatingImage = styled.a`
  position: absolute;
  right: 0;
  width: 43px;
  height: 36px;
  top: 36px;
  &:hover {
    cursor: pointer;
  }
  @media ${Devices.laptop} {
    top: -8px;
    width: 50px;
    height: 42px;
  }
`

const $PriceVariation = styled($Text)<IProps>`
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.375rem;
  margin-right: 5px;
  color: ${(props) => (props.error ? props.theme.palette.red : props.theme.palette.green)};
`

const $Date = styled($Text)`
  font-weight: 700px;
  font-size: 1.125rem;
  line-height: 1.5625rem;
  color: ${(props) => props.theme.palette.greyV4};
`

const $Line = styled.div`
  width: 100%;
  margin-top: 8px;
  height: 1px;
  background-color: ${(props) => props.theme.palette.paleGrey};
`
const $Box = styled.div`
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  box-sizing: border-box;
  border-radius: 8px;
`

const $ChartWrapper = styled($Box)`
  padding: 10px;
  @media ${Devices.laptop} {
  }
`

const $ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
  margin-bottom: 20px;
  @media ${Devices.laptop} {
    justify-content: end;
    column-gap: 30px;
  }
`

const $TimeFrameButton = styled.button<IProps>`
  border-radius: 50px;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.palette.greyV4};
  &[data-selected='true'] {
    background-color: ${(props) => props.theme.dark.primary};
    border: 1px solid ${(props) => props.theme.dark.primary};
    color: #ffffff !important;
  }
  padding: 5px;
  height: 36px;
  width: 50px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  transition: all 0.3s;
  :hover {
    cursor: pointer;
  }
  @media ${Devices.laptop} {
    width: 75px;
  }
`

const $MetricSectionWrapper = styled($Box)`
  display: grid;
  padding: 24px;
  row-gap: 40px;
  grid-template-columns: 1fr 1fr;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  @media ${Devices.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 64px 0 64px 64px;
    row-gap: 88px;
  }
`

const $MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${Devices.laptop} {
  }
`

const $MetricPrice = styled($H6)``

const $MetricPercentage = styled($H6)<IProps>`
  color: ${(props) => (props.error ? props.theme.palette.red : props.theme.palette.green)};
`
const $MetricGroup = styled.div`
  display: flex;
  flex-direction: column;
  @media ${Devices.mobileM} {
    gap: 5px;
    flex-direction: row;
  }
`

const $MetricDate = styled($Text)`
  color: ${(props) => props.theme.palette.greyV4};
`

const $MetricName = styled($Text)`
  color: ${(props) => props.theme.palette.greyV4};
`

const $PriceImageWrapper = styled.div`
  display: flex;
`

const $LoaderWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const TokenDetail = ({ network }: { network: string }): ReactElement => {
  const { convertedBalances, currentCurrency, graphTimeFrame } = useBalanceState()
  const balanceDispatch = useBalanceDispatch()
  const { formatFiatValue, formatTokenValue, formatBigNumbers } = useFormatter()
  const { currentToken } = useTokenState()
  const { isMobile } = useDevices()
  const [tokenInfo, setTokenInfo] = useState<DigestedTokenAsset>()

  useEffect(() => {
    const getPrice = (): void => {
      const networkSelected = convertedBalances?.find(
        (networkWithTokens: DigestedTokenBalance) =>
          networkWithTokens.networkId.toLowerCase() === network.toLocaleLowerCase()
      )
      const productSelected = networkSelected?.products.find((product) => product.symbol === currentToken.symbol)
      if (productSelected) {
        setTokenInfo(productSelected)
      }
    }
    getPrice()
  }, [convertedBalances, currentToken])

  const dateChangeHandler = (event: React.BaseSyntheticEvent): void => {
    balanceDispatch(setGraphTimeFrame(event.target.id.toLowerCase()))
  }

  const get24Metric = (): React.ReactElement => {
    return (
      <$MetricItem>
        <$MetricName>{'24 hour Volume'}</$MetricName>
        <$MetricPrice>
          {formatBigNumbers(formatFiatValue(currentToken.volume24h[currentCurrency.toLowerCase()]))}
        </$MetricPrice>
      </$MetricItem>
    )
  }

  return (
    <ChildPageContainer>
      {convertedBalances && currentToken && tokenInfo ? (
        <>
          <BackArrow redirectTo={'/wallet'} />
          <$Column>
            <$NetworkName>{`${network[0].toUpperCase()}${network.slice(1)}`}</$NetworkName>
            <$Row>
              <$TokenImage>
                <Image src={tokenInfo.imageUrl} layout="fill" />
              </$TokenImage>
              <$Name>
                {currentToken.name} ({currentToken.symbol})
              </$Name>
            </$Row>
            <$FloatingImage target="_blank" href={`https://www.coingecko.com/en/coins/${currentToken.coingeckoId}`}>
              <Image src={CoinGecko} layout="fill" />
            </$FloatingImage>
            <$PriceRow>
              <$H5>{`${formatFiatValue(+tokenInfo.cryptoPrice.toFixed(2))}`}</$H5>
              <$PriceImageWrapper>
                <$PriceVariation error={currentToken.priceChangePercentage24h.toString().includes('-')}>
                  {currentToken.priceChangePercentage24h.toFixed(2)}
                </$PriceVariation>
                <Image
                  src={currentToken.priceChangePercentage24h.toString().includes('-') ? DownArrow : UpArrow}
                  width="9px"
                  height="11px"
                />
              </$PriceImageWrapper>
            </$PriceRow>
            <$Date>{new Date().toLocaleString('en-US')}</$Date>
          </$Column>
          <$Line />
          <$ChartWrapper>
            <$ButtonsContainer>
              <$TimeFrameButton id="day" data-selected={graphTimeFrame === 'day'} onClick={dateChangeHandler}>
                {isMobile ? '1D' : 'DAY'}
              </$TimeFrameButton>
              <$TimeFrameButton id="week" data-selected={graphTimeFrame === 'week'} onClick={dateChangeHandler}>
                {isMobile ? '1W' : 'WEEK'}
              </$TimeFrameButton>
              <$TimeFrameButton id="month" data-selected={graphTimeFrame === 'month'} onClick={dateChangeHandler}>
                {isMobile ? '1M' : 'MONTH'}
              </$TimeFrameButton>
              <$TimeFrameButton id="year" data-selected={graphTimeFrame === 'year'} onClick={dateChangeHandler}>
                {isMobile ? '1Y' : 'YEAR'}
              </$TimeFrameButton>
            </$ButtonsContainer>
            <LineChart />
          </$ChartWrapper>
          <$MetricSectionWrapper>
            <$MetricItem>
              <$MetricName>{'Market Cap'}</$MetricName>
              <$MetricPrice>
                {formatBigNumbers(formatFiatValue(currentToken.marketCap[currentCurrency.toLowerCase()]))}{' '}
              </$MetricPrice>
            </$MetricItem>
            <$MetricItem>
              <$MetricName>{'Circulating supply'}</$MetricName>
              <$MetricPrice>
                {formatTokenValue(+currentToken.circulatingSupply, 2).toUpperCase() + ' ' + currentToken.symbol}
              </$MetricPrice>
            </$MetricItem>
            {!isMobile && get24Metric()}
            <$MetricItem>
              <$MetricName>{'All-time High'}</$MetricName>
              <$MetricGroup>
                <$MetricPrice>{formatFiatValue(currentToken.ath.price[currentCurrency.toLowerCase()])}</$MetricPrice>
                <$MetricPercentage
                  error={currentToken.ath.percent[currentCurrency.toLowerCase()].toString().includes('-')}
                >
                  {currentToken.ath.percent[currentCurrency.toLowerCase()].toFixed(2) + '%'}
                </$MetricPercentage>
              </$MetricGroup>
              <$MetricDate>
                {new Date(currentToken.ath.date[currentCurrency.toLowerCase()]).toLocaleString('en-US')}
              </$MetricDate>
            </$MetricItem>
            <$MetricItem>
              <$MetricName>{'All-time Low'}</$MetricName>
              <$MetricGroup>
                <$MetricPrice>{formatFiatValue(currentToken.atl.price[currentCurrency.toLowerCase()])}</$MetricPrice>
                <$MetricPercentage
                  error={currentToken.atl.percent[currentCurrency.toLowerCase()].toString().includes('-')}
                >
                  {currentToken.atl.percent[currentCurrency.toLowerCase()].toFixed(2) + '%'}
                </$MetricPercentage>
              </$MetricGroup>
              <$MetricDate>
                {new Date(currentToken.atl.date[currentCurrency.toLowerCase()]).toLocaleString('en-US')}
              </$MetricDate>
            </$MetricItem>
            {isMobile && get24Metric()}
          </$MetricSectionWrapper>
        </>
      ) : (
        <$LoaderWrapper>
          <Loader />
        </$LoaderWrapper>
      )}
    </ChildPageContainer>
  )
}
