import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

const $InteractionButton = styled.input`
  width: 100%;
  padding: 10px 0px;
  margin-top: 32px;
  margin-bottom: 16px;
  min-height: 50px;
  border-radius: 8px;
  outline: none;
  border: none;
  background-color: ${(props) => props.theme.dark.primary};
  position: relative;
  font-weight: 900;
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  @media ${Devices.laptop} {
    margin-top: 48px;
    margin-bottom: 24px;
    max-width: 420px;
    padding: 15px 0px;
    border-radius: 8px;
    transition: all 0.3s;
    :hover {
      background-color: ${(props) => props.theme.dark.secondary};
      cursor: pointer;
    }
  }
`

interface IInteractionButton {
  textButton: string
  onClick: VoidFunction
}

export const InteractionButton = (props: IInteractionButton): React.ReactElement => {
  return <$InteractionButton type="button" value={props.textButton} onClick={props.onClick} />
}
