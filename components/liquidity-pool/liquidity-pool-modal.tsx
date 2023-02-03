import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  getStakingTransaction,
  getSupportedApps,
  setTxHash,
  useStakingDispatch,
  useStakingState
} from '../../context/staking'
import { useBalanceState } from '../../context/balances'
import { liquidityCalculation } from './liquidity-calcs'
import { useAuthState } from '../../context/auth'
import { TokensLogo, TokensSymbol } from '../../types'
import { Networks, StakingTypes, NativeTokens } from '../../types'
import { TransactionSettings } from './transaction-settings'
import {
  $RowItem,
  $InputSellAmount,
  $BalanceText,
  $ErrorText,
  $ContainerPoolAmount,
  $TokenNetworkWrapper,
  $CircleImage,
  $MaxButton,
  $BalanceContainer,
  $BalanceFiat,
  $BalanceCrypto,
  $InputPoolAmount,
  $PoolAllocation,
  $Wrapper,
  $PollAllocationToken,
  $ImageWrapper,
  $DepositButton,
  $DepositButtonWrapper,
  $InputRewards,
  $TokenSelectionDropdown,
  $DropdownTokenContainer,
  $NormalTextBoldGrey,
  $ModalContainer,
  $ColumItem,
  $EllipsisText,
  $NormalTextRegularGrey,
  $Title
} from './staking-modal-styles'
import { IModalProps, TokenDropdownOption } from './liquidity-pool-modal-interfaces'
import {
  $Divider,
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
  TxNotificationToaster,
  $LargeTextBold,
  $NormalTextBold,
  Loader
} from '../uiKit'
import { BaseModal } from '../modal/base-modal'
import { showExponentialNumber } from '../../utils/price-utils'
import { useFormatter } from '../../hooks/useFormatter'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { TokenImage } from './token-image'
import { DigestedTokenAsset } from '../../pages/api/token-balances'

const $ModalWrapper = styled.div`
  #modal {
    overflow: auto;
    padding: 150px 0 25px 0;
    @media ${Devices.mobileL} {
      overflow: unset;
      padding: 0;
    }
  }
`

export const LiquidityPoolModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const { formatFiatValue } = useFormatter()
  //* Global state
  const stakingDispatch = useStakingDispatch()
  const { currentNetworkName, walletAddress } = useAuthState()
  const { convertedBalances, fiatRates, currentCurrency, networks, currentCurrencySymbol } = useBalanceState()
  const { currentStakingItem, slippageTolerance } = useStakingState()
  //* Internal State
  const [sellAmount, setSellAmount] = useState<number>(0)
  const [sellAmountInput, setSellAmountInput] = useState<number>()
  const [poolAmount, setPoolAmount] = useState<number>(0)
  const [dailyRewards, setDailyRewards] = useState<number>(0)
  const [balanceChecker, setBalanceChecker] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [switchTokenImage, setSwitchTokenImage] = useState(TokensLogo.ETHEREUM)
  const [switchTokenSymbol, setSwitchTokenSymbol] = useState(TokensSymbol.ethereum)
  const [dropdownOptions, setDropdownOptions] = useState<Array<TokenDropdownOption>>()
  const [currentSelectedToken, setCurrentSelectedToken] = useState<DigestedTokenAsset>()

  const cleanModalState = (): void => {
    setSellAmount(0)
    setSellAmountInput(undefined)
    setPoolAmount(0)
    setDailyRewards(0)
    onClose()
  }

  const changeValue = (value: number): void => {
    if (fiatRates && value && currentSelectedToken) {
      setSellAmount(value)
      setSellAmountInput(value)
      const poolAmountValue = (value * currentSelectedToken.cryptoPrice) / currentStakingItem.price
      setPoolAmount(poolAmountValue)
      const { dailyRewardUsd } = liquidityCalculation(
        currentStakingItem.liquidity * fiatRates[currentCurrency],
        currentStakingItem.volume,
        currentStakingItem.fee,
        value / fiatRates[NativeTokens[currentNetworkName]]
      )
      if (dailyRewardUsd) {
        setDailyRewards(parseFloat(dailyRewardUsd))
      }
      const disabledButtonCalc = value > currentSelectedToken.balanceCrypto || value <= 0
      setDisabledButton(disabledButtonCalc)
      if (convertedBalances) {
        setBalanceChecker(value > currentSelectedToken.balanceCrypto)
      }
    } else {
      setSellAmount(0)
      setSellAmountInput(undefined)
      setPoolAmount(0)
      setDailyRewards(0)
    }
  }

  const setToMax = (): void => {
    if (currentSelectedToken) {
      changeValue(currentSelectedToken.balanceCrypto)
      setSellAmountInput(parseFloat(showExponentialNumber(currentSelectedToken.balanceCrypto, 2)))
    }
  }

  const tokenSwitcher = (tokenLogo: TokensLogo, tokenSymbol: TokensSymbol): void => {
    setSwitchTokenImage(tokenLogo)
    setSwitchTokenSymbol(tokenSymbol)
  }

  const onDropdownChangeHandler = (e: unknown): void => {
    setCurrentSelectedToken((e as TokenDropdownOption).data)
    setSellAmount(0.0)
    setSellAmountInput(0)
    setPoolAmount(0)
    setDailyRewards(0)
  }

  useEffect(() => {
    const networkTokens = convertedBalances?.find((network) => network.networkId === currentNetworkName)?.products
    const nativeToken = networkTokens?.find((product) => {
      return product.symbol.toUpperCase() === switchTokenSymbol.toUpperCase()
    })
    const defaultOption = {
      value: switchTokenSymbol,
      label: (
        <$DropdownTokenContainer>
          <$CircleImage>
            <Image src={switchTokenImage} layout="fill" />
          </$CircleImage>
          <$LargeTextBold>{switchTokenSymbol}</$LargeTextBold>
        </$DropdownTokenContainer>
      ),
      data: nativeToken || {
        balanceCrypto: 0,
        balanceFiat: 0,
        cryptoPrice: 0,
        imageUrl: switchTokenImage,
        name: switchTokenSymbol,
        symbol: switchTokenSymbol,
        address: '',
        network: currentNetworkName
      }
    }
    setDropdownOptions([defaultOption])
    setCurrentSelectedToken(defaultOption.data)
    // }
  }, [currentNetworkName, switchTokenImage, switchTokenSymbol])

  useEffect(() => {
    if (convertedBalances) {
      const foundConvertedBalance = convertedBalances.find(
        (network) => network.networkId.toLowerCase() === currentNetworkName.toLowerCase()
      )
      switch (foundConvertedBalance?.networkId.toUpperCase()) {
        case 'POLYGON':
          tokenSwitcher(TokensLogo.POLYGON, TokensSymbol.polygon)
          break
        case 'BINANCE-SMART-CHAIN':
          tokenSwitcher(TokensLogo['BINANCE-SMART-CHAIN'], TokensSymbol['binance-smart-chain'])
          break
        case 'ETHEREUM':
          tokenSwitcher(TokensLogo.ETHEREUM, TokensSymbol.ethereum)
          break
      }
    }
  }, [currentNetworkName])

  const investmentHandler = (): void => {
    setShowLoader(true)
    stakingDispatch(
      getStakingTransaction(
        {
          type: currentStakingItem.category as StakingTypes,
          appId: currentStakingItem.appId,
          network: currentStakingItem.network as Networks,
          ownerAddress: walletAddress as string,
          payoutTokenAddress: walletAddress as string,
          poolAddress: currentStakingItem.address,
          sellAmount: sellAmount.toString(),
          slippagePercentage: slippageTolerance,
          sellTokenAddress: currentSelectedToken?.address || '0x0000000000000000000000000000000000000000'
        },
        {
          onTxError: () => {
            showErrorToast('Transaction was rejected')
            setShowLoader(false)
          },
          onTxSuccess: (txHash: string) => {
            stakingDispatch(setTxHash(txHash))
            showSuccessToast(
              `Adding ${sellAmount.toFixed(2)} ${currentSelectedToken?.symbol} to ${currentStakingItem.label}.`
            )
            setShowLoader(false)
          },
          onTxLoading: (txHash: string) => {
            stakingDispatch(setTxHash(txHash))
            showLoadingToast(
              `Adding ${sellAmount.toFixed(2)} ${currentSelectedToken?.symbol} to ${currentStakingItem.label}.`,
              currentSelectedToken?.imageUrl || switchTokenImage
            )
          },
          onTxFinished: () => {
            cleanModalState()
            if (walletAddress) {
              setTimeout(() => {
                stakingDispatch(getSupportedApps(currentNetworkName, walletAddress, networks))
              }, 5000)
            }
          }
        }
      )
    )
  }

  if (!currentSelectedToken) return <></>

  return (
    <>
      <$ModalWrapper>
        <BaseModal isOpen={isOpen} onClose={cleanModalState}>
          <$ModalContainer>
            <$ColumItem>
              <$Title>{'Deposit'}</$Title>
              <$NormalTextRegularGrey>{'From'}</$NormalTextRegularGrey>
              <$RowItem>
                <$TokenNetworkWrapper>
                  {dropdownOptions && dropdownOptions.length > 1 ? (
                    <$TokenSelectionDropdown
                      closeMenuOnSelect={true}
                      defaultValue={dropdownOptions[0]}
                      options={dropdownOptions}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onChange={onDropdownChangeHandler}
                    />
                  ) : dropdownOptions && dropdownOptions[0] ? (
                    dropdownOptions[0].label
                  ) : (
                    <></>
                  )}
                  <$MaxButton type="button" value="Max" onClick={setToMax} />
                </$TokenNetworkWrapper>
                <$InputSellAmount
                  type="number"
                  placeholder="0.0"
                  value={sellAmountInput}
                  onChange={({ target: { value } }) => changeValue(+value)}
                  balanceChecker={balanceChecker}
                />
              </$RowItem>
              <$RowItem>
                <$BalanceText>
                  <$NormalTextBoldGrey>{'Balance'}</$NormalTextBoldGrey>
                  <$ErrorText>{balanceChecker ? 'Insufficient balance' : ''}</$ErrorText>
                </$BalanceText>
                {convertedBalances && (
                  <$BalanceContainer>
                    <$BalanceFiat>
                      {fiatRates && `${formatFiatValue(currentSelectedToken.balanceFiat * fiatRates[currentCurrency])}`}
                    </$BalanceFiat>
                    <$BalanceCrypto>{`${showExponentialNumber(currentSelectedToken.balanceCrypto, 3)} ${
                      currentSelectedToken.symbol || switchTokenSymbol
                    }`}</$BalanceCrypto>
                  </$BalanceContainer>
                )}
              </$RowItem>
            </$ColumItem>
            <$Divider />
            <$NormalTextRegularGrey>{'To'}</$NormalTextRegularGrey>
            <$RowItem>
              <$ContainerPoolAmount>
                <$CircleImage>
                  {currentStakingItem.img ? <Image src={currentStakingItem.img} layout="fill" /> : ''}
                </$CircleImage>
                <div>
                  <$EllipsisText>{currentStakingItem.label}</$EllipsisText>
                  <$NormalTextRegularGrey>{currentStakingItem.appName}</$NormalTextRegularGrey>
                </div>
              </$ContainerPoolAmount>
              <$InputPoolAmount type="number" placeholder={showExponentialNumber(poolAmount, 3)} disabled />
            </$RowItem>
            <$PoolAllocation>
              <$RowItem>
                <$NormalTextRegularGrey>{'Est. Pool Allocation'}</$NormalTextRegularGrey>
                <$NormalTextRegularGrey>{'Daily Rewards'}</$NormalTextRegularGrey>
              </$RowItem>
              <$RowItem>
                <$Wrapper>
                  {currentStakingItem.tokens?.map((token, index) => {
                    return (
                      <$PollAllocationToken key={index}>
                        <$ImageWrapper>
                          <TokenImage place={0} token={token} size={24} mobileSize={20} />
                        </$ImageWrapper>
                        <$NormalTextBold>
                          {poolAmount === 0
                            ? poolAmount
                            : showExponentialNumber(poolAmount / currentStakingItem.tokens.length / token.price, 4)}
                        </$NormalTextBold>
                        <$NormalTextBold>{token.symbol}</$NormalTextBold>
                      </$PollAllocationToken>
                    )
                  })}
                </$Wrapper>
                <$InputRewards
                  type="number"
                  placeholder={
                    dailyRewards === 0
                      ? `${currentCurrencySymbol}${dailyRewards}`
                      : `${currentCurrencySymbol}${showExponentialNumber(dailyRewards, 4)}`
                  }
                  disabled
                />
              </$RowItem>
            </$PoolAllocation>
            <$Divider />
            <TransactionSettings poolAmount={Number(poolAmount)} />
            <$DepositButtonWrapper>
              <$DepositButton onClick={investmentHandler} disabled={disabledButton || showLoader}>
                {showLoader && <Loader size={0.3} />}
                Deposit
              </$DepositButton>
            </$DepositButtonWrapper>
          </$ModalContainer>
        </BaseModal>
      </$ModalWrapper>
      {isOpen && <TxNotificationToaster />}
    </>
  )
}
