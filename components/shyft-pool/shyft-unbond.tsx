import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { $Button, $H4, $LargeTextRegular, $MediumTextRegular } from '../uiKit'
import { ShyftUnstakeModal } from '.'
import { $Card } from './shyft-card'
import ShyftService from '../../api-services/contracts/shyft.service'
import { UnBondingDetail } from '../../types/un-bonding'
import { useTokenState } from '../../context/token'
import { useFormatter } from '../../hooks/useFormatter'
import { weiToShft } from '../../api-services/web3.service'
import { NativeTokens } from '../../types'
import { useAuthState } from '../../context/auth'
import { ShyftUnbondingItem } from './shyft-unbonding-item'
import { dispatchRefreshContractValues, useShyftStakeDispatch, useShyftStakeState } from '../../context/shyft-stake'
import { formatDate } from '../../utils/dateTime-utils'
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

export const ShyftUnbond = (): React.ReactElement => {
  const stakeDispatch = useShyftStakeDispatch()
  const { refreshContractValues } = useShyftStakeState()
  const { walletAddress, currentNetworkName } = useAuthState()
  const { prices } = useTokenState()
  const { formatTokenValue, formatFiatValue } = useFormatter()
  const { currentCurrency, fiatRates } = useBalanceState()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [disabledUnbond, setDisabledUnbond] = useState<boolean>(false)
  const [unbondTimestamp, setUnbondTimestamp] = useState<number>(0)
  const [thereIsUnbondings, setThereIsUnbondings] = useState<boolean>(true)
  const [totalStaked, setTotalStaked] = useState<string>('0')
  const [totalStakedFiat, setTotalStakedFiat] = useState<string>('0')
  const [unBondsDetail, setUnBondsDetail] = useState<Array<UnBondingDetail>>()

  const toggleModal = (): void => {
    setShowModal(!showModal)
    setThereIsUnbondings(!thereIsUnbondings)
  }

  const getBalanceOf = async (address: string): Promise<void> => {
    const nativeToken = await prices.find((token) => token.symbol === NativeTokens[currentNetworkName])
    const balance = await ShyftService.balanceOf(address)
    const valueInShyft = Number(await weiToShft(balance.toString()))
    const balanceInSHFT = formatTokenValue(valueInShyft, 2)
    setTotalStaked(balanceInSHFT.toString())
    if (nativeToken && fiatRates) {
      setTotalStakedFiat(formatFiatValue(valueInShyft * nativeToken.price * fiatRates[currentCurrency]))
    }
  }

  const getUnBondingsDetailList = async (address: string): Promise<void> => {
    const unbondingList = await ShyftService.getUnbondingsDetailForAddress(address)
    if (unbondingList) {
      setUnBondsDetail(
        unbondingList.sort((a: UnBondingDetail, b: UnBondingDetail) =>
          a.unstakeEnabledTimestamp > b.unstakeEnabledTimestamp ? 1 : -1
        )
      )
    }
  }

  const getContractValuesIfThereIsWallet = (): void => {
    if (walletAddress && prices) {
      getBalanceOf(walletAddress)
      getUnBondingsDetailList(walletAddress)
    }
  }

  const getReleaseDate = async (): Promise<void> => {
    const unbondDate = await ShyftService.getPrePurchasersRelease()
    if (unbondDate) {
      setUnbondTimestamp(unbondDate)
      setDisabledUnbond(new Date(unbondDate * 1000) > new Date())
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

  useEffect(() => {
    getReleaseDate()
  }, [])

  return (
    <>
      <$Card>
        <$ItemContainer align="flex-start">
          <$Subtitle>{'Your liquidity deposits'}</$Subtitle>
          <$Row>
            <$H4>{totalStakedFiat}</$H4>
            <$LargeTextRegular>{totalStaked + ' SHFT'}</$LargeTextRegular>
          </$Row>
        </$ItemContainer>
        <$ItemContainer align="center">
          <$Subtitle> {disabledUnbond ? 'Unbond Date: ' + formatDate(unbondTimestamp) : 'Unbond available'}</$Subtitle>
          <$CustomButton onClick={toggleModal} disabled={totalStaked === undefined || Number(totalStaked) <= 0}>
            {'Unbond'}
          </$CustomButton>
        </$ItemContainer>
      </$Card>
      {unBondsDetail &&
        unBondsDetail.map((unBondDetail) => {
          return (
            <ShyftUnbondingItem
              key={unBondDetail.unbondingId}
              unBondDetail={unBondDetail}
              onSuccess={() => getUnBondingsDetailList(unBondDetail.address)}
            />
          )
        })}
      <$Description>
        {
          'You can claim 100% of your SHFT token rewards after the farming program ends. You have the option to re-stake your rewards or withdraw completely. Those that stake for a longer period of time earn a higher percentage of token payout. To view more details, view the documentation.'
        }
      </$Description>
      {showModal && <ShyftUnstakeModal isOpen={showModal} onClose={toggleModal} onSuccess={onStakeSuccess} />}
    </>
  )
}
