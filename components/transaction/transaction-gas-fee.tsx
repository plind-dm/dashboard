import styled from 'styled-components'
import { IGasFeeProps } from './transaction-types'
import { Devices } from '../../styles/constants/devices'

const $GasFee = styled.div`
  display: none;
  @media ${Devices.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
`

export const GasFee = ({ children }: IGasFeeProps): React.ReactElement => {
  return <$GasFee>{children}</$GasFee>
}
