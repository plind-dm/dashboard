import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

export const $Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  background-color: ${(props) => props.theme.palette.defaultGrey};
  box-sizing: border-box;
  border-radius: 8px;
  gap: 16px;
  padding: 16px;
  @media ${Devices.laptop} {
    flex-direction: row;
    margin: 32px 16px;
    padding: 24px 32px;
    justify-content: space-between;
    align-items: center;
  }
`
