import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import {
  $Button,
  $LargeTextRegular,
  $MediumTextRegular,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
  Toast,
  TxNotificationToaster,
  Loader
} from '../uiKit'
import { $Card } from './shyft-card'
import ShyftService from '../../api-services/contracts/shyft.service'
import { UnBondingDetail } from '../../types/un-bonding'
import { weiToShft } from '../../api-services/web3.service'
import { useEffect, useState } from 'react'
import { useFormatter } from '../../hooks/useFormatter'
import { formatDate } from '../../utils/dateTime-utils'
import { useDevices } from '../../hooks/useDevices'
import { setTxHash, useStakingDispatch } from '../../context/staking'
import { useAuthDispatch, getCurrentBalance } from '../../context/auth'
import { BigNumber } from '@ethersproject/bignumber'

interface IItemContainer {
  align: string
}

const $Subtitle = styled($MediumTextRegular)`
  color: ${(props) => props.theme.palette.greyV4};
`

const $Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  @media ${Devices.laptop} {
    gap: 24px;
    justify-content: flex-start;
  }
`

const $UnbondingCard = styled($Card)`
  margin: 8px 0px;
  flex-direction: row;
  justify-content: space-between;
  @media ${Devices.laptop} {
    margin: 8px 16px;
  }
`

const $UnbondingTime = styled($Subtitle)`
  text-align: end;
`

const $ItemContainer = styled.div<IItemContainer>`
  display: flex;
  gap: 16px;
  flex-direction: column;
  min-width: unset;
  align-items: ${(props) => (props.align ? props.align : 'unset')};
  @media ${Devices.laptop} {
    min-width: 255px;
  }
`

export type Props = {
  unBondDetail: UnBondingDetail
  onSuccess: () => void
}

export const ShyftUnbondingItem = ({ unBondDetail, onSuccess }: Props): React.ReactElement => {
  const [disabledButtonUnstake, setDisabledButtonUnstake] = useState<boolean>(false)
  const stakingDispatch = useStakingDispatch()
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const { formatTokenValue } = useFormatter()
  const { isMobile } = useDevices()
  const authDispatch = useAuthDispatch()

  const handledUnstakeClick = async (unbondingId: number, remainingAmount: BigNumber): Promise<void> => {
    if (unbondingId && remainingAmount.gt(BigNumber.from(0))) {
      setShowLoader(true)
      showLoadingToast(
        `Unstaking ${formatTokenValue(
          Number(weiToShft(unBondDetail.remainingAmount.toString())),
          2
        )} SHFT from Shyft Pool.`,
        '/images/icons/shyft.svg'
      )
      setDisabledButtonUnstake(true)
      await ShyftService.unstake({
        idUnbonding: unbondingId,
        amount: remainingAmount,
        onError: () => {
          setDisabledButtonUnstake(false)
          setShowLoader(false)
          Toast.dismiss()
          showErrorToast('Transaction was rejected')
        },
        onSuccess: (txHash: string) => {
          stakingDispatch(setTxHash(txHash))
          Toast.dismiss()
          showSuccessToast(
            `Removing ${formatTokenValue(
              Number(weiToShft(unBondDetail.remainingAmount.toString())),
              2
            )} SHFT from Shyft Pool.`
          )
          setShowLoader(false)
          setDisabledButtonUnstake(false)
          setTimeout(() => {
            Toast.dismiss()
            stakingDispatch(setTxHash(''))
            onSuccess()
          }, 4500)
          authDispatch(getCurrentBalance())
        }
      })
    }
  }

  useEffect(() => {
    if (
      unBondDetail.remainingAmount.lt(BigNumber.from(0)) ||
      new Date(unBondDetail.unstakeEnabledTimestamp * 1000) > new Date()
    ) {
      setDisabledButtonUnstake(true)
    }
  }, [])

  return (
    <>
      {unBondDetail && (
        <>
          <$UnbondingCard key={unBondDetail.arrayPosition}>
            <$ItemContainer align={'flex-start'}>
              <$Subtitle>{'Unbond Request'}</$Subtitle>
              <$Row>
                <$LargeTextRegular>
                  {formatTokenValue(Number(weiToShft(unBondDetail.remainingAmount.toString())), 2) + ' SHFT'}
                </$LargeTextRegular>
              </$Row>
            </$ItemContainer>
            <$ItemContainer align={isMobile ? 'flex-end' : 'center'}>
              <$UnbondingTime>
                {disabledButtonUnstake && !showLoader
                  ? 'Unstake Date: ' + formatDate(unBondDetail.unstakeEnabledTimestamp)
                  : 'Unstake available'}
              </$UnbondingTime>
              <$Button
                widthMobile="95px"
                widthDesktop="162px"
                onClick={() => handledUnstakeClick(unBondDetail.unbondingId, unBondDetail.remainingAmount)}
                disabled={disabledButtonUnstake}
              >
                {showLoader && <Loader color="#994d7e" size={0.3} />}
                {isMobile ? !showLoader && 'Unstake' : 'Unstake'}
              </$Button>
            </$ItemContainer>
          </$UnbondingCard>
          <TxNotificationToaster />
        </>
      )}
    </>
  )
}
