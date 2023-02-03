import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { $Button, $H4, $LargeTextRegular, $MediumTextRegular } from '../uiKit'
import { ShyftLPUnstakeModal } from '.'
import { $Card } from './shyft-lp-card'
import ShyftLPService from '../../api-services/contracts/shyft-lp.service'
import { useTokenState } from '../../context/token'
import { useFormatter } from '../../hooks/useFormatter'
import { weiToShft } from '../../api-services/web3.service'
import { NativeTokens } from '../../types'
import { useAuthState } from '../../context/auth'
import {
  dispatchRefreshContractValues,
  useShyftLPStakeDispatch,
  useShyftLPStakeState
} from '../../context/shyft-lp-stake'
import { useBalanceState } from '../../context/balances'

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

export const ShyftLPUnstake = (): React.ReactElement => {
  const stakeDispatch = useShyftLPStakeDispatch()
  const { refreshContractValues } = useShyftLPStakeState()
  const { walletAddress, currentNetworkName } = useAuthState()
  const { prices } = useTokenState()
  const { formatTokenValue, formatFiatValue } = useFormatter()
  const { currentCurrency, fiatRates } = useBalanceState()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [totalStaked, setTotalStaked] = useState<string>('0')
  const [totalStakedFiat, setTotalStakedFiat] = useState<string>('0')

  const toggleModal = (): void => {
    setShowModal(!showModal)
  }

  const getBalanceOf = async (address: string): Promise<void> => {
    const nativeToken = await prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
    const balance = await ShyftLPService.balanceOf(address)
    const valueInShyft = Number(await weiToShft(balance.toString()))
    const balanceInSHFT = formatTokenValue(valueInShyft, 2)
    setTotalStaked(balanceInSHFT.toString())
    if (nativeToken && fiatRates) {
      setTotalStakedFiat(formatFiatValue(valueInShyft * nativeToken.price * fiatRates[currentCurrency]))
    }
  }

  const getContractValuesIfThereIsWallet = (): void => {
    if (walletAddress && prices) {
      getBalanceOf(walletAddress)
    }
  }

  const onStakeSuccess = (): void => {
    stakeDispatch(dispatchRefreshContractValues())
  }

  useEffect(() => {
    refreshContractValues && getContractValuesIfThereIsWallet()
  }, [refreshContractValues])

  useEffect(() => {
    getContractValuesIfThereIsWallet()
  }, [prices, currentCurrency])

  return (
    <>
      <$Card>
        <$ItemContainer align="flex-start">
          <$Subtitle>{'Your liquidity deposits'}</$Subtitle>
          <$Row>
            <$H4>{totalStakedFiat}</$H4>
            <$LargeTextRegular>{totalStaked + ' LP'}</$LargeTextRegular>
          </$Row>
        </$ItemContainer>
        <$ItemContainer align="center">
          <$CustomButton onClick={toggleModal} disabled={totalStaked === undefined || Number(totalStaked) <= 0}>
            {'Unstake'}
          </$CustomButton>
        </$ItemContainer>
      </$Card>
      <$Description>
        {
          'You can claim 100% of your LP token rewards after the farming program ends. You have the option to re-stake your rewards or withdraw completely. Those that stake for a longer period of time earn a higher percentage of token payout. To view more details, view the documentation.'
        }
      </$Description>
      {showModal && <ShyftLPUnstakeModal isOpen={showModal} onClose={toggleModal} onSuccess={onStakeSuccess} />}
    </>
  )
}
