import { useState } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { Shyft_LP_Pool_Tabs } from '../../types'
import { $H5 } from '../uiKit'
import { $HorizontalDivider, ShyftLPRewards, ShyftLPStake, ShyftLPUnstake } from '.'

interface ITabGroup {
  selected: boolean
}

const $TabsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 8px 8px 8px;
  @media ${Devices.laptop} {
    margin: 0px 64px 16px 64px;
    justify-content: left;
    column-gap: 72px;
  }
`

const $TabsItem = styled($H5)<ITabGroup>`
  :hover {
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.selected ? props.theme.dark.primary : props.theme.dark.text)};
`

export const ShyftLPPoolTabs = (): React.ReactElement => {
  const [tab, setTab] = useState(Shyft_LP_Pool_Tabs.STAKE)

  const checkTab = (value: Shyft_LP_Pool_Tabs): boolean => {
    return tab === value
  }

  return (
    <>
      <$TabsGroup>
        <$TabsItem selected={checkTab(Shyft_LP_Pool_Tabs.STAKE)} onClick={() => setTab(Shyft_LP_Pool_Tabs.STAKE)}>
          {'Stake'}
        </$TabsItem>
        <$TabsItem selected={checkTab(Shyft_LP_Pool_Tabs.UNSTAKE)} onClick={() => setTab(Shyft_LP_Pool_Tabs.UNSTAKE)}>
          {'Unstake'}
        </$TabsItem>
        <$TabsItem selected={checkTab(Shyft_LP_Pool_Tabs.REWARDS)} onClick={() => setTab(Shyft_LP_Pool_Tabs.REWARDS)}>
          {'Rewards'}
        </$TabsItem>
      </$TabsGroup>
      <$HorizontalDivider />
      {checkTab(Shyft_LP_Pool_Tabs.STAKE) && <ShyftLPStake />}
      {checkTab(Shyft_LP_Pool_Tabs.UNSTAKE) && <ShyftLPUnstake />}
      {checkTab(Shyft_LP_Pool_Tabs.REWARDS) && <ShyftLPRewards />}
    </>
  )
}
