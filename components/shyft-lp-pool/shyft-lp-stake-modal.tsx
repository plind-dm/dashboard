import Image from 'next/image'
import { BigNumber } from '@ethersproject/bignumber'
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
import { config } from '../../config/env.config'
import { $MaxButton } from '../liquidity-pool/staking-modal-styles'
import { useEffect, useState } from 'react'
import { weiToShft, shftToWei } from '../../api-services/web3.service'
import ShyftLPService from '../../api-services/contracts/shyft-lp.service'
import LPService from '../../api-services/contracts/lp.service'
import { NativeTokens } from '../../types'
import { useTokenState } from '../../context/token'
import { setTxHash, useStakingDispatch } from '../../context/staking'
import { $ModalContainer, IModalProps, $Subtitle, $RowItem, $ErrorText, $ColumnItem } from '.'
import { useBalanceState } from '../../context/balances'
import { useFormatter } from '../../hooks/useFormatter'
import { useShyftLPStakeState } from '../../context/shyft-lp-stake'
import { useAuthDispatch, useAuthState, getCurrentBalance } from '../../context/auth'

export const ShyftLPStakeModal = ({ isOpen, onClose, onSuccess }: IModalProps): React.ReactElement => {
  const stakingDispatch = useStakingDispatch()
  const { walletAddress, currentNetworkName } = useAuthState()
  const { prices } = useTokenState()
  const { refreshContractValues } = useShyftLPStakeState()
  const { currentCurrency, fiatRates } = useBalanceState()
  const { formatFiatValue } = useFormatter()
  const [stakeAmountInput, setStakeAmountInput] = useState<string>()
  const [insufficientBalance, setInsufficientBalance] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [currentAllowance, setCurrentAllowance] = useState<BigNumber>(BigNumber.from(0))
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const [currentBalance, setCurrentBalance] = useState<number>(0)
  const [currentBalanceUSD, setCurrentBalanceUSD] = useState<string>('0')
  const authDispatch = useAuthDispatch()

  const getBalanceOf = async (address: string): Promise<void> => {
    const nativeToken = await prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
    const balance: BigNumber = await LPService.balanceOf(address)
    setBalance(balance)
    const valueInShyft = Number(await weiToShft(balance.toString()))
    setCurrentBalance(valueInShyft)
    if (nativeToken && fiatRates) {
      setCurrentBalanceUSD(formatFiatValue(valueInShyft * nativeToken.price * fiatRates[currentCurrency]))
    }
  }

  const getBalanceIfThereIsWallet = (): void => {
    if (walletAddress && prices) {
      getBalanceOf(walletAddress)
    }
  }

  const getAllowanceOf = async (address: string): Promise<void> => {
    const allowance: BigNumber = await LPService.allowance(address, config.shyftLPContract.shyftLPContractAddress)
    setCurrentAllowance(allowance)
  }

  const getAllowanceIfThereIsWallet = (): void => {
    if (walletAddress && prices) {
      getAllowanceOf(walletAddress)
    }
  }

  useEffect(() => {
    if (stakeAmountInput) setInsufficientBalance(BigNumber.from(shftToWei(stakeAmountInput)).gt(balance))
  }, [stakeAmountInput])

  useEffect(() => {
    refreshContractValues && getBalanceIfThereIsWallet()
  }, [refreshContractValues])

  useEffect(() => {
    getBalanceIfThereIsWallet()
  }, [prices, currentCurrency])

  useEffect(() => {
    getAllowanceIfThereIsWallet()
  }, [])

  const onStakeAmountChange = (value: string): void => {
    setStakeAmountInput(value)
  }

  const handledDepositClick = async (): Promise<void> => {
    setShowLoader(true)
    if (stakeAmountInput) {
      showLoadingToast(`Adding ${stakeAmountInput} LP to Shyft LP Pool.`, '/images/icons/shyft.svg')
      const stakeAmountInputInWei = shftToWei(stakeAmountInput)
      await ShyftLPService.stake({
        amount: stakeAmountInputInWei,
        onError: () => {
          setShowLoader(false)
          Toast.dismiss()
          showErrorToast('Transaction was rejected')
        },
        onSuccess: (txHash: string) => {
          stakingDispatch(setTxHash(txHash))
          Toast.dismiss()
          showSuccessToast(`Adding ${stakeAmountInput} LP to Shyft LP Pool.`)
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

  const handleApproveClick = async (): Promise<void> => {
    setShowLoader(true)
    if (stakeAmountInput) {
      showLoadingToast(`Approving ${stakeAmountInput} LP to Shyft LP Pool.`, '/images/icons/shyft.svg')
      const stakeAmountInputInWei = shftToWei(stakeAmountInput)
      await LPService.approve({
        spender: config.shyftLPContract.shyftLPContractAddress,
        amount: stakeAmountInputInWei,
        onError: () => {
          setShowLoader(false)
          Toast.dismiss()
          showErrorToast('Transaction was rejected')
        },
        onSuccess: (txHash: string) => {
          stakingDispatch(setTxHash(txHash))
          Toast.dismiss()
          showSuccessToast(`Approving ${stakeAmountInput} LP to Shyft LP Pool.`)
          setShowLoader(false)
          setTimeout(() => {
            Toast.dismiss()
            stakingDispatch(setTxHash(''))
            onSuccess()
          }, 4500)
          authDispatch(getCurrentBalance())
          getAllowanceIfThereIsWallet()
        }
      })
    }
  }

  const handleMaxButtonClick = (): void => {
    setStakeAmountInput(weiToShft(balance.toString()))
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
            <$LargeTextBold>{currentBalance + ' LP'}</$LargeTextBold>
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
              'You can claim 100% of your LP token rewards after the farming program ends. You have the option to re-stake.'
            }
          </$Subtitle>
          {stakeAmountInput &&
          BigNumber.from(currentAllowance).gte(BigNumber.from(shftToWei(stakeAmountInput.toString()))) ? (
            <$Button
              onClick={() => {
                handledDepositClick()
              }}
              disabled={insufficientBalance || !stakeAmountInput || showLoader}
            >
              {showLoader && <Loader color={showLoader ? '#994D7E' : '#FAFAFA'} size={0.3} />}
              {'Deposit'}
            </$Button>
          ) : (
            <$Button
              onClick={() => {
                handleApproveClick()
              }}
              disabled={insufficientBalance || !stakeAmountInput || showLoader}
            >
              {showLoader && <Loader color={showLoader ? '#994D7E' : '#FAFAFA'} size={0.3} />}
              {'Approve'}
            </$Button>
          )}
        </$ModalContainer>
      </BaseModal>
      {isOpen && <TxNotificationToaster />}
    </>
  )
}
