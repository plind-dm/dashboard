import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { ShyftLPPoolOverviewItem } from './shyft-lp-pool-overview-item'
import ShyftLPService from '../../api-services/contracts/shyft-lp.service'
import { useEffect, useState } from 'react'
import { weiToShft } from '../../api-services/web3.service'
import { useFormatter } from '../../hooks/useFormatter'
import { resetContractValues, useShyftLPStakeDispatch, useShyftLPStakeState } from '../../context/shyft-lp-stake'
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

export const ShyftLPPoolOverview = (): React.ReactElement => {
  const [totalSupply, setTotalSupply] = useState<string>('0')
  const [rewardRate, setRewardRate] = useState<string>('0')
  const { formatTokenValue } = useFormatter()
  const { refreshContractValues } = useShyftLPStakeState()
  const stakeDispatch = useShyftLPStakeDispatch()

  const getTotalSupply = async (): Promise<void> => {
    const total: BigNumber = await ShyftLPService.getTotalSupply()
    const totalInShft = await weiToShft(total.toString())
    setTotalSupply(totalInShft)
  }

  const getRewardRate = async (): Promise<void> => {
    const rate: BigNumber = await ShyftLPService.rewardRate()
    setRewardRate(rate.toString())
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
      <ShyftLPPoolOverviewItem title="Total Pool Volume" value={formatTokenValue(+totalSupply, 2) + ' LP'} />
      <ShyftLPPoolOverviewItem title="Pool Rate" value={rewardRate + ' wei/block'} />
    </$MainContainer>
  )
}
