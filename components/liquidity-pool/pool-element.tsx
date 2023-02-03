import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { StakingItem } from '../../types'
import { setCurrentStakingItem, useStakingDispatch } from '../../context/staking'
import { useBalanceState } from '../../context/balances'
import { Devices } from '../../styles/constants/devices'
import { liquidityCalculation } from './liquidity-calcs'
import { LiquidityPoolModal } from '../liquidity-pool/liquidity-pool-modal'
import { useDevices } from '../../hooks/useDevices'
import { useFormatter } from '../../hooks/useFormatter'
import { MobileWarningModal } from '../modal/warning-modal'
import { $NormalTextBold, $SmallTextRegular, Tooltip } from '../uiKit'
import { TokenImage } from './token-image'

interface PoolElementPropsInterface {
  index: number
  children: StakingItem
  poolNetwork: string
}

const $PoolElement = styled.tr`
  height: 61px;
  border-bottom: 1px solid ${(props) => props.theme.palette.paleGrey};
  @media ${Devices.laptop} {
    height: 75px;
    &:hover {
      background: ${(props) => props.theme.palette.hover};
      border-radius: 16px;
    }
  }
  .not-in-mobile {
    display: none;
    @media ${Devices.laptop} {
      display: table-cell;
    }
  }
`

export const $DataWrapper = styled.td`
  display: flex;
  align-items: center;
  height: 61px;
  justify-content: flex-start;
  padding-left: 13.5px;
  @media ${Devices.laptop} {
    column-gap: 8px;
    padding: 0;
    height: 75px;
  }
`

export const $ImageWrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 84px;
`

export const $TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  p + p {
    color: ${(props) => props.theme.palette.greyV4};
  }
`

interface $NetworkImageProps {
  mobileSize?: number
  size?: number
}

export const $NetworkImage = styled.div<$NetworkImageProps>`
  position: relative;
  min-height: ${(props) => (props.mobileSize ? `${props.mobileSize}px` : '25px')};
  min-width: ${(props) => (props.mobileSize ? `${props.mobileSize}px` : '25px')};
  @media ${Devices.laptop} {
    min-height: ${(props) => (props.size ? `${props.size}px` : '32px')};
    min-width: ${(props) => (props.size ? `${props.size}px` : '32px')};
  }
  > span {
    border-radius: 100px;
  }
`

interface $TokenImageProps {
  place: number
}

export const $TokenImage = styled($NetworkImage)<$TokenImageProps>`
  left: -${(props) => props.place * 8}px;
  display: flex;
  @media ${Devices.laptop} {
    left: -${(props) => props.place * 16}px;
  }
`

export const $DestinationPoolToken = styled.div`
  position: relative;
  height: 12.5px;
  width: 12.5px;
  left: -9.375px;
  top: -3.125px;
  @media ${Devices.laptop} {
    height: 16px;
    width: 16px;
    left: -25px;
    top: -12.5px;
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

const $DataLiquidity = styled.td`
  padding-left: 24px;
  padding-right: 13.5px;
  @media ${Devices.laptop} {
    padding-left: 0;
    padding-right: 24px;
  }
`

const $DataIndex = styled.td`
  text-align: center;
`

const $AprYear = styled($NormalTextBold)`
  color: ${(props) => props.theme.dark.text};
`

const $AprWeek = styled($SmallTextRegular)`
  margin-top: 4px;
  color: ${(props) => props.theme.palette.greyV4};
`

const $InvestButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const $MoreTokens = styled.p`
  position: relative;
  height: 14px;
  width: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.pink};
  text-align: center;
  align-self: flex-end;
  z-index: 1;
  font-size: 10px;
  font-weight: 700;
  @media ${Devices.laptop} {
    height: 14px;
    width: 20px;
  }
  :hover {
    cursor: default;
  }
`

export const PoolElement = ({ children, index }: PoolElementPropsInterface): React.ReactElement => {
  const stakingDispatch = useStakingDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const { formatFiatValue, formatBigNumbers } = useFormatter()
  const { currentCurrency, fiatRates } = useBalanceState()
  const { aprYear, aprWeek } = liquidityCalculation(children.liquidity, children.volume, children.fee)
  const { isMobile } = useDevices()
  const [mobileWarningModal, setMobileWarningModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [tokensList, setTokensList] = useState<string>()
  const toggleModalOpen = (): void => {
    setModalOpen(true)
  }

  const toggleModalClose = (): void => {
    setModalOpen(false)
  }

  const invest = (): void => {
    if (!modalOpen) {
      stakingDispatch(setCurrentStakingItem(children))
      toggleModalOpen()
    }
  }

  const toggleMobileModalClose = (): void => {
    setMobileWarningModal(false)
    invest()
  }

  const toggleMobileModalOpen = (): void => {
    setMobileWarningModal(true)
  }

  useEffect(() => {
    setTokensList(
      children.tokens
        .map((token) => token.symbol)
        .slice(3)
        .join(`\n`)
    )
  }, [showTooltip])

  const tokensCounter = children.tokens.length - 3
  return (
    <$PoolElement
      key={children.address}
      onClick={() => (isMobile && !mobileWarningModal && !modalOpen ? toggleMobileModalOpen() : undefined)}
    >
      <$DataIndex className="not-in-mobile edge">
        <$NormalTextBold>{index + 1}</$NormalTextBold>
      </$DataIndex>
      <$DataWrapper>
        <$ImageWrapper>
          {children.tokens.map((token, index) => {
            if (index <= 2) return <TokenImage place={index} token={token} key={token.address} />
          })}
          {tokensCounter > 0 && (
            <$TokenImage place={3} onMouseLeave={() => setShowTooltip(false)} onClick={() => setShowTooltip(true)}>
              <$MoreTokens>{tokensCounter}+</$MoreTokens>
              {!isMobile && showTooltip && tokensList && <Tooltip show text={tokensList} />}
            </$TokenImage>
          )}
        </$ImageWrapper>
        <$TextWrapper>
          <$NormalTextBold>{children.label || children.appId}</$NormalTextBold>
          <$SmallTextRegular>{children.appName}</$SmallTextRegular>
        </$TextWrapper>
      </$DataWrapper>
      <$DataLiquidity>
        <$NormalTextBold>
          {fiatRates
            ? `${formatBigNumbers(formatFiatValue(children.liquidity * fiatRates[currentCurrency]))}`
            : `Loading...`}
        </$NormalTextBold>
      </$DataLiquidity>
      <td className="not-in-mobile">
        <$AprYear>{aprYear}</$AprYear>
        <$AprWeek>{aprWeek}</$AprWeek>
      </td>
      <td className="not-in-mobile">
        <$InvestButtonContainer>
          <$InvestButton onClick={invest}>Invest</$InvestButton>
        </$InvestButtonContainer>
      </td>
      {modalOpen && <LiquidityPoolModal isOpen={modalOpen} onClose={toggleModalClose} />}
      {!modalOpen && mobileWarningModal && (
        <MobileWarningModal isOpen={mobileWarningModal} onClose={toggleMobileModalClose} />
      )}
    </$PoolElement>
  )
}
