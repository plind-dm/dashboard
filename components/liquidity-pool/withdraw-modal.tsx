import styled from 'styled-components'
import Image from 'next/image'
import {
  $Divider,
  $H5,
  $LargeTextBold,
  $NormalTextBold,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
  TxNotificationToaster,
  Loader
} from '../uiKit'
import { useEffect, useState } from 'react'
import { Devices } from '../../styles/constants/devices'
import { ApprovalState, NativeTokens, Networks, StakedItem, StakingTypes } from '../../types'
import { TokensLogo, TokensSymbol } from '../../types'
import { useBalanceState } from '../../context/balances'
import { TransactionSettings } from './transaction-settings'
import {
  useStakingState,
  useStakingDispatch,
  checkApprovalStateToWithdraw,
  sendApprovalTransactionToWithdraw,
  getWithdrawTransaction,
  setApprovalTransaction,
  setTxHash,
  getSupportedApps
} from '../../context/staking'
import { useAuthState } from '../../context/auth'
import { BaseModal } from '../modal/base-modal'
import { $ColumItem, $EllipsisText, $NormalTextRegularGrey, $RowItem } from './staking-modal-styles'
import { getStringFromExponentialNumber, showExponentialNumber } from '../../utils/price-utils'
import { useTokenState } from '../../context/token'

interface WithdrawModalInterface {
  onClose: () => void
  isOpen: boolean
  investedPool: StakedItem
}

const $WithdrawModal = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  @media ${Devices.laptop} {
    width: 464px;
  }
`
const $Available = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => props.theme.palette.greyV4};
`

const $PoolInformation = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  width: 60%;
  @media ${Devices.mobileL} {
    width: unset;
  }
`

const $ImageContainer = styled.div`
  position: relative;
  height: 32px;
  min-width: 32px;
`

const $TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const $InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`

const $CryptoInputContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

export const $BaseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 14px;
  height: 48px;
  min-width: 48%;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${(props) => props.theme.palette.pink};
  transition: all 0.3s;
  column-gap: 8px;
  @media ${Devices.laptop} {
    min-height: 60px;
    min-width: 200px;
    &:hover {
      background-color: ${(props) => props.theme.palette.hoverPink};
    }
    &:active {
      background-color: ${(props) => props.theme.palette.pressedPink};
    }
  }

  &:disabled,
  &[disabled] {
    color: ${(props) => props.theme.palette.greyV4}40;
    background-color: ${(props) => props.theme.palette.palidWhite};
  }
`
const $BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

interface $CryptoInputInterface {
  withdrawAmountPercentage?: number
}

const $CryptoInput = styled.input<$CryptoInputInterface>`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  display: inline-block;
  color: white;
  background-color: transparent;
  border: none;
  text-align: right;
  max-width: 7ch;
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  &.percentage::placeholder {
    color: ${(props) => props.theme.dark.text};
  }
  &.input {
    color: ${(props) =>
      props.withdrawAmountPercentage && props.withdrawAmountPercentage > 0
        ? props.theme.dark.text
        : props.theme.palette.red};
    caret-color: ${(props) =>
      props.withdrawAmountPercentage && props.withdrawAmountPercentage > 0
        ? props.theme.dark.text
        : props.theme.palette.red};
  }
  &.input::placeholder {
    color: ${(props) => props.theme.palette.red};
  }
`

export const WithdrawModal = ({ isOpen, onClose, investedPool }: WithdrawModalInterface): React.ReactElement => {
  const { fiatRates, networks } = useBalanceState()
  const { approvalTransactionState, slippageTolerance, allowInfinite } = useStakingState()
  const { prices } = useTokenState()
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const { walletAddress, currentNetworkName } = useAuthState()
  const stakingDispatch = useStakingDispatch()
  const [actualTokenNetwork, setActualTokenNetwork] = useState(investedPool.network)
  const [actualTokenSymbol, setActualTokenSymbol] = useState(TokensSymbol.ethereum)
  const [actualTokenLogo, setActualTokenLogo] = useState(TokensLogo.ETHEREUM)
  const [withdrawAmountPercentage, setWithdrawAmountPercentage] = useState<number>(0)
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [approveStatus, setApproveStatus] = useState(false)

  const inputChangeHandler = (e: React.BaseSyntheticEvent): void => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').trim()
    if (e.target.value > 0 && e.target.value <= 100) {
      setWithdrawAmountPercentage(+e.target.value)
    } else if (parseInt(e.target.value) > 100) {
      setWithdrawAmountPercentage(100)
      e.target.value = 100
    } else {
      setWithdrawAmountPercentage(+e.target.value)
    }
  }

  const convertToNativeToken = (): number => {
    if (fiatRates && withdrawAmountPercentage && withdrawAmountPercentage > 0) {
      setApproveStatus(true)
      const poolAmountToWithdraw = (withdrawAmountPercentage * investedPool.balance) / 100
      const nativeToken = prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
      const tokenAmount =
        (poolAmountToWithdraw * investedPool.price) / (nativeToken?.price || investedPool.tokens[0].price)
      return tokenAmount
    } else {
      setApproveStatus(false)
      return 0
    }
  }

  const cleanModalState = (): void => {
    setWithdrawAmountPercentage(0)
    setWithdrawAmount(0)
    setConvertedAmount(0)
    setApproveStatus(false)
    setShowLoader(false)
    stakingDispatch(setApprovalTransaction({} as ApprovalState))
    onClose()
  }

  const onApprove = (): void => {
    setShowLoader(true)
    stakingDispatch(
      sendApprovalTransactionToWithdraw(
        {
          type: investedPool.type as StakingTypes,
          appId: investedPool.appId,
          ownerAddress: walletAddress || '',
          amount: getStringFromExponentialNumber(withdrawAmount),
          network: currentNetworkName,
          sellTokenAddress: investedPool.address,
          allowInfinite: allowInfinite,
          gasPrice: ''
        },
        {
          onTxError: () => {
            showErrorToast('Transaction was rejected')
            setShowLoader(false)
          },
          onTxSuccess: (txHash: string) => {
            stakingDispatch(setTxHash(txHash))
            showSuccessToast(`Approving ${investedPool.label}.`)
            setShowLoader(false)
          },
          onTxLoading: (txHash: string) => {
            stakingDispatch(setTxHash(txHash))
            showLoadingToast(`Approving ${investedPool.label}.`, investedPool.appImageUrl)
          },
          onTxFinished: () => {
            setShowLoader(false)
          }
        }
      )
    )
  }

  const onConfirm = (): void => {
    setShowLoader(true)
    const nativeToken = prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
    stakingDispatch(
      getWithdrawTransaction(
        {
          type: investedPool.type as StakingTypes,
          appId: investedPool.appId,
          ownerAddress: walletAddress || '',
          sellAmount:
            currentNetworkName === Networks.ETHEREUM
              ? getStringFromExponentialNumber(withdrawAmount)
              : withdrawAmountPercentage === 100
              ? investedPool.balanceRaw
              : getStringFromExponentialNumber(withdrawAmount),
          network: currentNetworkName,
          poolAddress: investedPool.address,
          toTokenAddress: nativeToken?.address || '0x0000000000000000000000000000000000000000',
          slippagePercentage: slippageTolerance,
          gasPrice: '',
          inWei: currentNetworkName === Networks.ETHEREUM ? false : withdrawAmountPercentage === 100
        },
        {
          onTxError: () => {
            showErrorToast('Transaction was rejected')
            setShowLoader(false)
          },
          onTxSuccess: (txHash: string) => {
            stakingDispatch(setTxHash(txHash))
            showSuccessToast(`Removing liquidity from ${investedPool.label}.`)
            setShowLoader(false)
          },
          onTxLoading: (txHash: string) => {
            stakingDispatch(setTxHash(txHash))
            showLoadingToast(`Removing liquidity from ${investedPool.label}.`, investedPool.appImageUrl)
          },
          onTxFinished: () => {
            cleanModalState()
            if (walletAddress) {
              setTimeout(() => {
                stakingDispatch(getSupportedApps(currentNetworkName, walletAddress, networks))
              }, 8000)
            }
          }
        }
      )
    )
  }

  const tokenSwitcher = (tokenLogo: TokensLogo, tokenSymbol: TokensSymbol): void => {
    setActualTokenLogo(tokenLogo)
    setActualTokenSymbol(tokenSymbol)
  }
  useEffect(() => {
    stakingDispatch(
      checkApprovalStateToWithdraw({
        type: investedPool.type as StakingTypes,
        appId: investedPool.appId,
        ownerAddress: walletAddress || '',
        amount: getStringFromExponentialNumber(withdrawAmount),
        network: currentNetworkName,
        sellTokenAddress: investedPool.address
      })
    )
  }, [withdrawAmount])

  useEffect(() => {
    switch (actualTokenNetwork) {
      case 'ethereum':
        tokenSwitcher(TokensLogo.ETHEREUM, TokensSymbol.ethereum)
        break
      case 'polygon':
        tokenSwitcher(TokensLogo.POLYGON, TokensSymbol.polygon)
        break
      case 'binance-smart-chain':
        tokenSwitcher(TokensLogo['BINANCE-SMART-CHAIN'], TokensSymbol['binance-smart-chain'])
        break
    }
  }, [actualTokenNetwork])

  useEffect(() => {
    if (investedPool.network !== actualTokenNetwork) setActualTokenNetwork(investedPool.network)
    setConvertedAmount(convertToNativeToken())
    setWithdrawAmount((withdrawAmountPercentage * investedPool.balance) / 100)
  }, [withdrawAmountPercentage])

  if (!isOpen) {
    return <></>
  }
  return (
    <>
      <BaseModal isOpen={isOpen} onClose={cleanModalState}>
        <$WithdrawModal>
          <$H5>{'Withdraw'}</$H5>
          <$ColumItem>
            <$NormalTextRegularGrey>{'From'}</$NormalTextRegularGrey>
            <$Available>
              <$NormalTextBold>{'Available:'}</$NormalTextBold>
              <$NormalTextRegularGrey>{showExponentialNumber(investedPool.balance, 3)}</$NormalTextRegularGrey>
            </$Available>
            <$RowItem>
              <$PoolInformation>
                <$ImageContainer>
                  <Image src={investedPool.appImageUrl} layout="fill" />
                </$ImageContainer>
                <$TextContainer>
                  <$EllipsisText>{investedPool.symbol}</$EllipsisText>
                  <$NormalTextRegularGrey style={{ justifyContent: 'left' }}>
                    {investedPool.appName}
                  </$NormalTextRegularGrey>
                </$TextContainer>
              </$PoolInformation>
              <$CryptoInputContainer>
                <$CryptoInput
                  type="string"
                  placeholder="0"
                  min={0.001}
                  max={100}
                  onChange={inputChangeHandler}
                  className="input"
                  value={withdrawAmountPercentage}
                  withdrawAmountPercentage={withdrawAmountPercentage}
                />
                <$LargeTextBold>{'%'}</$LargeTextBold>
              </$CryptoInputContainer>
            </$RowItem>
          </$ColumItem>
          <$Divider />
          <$ColumItem>
            <$NormalTextRegularGrey>{'To'}</$NormalTextRegularGrey>
            <$RowItem>
              <$PoolInformation>
                <$ImageContainer>
                  <Image src={actualTokenLogo} layout="fill" />
                </$ImageContainer>
                <$TextContainer>
                  <$LargeTextBold>{actualTokenSymbol}</$LargeTextBold>
                </$TextContainer>
              </$PoolInformation>
              <$InputContainer style={{ justifyContent: 'center' }}>
                <$CryptoInputContainer>
                  <$CryptoInput placeholder={showExponentialNumber(convertedAmount, 4)} disabled />
                </$CryptoInputContainer>
              </$InputContainer>
            </$RowItem>
          </$ColumItem>
          <$Divider />
          <TransactionSettings convertedAmount={convertedAmount} />
          <$BtnContainer>
            <$BaseButton
              onClick={onApprove}
              disabled={
                approvalTransactionState.isApproved || !approveStatus || withdrawAmountPercentage === 0 || showLoader
              }
            >
              {showLoader ? <Loader size={0.2} /> : '1. '}
              Approve
            </$BaseButton>
            <$BaseButton
              onClick={onConfirm}
              disabled={
                !approvalTransactionState.isApproved || !approveStatus || withdrawAmountPercentage === 0 || showLoader
              }
            >
              {showLoader ? <Loader size={0.2} /> : '2. '}
              Confirm
            </$BaseButton>
          </$BtnContainer>
        </$WithdrawModal>
      </BaseModal>
      {isOpen && <TxNotificationToaster />}
    </>
  )
}
