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
  Toast
} from '../uiKit'
import { $MaxButton } from '../liquidity-pool/staking-modal-styles'
import { useEffect, useState } from 'react'
import ShyftService from '../../api-services/contracts/shyft.service'
import { weiToShft, shftToWei } from '../../api-services/web3.service'
import { useAuthState } from '../../context/auth'
import { useTokenState } from '../../context/token'
import { NativeTokens } from '../../types'
import { useFormatter } from '../../hooks/useFormatter'
import { setTxHash, useStakingDispatch } from '../../context/staking'
import { $ModalContainer, IModalProps, $Subtitle, $RowItem, $InputLabelContainer } from '.'
import { useBalanceState } from '../../context/balances'
import { BigNumber } from '@ethersproject/bignumber'

export const ShyftUnstakeModal = ({ isOpen, onClose, onSuccess }: IModalProps): React.ReactElement => {
  const { prices } = useTokenState()
  const { walletAddress, currentNetworkName } = useAuthState()
  const { formatTokenValue, formatFiatValue } = useFormatter()
  const stakingDispatch = useStakingDispatch()
  const { currentCurrency, fiatRates } = useBalanceState()
  const [unbondPercentageInput, setUnbondPercentageInput] = useState<number>()
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [totalStaked, setTotalStaked] = useState<BigNumber>(BigNumber.from(0))
  const [totalStakedInShft, setTotalStakedInShft] = useState<string>('0')
  const [totalStakedFiat, setTotalStakedFiat] = useState<string>('0')

  const getBalanceOf = async (address: string): Promise<void> => {
    const nativeToken = await prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
    const balance = await ShyftService.balanceOf(address)
    const valueInShft = Number(await weiToShft(balance.toString()))
    const balanceInSHFT = formatTokenValue(valueInShft, 2)
    setTotalStaked(balance)
    setTotalStakedInShft(balanceInSHFT.toString())
    if (nativeToken && fiatRates)
      setTotalStakedFiat(formatFiatValue(Number(valueInShft * nativeToken.price * fiatRates[currentCurrency])))
  }

  const onStakeAmountChange = (value: number): void => {
    if (value > 100) {
      value = 100
    }
    setUnbondPercentageInput(value ? Number.parseFloat(value.toFixed(5)) : undefined)
  }

  const handledConfirmClick = async (): Promise<void> => {
    setShowLoader(true)
    if (unbondPercentageInput) {
      const valueToUnbond = BigNumber.from(shftToWei(unbondPercentageInput.toString()))
        .mul(totalStaked)
        .div(BigNumber.from(shftToWei('100')))
      showLoadingToast(
        `Unbonding ${Number(weiToShft(valueToUnbond.toString())).toFixed(2)} SHFT from Shyft Pool.`,
        '/images/icons/shyft.svg'
      )
      await ShyftService.unbond({
        amount: valueToUnbond,
        onError: () => {
          setShowLoader(false)
          Toast.dismiss()
          showErrorToast('Transaction was rejected')
        },
        onSuccess: (txHash: string) => {
          stakingDispatch(setTxHash(txHash))
          Toast.dismiss()
          showSuccessToast(`Unbonding ${Number(weiToShft(valueToUnbond.toString())).toFixed(2)} SHFT from Shyft Pool.`)
          setShowLoader(false)
          setTimeout(() => {
            Toast.dismiss()
            stakingDispatch(setTxHash(''))
            onSuccess()
            onClose()
          }, 4500)
        }
      })
    }
  }

  useEffect(() => {
    if (walletAddress) {
      getBalanceOf(walletAddress)
    }
  }, [currentCurrency])

  const handleMaxButtonClick = (): void => {
    setUnbondPercentageInput(100)
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} noCloseButton>
      <$ModalContainer>
        <$RowItem>
          <$H6>{'Unbond'}</$H6>
          <Image src={shyftIcon} layout="fixed" height="32px" width="32px" />
        </$RowItem>
        <$Subtitle>{'Available Balance'}</$Subtitle>
        <$RowItem>
          <$LargeTextBold>{totalStakedInShft + ' SHFT'}</$LargeTextBold>
          <$MediumTextRegular>{totalStakedFiat}</$MediumTextRegular>
        </$RowItem>
        <$Divider />
        <$Subtitle>{'Total Unbond'}</$Subtitle>
        <$RowItem>
          <$InputLabelContainer>
            <$LargeTextBold>{'%'}</$LargeTextBold>
            <$InputNumber
              type="number"
              placeholder="0"
              value={unbondPercentageInput}
              onChange={({ target: { value } }) => onStakeAmountChange(+value)}
            />
          </$InputLabelContainer>
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
            handledConfirmClick()
          }}
          disabled={unbondPercentageInput === undefined || unbondPercentageInput <= 0 || showLoader}
        >
          {showLoader && <Loader color={showLoader ? '#994D7E' : '#FAFAFA'} size={0.3} />}
          {'Confirm'}
        </$Button>
      </$ModalContainer>
    </BaseModal>
  )
}
