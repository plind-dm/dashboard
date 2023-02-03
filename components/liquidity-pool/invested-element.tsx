import styled from 'styled-components'
import { TokenImage } from './token-image'
import { $DataWrapper, $ImageWrapper, $TokenImage, $TextWrapper, $MoreTokens } from './pool-element'
import { StakedAsset, StakedItem } from '../../types'
import { Devices } from '../../styles/constants/devices'
import { useBalanceState } from '../../context/balances'
import { WithdrawModal } from './withdraw-modal'
import { useState } from 'react'
import { LiquidityPoolModal } from '../liquidity-pool/liquidity-pool-modal'
import { useStakingDispatch, setCurrentStakingItem } from '../../context/staking'
import { useDevices } from '../../hooks/useDevices'
import { InvestmentDetailMobileModal } from './investment-detail-mobile-modal'
import { currencyConversion } from './current-currency-conversion'
import React from 'react'
import { useFormatter } from '../../hooks/useFormatter'
import { MobileWarningModal } from '../../components/modal/warning-modal'
import { $NormalTextBold, $SmallTextRegular } from '../uiKit'

const $InvestedElement = styled.tr`
  @media ${Devices.laptop} {
    &:hover {
      background: ${(props) => props.theme.palette.hover};
    }
  }
  .not-in-mobile {
    display: none;
    @media ${Devices.laptop} {
      display: table-cell;
    }
  }
`

const $TokenValue = styled($SmallTextRegular)`
  margin-top: 4px;
  color: ${(props) => props.theme.palette.greyV4};
`

const $DataValue = styled.td`
  padding-left: 24px;
  @media ${Devices.laptop} {
    padding-left: 0px;
  }
`

const $InvestButton = styled.button`
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  min-height: 30px;
  background-color: ${(props) => props.theme.dark.primary};
  color: ${(props) => props.theme.dark.text};
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 13px;
  :hover {
    cursor: pointer;
  }
`

const $WithdrawButton = styled($InvestButton)`
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid #512d6d;
  color: #994d7e;
`

const $InvestmentDataWrapper = styled($DataWrapper)`
  display: flex;
  align-items: center;
  height: 61px;
  justify-content: flex-start;
  padding-left: 13.5px;
  column-gap: 8px;
  @media ${Devices.laptop} {
    padding-left: 56px;
    height: 75px;
  }
`

const $InvestButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`

interface InvestedElementInterface {
  index: number
  poolNetwork: string
  children: StakedAsset
}

export const InvestedElement = ({ children }: InvestedElementInterface): React.ReactElement | null => {
  const { currentCurrency, fiatRates } = useBalanceState()
  const { formatFiatValue, formatTokenValue } = useFormatter()
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const stakingDispatch = useStakingDispatch()
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const { isMobile } = useDevices()
  const [mobileDetailState, setMobileDetailState] = useState(false)
  const [mobileWarningModal, setMobileWarningModal] = useState(false)

  const toggleWithdrawModal = (): void => {
    setWithdrawModalOpen(!withdrawModalOpen)
  }

  const toggleDepositModal = (): void => {
    setDepositModalOpen(!depositModalOpen)
  }

  const invest = (stakedItem: StakedItem): void => {
    if (!depositModalOpen) {
      stakingDispatch(setCurrentStakingItem(stakedItem))
      toggleDepositModal()
    }
  }

  const withdraw = (stakedItem: StakedItem): void => {
    if (!withdrawModalOpen) {
      stakingDispatch(setCurrentStakingItem(stakedItem))
      toggleWithdrawModal()
    }
  }

  const detailModalChanger = (): void => {
    setMobileDetailState(!mobileDetailState)
  }

  const toggleMobileModalClose = (): void => {
    setMobileWarningModal(false)
    detailModalChanger()
  }

  const toggleMobileModalOpen = (): void => {
    setMobileWarningModal(true)
  }

  const tokensCounter = children.tokens.length - 3
  return (
    <>
      {children.tokens.map((stakedItem: StakedItem) => {
        return (
          <React.Fragment key={stakedItem.address}>
            <$InvestedElement
              onClick={() =>
                isMobile && (!depositModalOpen || !withdrawModalOpen) && !mobileWarningModal
                  ? toggleMobileModalOpen()
                  : undefined
              }
            >
              <$InvestmentDataWrapper>
                <$ImageWrapper>
                  {stakedItem.tokens.map((token, index) => {
                    if (index <= 2) return <TokenImage place={index} token={token} key={token.address} />
                  })}
                  {tokensCounter > 0 && (
                    <$TokenImage place={3}>
                      <$MoreTokens>{tokensCounter}+</$MoreTokens>
                    </$TokenImage>
                  )}
                </$ImageWrapper>
                <$TextWrapper>
                  <$NormalTextBold>{stakedItem.label}</$NormalTextBold>
                  <$SmallTextRegular>{children.appName}</$SmallTextRegular>
                </$TextWrapper>
              </$InvestmentDataWrapper>
              <$DataValue>
                <$NormalTextBold as="div">
                  {fiatRates
                    ? `${formatFiatValue(+currencyConversion(children.balanceUSD, fiatRates, currentCurrency))}`
                    : 'Loading...'}
                  <$TokenValue className="not-in-mobile">
                    {`${formatTokenValue(stakedItem.tokens[0].balance, 2)}
              ${stakedItem.tokens[0].symbol}
              /
              ${formatTokenValue(stakedItem.tokens[1].balance, 2)}
              ${stakedItem.tokens[1].symbol}`}
                  </$TokenValue>
                </$NormalTextBold>
              </$DataValue>
              <td className="not-in-mobile">
                <$InvestButtonContainer>
                  <$WithdrawButton onClick={() => withdraw(stakedItem)}>Withdraw</$WithdrawButton>
                  <$InvestButton onClick={() => invest(stakedItem)}>Deposit</$InvestButton>
                </$InvestButtonContainer>
              </td>
            </$InvestedElement>
            {depositModalOpen && <LiquidityPoolModal isOpen={depositModalOpen} onClose={toggleDepositModal} />}
            {withdrawModalOpen && (
              <WithdrawModal isOpen={withdrawModalOpen} onClose={toggleWithdrawModal} investedPool={stakedItem} />
            )}
            {(!depositModalOpen || !withdrawModalOpen) && mobileWarningModal && (
              <MobileWarningModal isOpen={mobileWarningModal} onClose={toggleMobileModalClose} />
            )}
            <InvestmentDetailMobileModal
              state={mobileDetailState}
              closer={detailModalChanger}
              data={children}
              withdrawAction={toggleWithdrawModal}
              depositAction={toggleDepositModal}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
