import Image from 'next/image'
import shyftIcon from '../../public/images/icons/shyft.svg'
import { BaseModal } from '../modal/base-modal'
import {
  $Button,
  $Divider,
  $H6,
  $InputNumber,
  $LargeTextBold,
  $MediumTextRegular,
  Loader,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
  Toast,
  TxNotificationToaster
} from '../uiKit'
import { $MaxButton } from '../liquidity-pool/staking-modal-styles'
import { useEffect, useState } from 'react'
import { weiToShft, shftToWei } from '../../api-services/web3.service'
import ShyftService from '../../api-services/contracts/shyft.service'
import { NativeTokens } from '../../types'
import { useTokenState } from '../../context/token'
import { setTxHash, useStakingDispatch } from '../../context/staking'
import { $ModalContainer, IModalProps, $Subtitle, $RowItem, $ErrorText, $ColumnItem } from '.'
import { useBalanceState } from '../../context/balances'
import { useFormatter } from '../../hooks/useFormatter'
import { useAuthDispatch, useAuthState, getCurrentBalance } from '../../context/auth'
import { BigNumber } from '@ethersproject/bignumber'

export const ShyftStakeModal = ({ isOpen, onClose, onSuccess }: IModalProps): React.ReactElement => {
  const stakingDispatch = useStakingDispatch()
  const { walletState, currentNetworkName, walletStateBalance } = useAuthState()
  const { prices } = useTokenState()
  const { currentCurrency, fiatRates } = useBalanceState()
  const { formatFiatValue } = useFormatter()
  const [stakeAmountInput, setStakeAmountInput] = useState<string>()
  const [insufficientBalance, setInsufficientBalance] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [currentBalance, setCurrentBalance] = useState<number>(0)
  const [currentBalanceUSD, setCurrentBalanceUSD] = useState<string>('0')
  const authDispatch = useAuthDispatch()

  useEffect(() => {
    const nativeToken = prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
    if (walletState && walletStateBalance) {
      const valueParsed = Number(Number(weiToShft(walletStateBalance)).toFixed(5))
      setCurrentBalance(valueParsed)
      if (nativeToken && fiatRates)
        setCurrentBalanceUSD(formatFiatValue(Number(valueParsed * nativeToken.price * fiatRates[currentCurrency])))
    }
  }, [currentCurrency, walletStateBalance])

  useEffect(() => {
    if (stakeAmountInput)
      setInsufficientBalance(BigNumber.from(shftToWei(stakeAmountInput)).gt(BigNumber.from(walletStateBalance)))
  }, [stakeAmountInput])

  const onStakeAmountChange = (value: string): void => {
    setStakeAmountInput(value)
  }

  const handledDepositClick = async (): Promise<void> => {
    setShowLoader(true)
    if (stakeAmountInput) {
      showLoadingToast(`Adding ${stakeAmountInput} SHFT to Shyft Pool.`, '/images/icons/shyft.svg')
      const stakeAmountInputInWei = shftToWei(stakeAmountInput)
      await ShyftService.stake({
        amount: stakeAmountInputInWei,
        onError: () => {
          setShowLoader(false)
          Toast.dismiss()
          showErrorToast('Transaction was rejected')
        },
        onSuccess: (txHash: string) => {
          stakingDispatch(setTxHash(txHash))
          Toast.dismiss()
          showSuccessToast(`Adding ${stakeAmountInput} SHFT to Shyft Pool.`)
          setShowLoader(false)
          setTimeout(() => {
            Toast.dismiss()
            stakingDispatch(setTxHash(''))
            onSuccess()
            onClose()
          }, 4500)
          authDispatch(getCurrentBalance())
        }
      })
    }
  }

  const handleMaxButtonClick = async (): Promise<void> => {
    if (walletStateBalance) {
      setShowLoader(true)
      const gas = await ShyftService.stakeEstimateGas(walletStateBalance)
      const availableAmount = BigNumber.from(walletStateBalance).sub(gas)
      setStakeAmountInput(weiToShft(availableAmount.toString()))
      setShowLoader(false)
    }
  }

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} noCloseButton>
        <$ModalContainer>
          <$RowItem>
            <$H6>{'Stake'}</$H6>
            <Image src={shyftIcon} layout="fixed" height="32px" width="32px" />
          </$RowItem>
          <$Subtitle>{'Available Balance'}</$Subtitle>
          <$RowItem>
            <$LargeTextBold>{currentBalance + ' SHFT'}</$LargeTextBold>
            <$MediumTextRegular>{currentBalanceUSD}</$MediumTextRegular>
          </$RowItem>
          <$Divider />
          <$Subtitle>{'Total Investment'}</$Subtitle>
          <$RowItem>
            <$ColumnItem>
              <$InputNumber
                type="number"
                placeholder="0.00"
                value={stakeAmountInput}
                onChange={({ target: { value } }) => onStakeAmountChange(value)}
                wrongValue={insufficientBalance}
              />
              {insufficientBalance && <$ErrorText>{'Insufficient balance'}</$ErrorText>}
            </$ColumnItem>
            <$MaxButton type="button" value="Max" onClick={handleMaxButtonClick} />
          </$RowItem>
          <$Divider />
          <$Subtitle>
            {
              'You can claim 100% of your SHFT token rewards after the farming program ends. You have the option to re-stake.'
            }
          </$Subtitle>
          <$Button
            onClick={() => {
              handledDepositClick()
            }}
            disabled={insufficientBalance || !stakeAmountInput || showLoader}
          >
            {showLoader && <Loader color={showLoader ? '#994D7E' : '#FAFAFA'} size={0.3} />}
            {'Deposit'}
          </$Button>
        </$ModalContainer>
      </BaseModal>
      {isOpen && <TxNotificationToaster />}
    </>
  )
}
