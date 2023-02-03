import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { $H4, $NormalTextRegular } from '../uiKit'

const $OverviewItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${Devices.laptop} {
  }
`

const $Title = styled($NormalTextRegular)`
  color: ${(props) => props.theme.palette.greyV4};
`

const $Box = styled.div`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  box-sizing: border-box;
  border-radius: 8px;
  width: max-content;
  @media ${Devices.laptop} {
    padding: 8px 32px;
  }
`

export const ShyftPoolOverviewItem = ({ title, value }: { title: string; value: string }): React.ReactElement => {
  return (
    <$OverviewItemContainer>
      <$Title>{title}</$Title>
      <$Box>
        <$H4>{value}</$H4>
      </$Box>
    </$OverviewItemContainer>
  )
}
