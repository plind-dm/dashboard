import styled from 'styled-components'
import Image from 'next/image'
import shyftIcon from '../../public/images/icons/shyft.svg'
import { $H3, $MediumTextRegular } from '../uiKit'
import { Devices } from '../../styles/constants/devices'
import { ShyftLPPoolOverview, ShyftLPPoolTabs, $HorizontalDivider } from '.'

const $MainContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 258px);
  @media ${Devices.laptop} {
    margin-top: 32px;
  }
`

const $Subtitle = styled($MediumTextRegular)`
  display: none;
  color: ${(props) => props.theme.palette.greyV4};
  @media ${Devices.laptop} {
    display: block;
  }
`

const $TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 8px;
  @media ${Devices.laptop} {
    flex-direction: column;
    margin: 0px 24px 24px 24px;
    gap: 16px;
    & > span {
      display: none !important;
    }
  }
`
export const ShyftLPPool = (): React.ReactElement => {
  return (
    <$MainContainer>
      <$TitleContainer>
        <$H3>{'LP Stake'}</$H3>
        <Image src={shyftIcon} layout="fixed" height="32px" width="32px" />
        <$Subtitle>{'Earn trading fees by providing liquidity in a single transaction.'}</$Subtitle>
      </$TitleContainer>
      <$HorizontalDivider />
      <ShyftLPPoolOverview />
      <ShyftLPPoolTabs />
    </$MainContainer>
  )
}
