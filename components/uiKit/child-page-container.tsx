import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

export const ChildPageContainer = styled.div`
  min-height: calc(100vh - 198px);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin: 24px 0;
  @media ${Devices.laptop} {
    min-height: calc(100vh - 310px);
    row-gap: 24px;
    margin: 24px;
  }
`
