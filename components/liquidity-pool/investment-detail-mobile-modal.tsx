import styled from 'styled-components'
import { $Divider, $H2, $H6 } from '../uiKit'
import Image from 'next/image'
import { StakedAsset, StakingItem } from '../../types'
import numeral from 'numeral'
import { liquidityCalculation } from './liquidity-calcs'
import { setCurrentStakingItem, useStakingDispatch } from '../../context/staking'
import { useBalanceState } from '../../context/balances'
import { currencyConversion } from './current-currency-conversion'

const $ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(3px) brightness(50%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`

const $MobileDetailModal = styled.div`
  position: relative;
  min-width: 300px;
  min-height: 400px;
  padding: 30px 25px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.black};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 5;
`

const $TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const $Title = styled($H2)`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
`

const $TokensContainer = styled.div`
  display: flex;
  &:first-child {
    transform: translateX(-50%);
  }
`

const $FirstToken = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  transform: translateX(50%);
  > span {
    border-radius: 100px;
  }
`

const $SecondToken = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  > span {
    border-radius: 100px;
  }
`

const $BalanceContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const $BalancesNames = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

const $AvailableBalance = styled($H6)`
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  color: ${(props) => props.theme.palette.greyV4};
`

const $BalanceSymbols = styled($H6)`
  font-weight: 400;
  font-size: 16px;
  line-height: 22.4px;
  color: ${(props) => props.theme.palette.greyV4};
`

const $BalanceAmount = styled($H6)`
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
`

const $DailyRewardsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

const $DailyRewardsText = styled($H6)`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.palette.greyV4};
`

const $DailyRewardsNumber = styled($H6)`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.palette.greyV4};
`

const $InvestButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const $InvestButton = styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.theme.dark.primary};
  color: ${(props) => props.theme.dark.text};
  font-weight: 700;
`

interface InvestmentDetailMobileModalInterface {
  closer: () => void
  withdrawAction: () => void
  depositAction: () => void
  state: boolean
  data: StakedAsset
}

export const InvestmentDetailMobileModal = ({
  closer,
  withdrawAction,
  depositAction,
  state,
  data
}: InvestmentDetailMobileModalInterface): React.ReactElement => {
  const { currentCurrencySymbol, currentCurrency, fiatRates } = useBalanceState()
  const { dailyRewardUsd } = fiatRates
    ? liquidityCalculation(
        data.tokens[0].liquidity * fiatRates[currentCurrency],
        data.tokens[0].volume,
        data.tokens[0].fee,
        data.tokens[0].balance
      )
    : liquidityCalculation(data.tokens[0].liquidity, data.tokens[0].volume, data.tokens[0].fee, data.tokens[0].balance)
  const stakingDispatch = useStakingDispatch()

  const openDepositModal = (): void => {
    const dataToPass = data.tokens[0] as unknown
    stakingDispatch(setCurrentStakingItem(dataToPass as StakingItem))
    depositAction()
  }

  return state ? (
    <$ModalBackground onClick={closer}>
      <$MobileDetailModal>
        <$TitleContainer>
          <$Title>Pool</$Title>
          <$TokensContainer>
            <$FirstToken>
              <Image src={data.tokens[0].tokens[0].tokenImageUrl} layout="responsive" height={'30px'} width={'30px'} />
            </$FirstToken>
            <$SecondToken>
              <Image src={data.tokens[0].tokens[1].tokenImageUrl} layout="responsive" height={'30px'} width={'30px'} />
            </$SecondToken>
          </$TokensContainer>
        </$TitleContainer>
        <$BalanceContainer>
          <$BalancesNames>
            <$AvailableBalance>Available Balance</$AvailableBalance>
            <$BalanceSymbols>
              {data.tokens[0].tokens[0].symbol} / {data.tokens[0].tokens[1].symbol}
            </$BalanceSymbols>
          </$BalancesNames>
          <$BalanceAmount>
            {currentCurrencySymbol}{' '}
            {fiatRates ? currencyConversion(data.tokens[0].balanceUSD, fiatRates, currentCurrency) : 'Loading'}
          </$BalanceAmount>
        </$BalanceContainer>
        <$Divider />
        <$AvailableBalance>Total Pool Liquidity</$AvailableBalance>
        <$BalanceAmount>
          {currentCurrencySymbol}{' '}
          {fiatRates ? currencyConversion(data.tokens[0].liquidity, fiatRates, currentCurrency) : 'Loading'}
        </$BalanceAmount>
        <$Divider />
        <$DailyRewardsContainer>
          <$DailyRewardsText>Daily Rewards</$DailyRewardsText>
          <$DailyRewardsNumber>
            {dailyRewardUsd && fiatRates
              ? `${currentCurrencySymbol} ${numeral(parseFloat(dailyRewardUsd)).format('0,0.00000')}`
              : 'N/A'}
          </$DailyRewardsNumber>
        </$DailyRewardsContainer>
        <$InvestButtonContainer>
          <$InvestButton className="withdraw" onClick={withdrawAction}>
            Withdraw
          </$InvestButton>
          <$InvestButton className="deposit" onClick={openDepositModal}>
            Deposit
          </$InvestButton>
        </$InvestButtonContainer>
      </$MobileDetailModal>
    </$ModalBackground>
  ) : (
    <></>
  )
}
