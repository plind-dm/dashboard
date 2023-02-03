import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { ShyftPoolOverviewItem } from './shyft-pool-overview-item'
import ShyftService from '../../api-services/contracts/shyft.service'
import { useEffect, useState } from 'react'
import { weiToShft } from '../../api-services/web3.service'
import { useFormatter } from '../../hooks/useFormatter'
import { resetContractValues, useShyftStakeDispatch, useShyftStakeState } from '../../context/shyft-stake'
import { BigNumber } from '@ethersproject/bignumber'

const $MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  box-sizing: border-box;
  border-radius: 8px;
  gap: 8px;
  padding: 16px;
  @media ${Devices.laptop} {
    flex-direction: row;
    margin: 32px 16px;
    padding: 16px 32px;
    gap: 64px;
  }
`

export const ShyftPoolOverview = (): React.ReactElement => {
  const [totalSupply, setTotalSupply] = useState<string>('0')
  const [rewardRate, setRewardRate] = useState<string>('0')
  const { formatTokenValue } = useFormatter()
  const { refreshContractValues } = useShyftStakeState()
  const stakeDispatch = useShyftStakeDispatch()

  const getTotalSupply = async (): Promise<void> => {
    const total: BigNumber = await ShyftService.getTotalSupply()
    const totalInShft = weiToShft(total.toString())
    setTotalSupply(totalInShft)
  }

  const getRewardRate = async (): Promise<void> => {
    const rate: BigNumber = await ShyftService.rewardRate()
    setRewardRate(Number(weiToShft(rate.toString())).toFixed(7))
  }

  useEffect(() => {
    if (refreshContractValues) {
      getTotalSupply()
      stakeDispatch(resetContractValues())
    }
  }, [refreshContractValues])

  useEffect(() => {
    getTotalSupply()
    getRewardRate()
  }, [])

  return (
    <$MainContainer>
      <ShyftPoolOverviewItem title="Total Pool Volume" value={formatTokenValue(+totalSupply, 2) + ' SHFT'} />
      <ShyftPoolOverviewItem title="Pool Rate" value={rewardRate + ' SHFT/day'} />
    </$MainContainer>
  )
}
