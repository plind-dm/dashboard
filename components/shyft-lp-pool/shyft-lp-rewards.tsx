import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import {
  $Button,
  $H4,
  $LargeTextRegular,
  $MediumTextRegular,
  TxNotificationToaster,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
  Toast,
  Loader
} from '../uiKit'
import { $Card } from './shyft-lp-card'
import { weiToShft } from '../../api-services/web3.service'
import { useTokenState } from '../../context/token'
import { useAuthState } from '../../context/auth'
import { NativeTokens } from '../../types'
import ShyftLPService from '../../api-services/contracts/shyft-lp.service'
import { setTxHash, useStakingDispatch } from '../../context/staking'
import { useBalanceState } from '../../context/balances'
import { useFormatter } from '../../hooks/useFormatter'
import { useAuthDispatch, getCurrentBalance } from '../../context/auth'
import { BigNumber } from '@ethersproject/bignumber'

interface IItemContainer {
  align: string
}

const $Subtitle = styled($MediumTextRegular)`
  color: ${(props) => props.theme.palette.greyV4};
`

const $Description = styled($MediumTextRegular)`
  display: none;
  color: ${(props) => props.theme.palette.greyV4};
  @media ${Devices.laptop} {
    display: block;
    margin: 0px 16px;
    margin-top: 8px;
  }
`
const $Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${Devices.laptop} {
    gap: 24px;
    justify-content: flex-start;
    height: 55px;
  }
`

const $CustomButton = styled($Button)`
  @media ${Devices.laptop} {
    max-width: 255px;
  }
`

const $ItemContainer = styled.div<IItemContainer>`
  display: flex;
  gap: 16px;
  flex-direction: column;
  min-width: 255px;
  @media ${Devices.laptop} {
    align-items: ${(props) => (props.align ? props.align : 'unset')};
  }
`

export const ShyftLPRewards = (): React.ReactElement => {
  const { prices } = useTokenState()
  const { walletAddress, currentNetworkName } = useAuthState()
  const [rewardsAmount, setRewardsAmount] = useState<BigNumber>(BigNumber.from(0))
  const { formatFiatValue } = useFormatter()
  const [rewardsAmountInShft, setRewardsAmountInShft] = useState<string>('0')
  const [rewardsAmountFiat, setRewardsAmountFiat] = useState<string>('0')
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const { currentCurrency, fiatRates } = useBalanceState()
  const stakingDispatch = useStakingDispatch()
  const authDispatch = useAuthDispatch()

  const getRewardsAmount = async (address: string): Promise<void> => {
    const nativeToken = await prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
    const amount = await ShyftLPService.rewardsForAddress(address)
    const valueInShft = Number(await weiToShft(amount.toString()))
    const amountInSHFT = valueInShft.toPrecision(2)
    setRewardsAmount(amount)
    setRewardsAmountInShft(amountInSHFT)
    if (nativeToken && fiatRates) {
      setRewardsAmountFiat(formatFiatValue(valueInShft * nativeToken.price * fiatRates[currentCurrency]))
    }
  }

  const getRewardsAmountIfThereIsWallet = (): void => {
    if (walletAddress && prices) {
      getRewardsAmount(walletAddress)
    }
  }

  const handledClaimClick = async (): Promise<void> => {
    setShowLoader(true)
    if (rewardsAmount.gt(BigNumber.from(0))) {
      showLoadingToast(
        `Claiming ${Number(weiToShft(rewardsAmount.toString())).toPrecision(5)} SHFT from Shyft LP Pool.`,
        '/images/icons/shyft.svg'
      )
      await ShyftLPService.claimRewards({
        onError: () => {
          setShowLoader(false)
          Toast.dismiss()
          showErrorToast('Transaction was rejected')
        },
        onSuccess: (txHash: string) => {
          stakingDispatch(setTxHash(txHash))
          Toast.dismiss()
          showSuccessToast(
            `Claimed ${Number(weiToShft(rewardsAmount.toString())).toPrecision(5)} SHFT from Shyft LP Pool.`
          )
          setShowLoader(false)
          setTimeout(() => {
            Toast.dismiss()
            stakingDispatch(setTxHash(''))
            getRewardsAmountIfThereIsWallet()
          }, 3000)
          authDispatch(getCurrentBalance())
        }
      })
    }
  }

  useEffect(() => {
    getRewardsAmountIfThereIsWallet()
  }, [prices, currentCurrency])

  return (
    <>
      <$Card>
        <$ItemContainer align="flex-start">
          <$Subtitle>{'Your unclaimed SHFT'}</$Subtitle>
          <$Row>
            <$H4>{rewardsAmountFiat}</$H4>
            <$LargeTextRegular>{rewardsAmountInShft + ' SHFT'}</$LargeTextRegular>
          </$Row>
        </$ItemContainer>
        <$CustomButton
          disabled={rewardsAmount === undefined || rewardsAmount.lte(BigNumber.from(0)) || showLoader}
          onClick={handledClaimClick}
        >
          {showLoader && <Loader color={showLoader ? '#994D7E' : '#FAFAFA'} size={0.3} />}
          {'Claim all'}
        </$CustomButton>
      </$Card>
      <$Description>
        {
          'You can claim 100% of your SHFT token rewards after the farming program ends. You have the option to re-stake your rewards or withdraw completely. Those that stake for a longer period of time earn a higher percentage of token payout. To view more details, view the documentation.'
        }
      </$Description>
      <TxNotificationToaster />
    </>
  )
}
