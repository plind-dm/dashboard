import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { $Divider } from '../uiKit'

export const $HorizontalDivider = styled($Divider)`
  @media ${Devices.laptop} {
    width: calc(100% + 70px);
    margin: 0 0 0 -35px;
  }
`
