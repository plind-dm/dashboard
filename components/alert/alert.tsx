import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

interface IAlert {
  condition: boolean
  children: string
}

const $AlertMessage = styled.div<IAlert>`
  position: absolute;
  background-color: ${(props) => props.theme.palette.black};
  width: 95%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 10px;
  border-radius: 8px;
  top: ${(props) => (props.condition ? '-150px' : '15px')};
  text-align: center;
  transition: all 0.5s ease-in-out;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  @media ${Devices.laptop} {
    width: 85%;
    top: ${(props) => (props.condition ? '-200px' : '50px')};
  }
`

export const Alert = (props: IAlert): React.ReactElement => {
  return <$AlertMessage condition={props.condition}>{props.children}</$AlertMessage>
}
