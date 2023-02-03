import styled from 'styled-components'
import { IProps } from '../../interfaces/Iprops'
import { Devices } from '../../styles/constants/devices'

export const $Button = styled.button<IProps>`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: ${(props) => (props.secondary ? '12px' : '16px')};
  line-height: ${(props) => (props.secondary ? '13px' : '22px')};
  box-sizing: border-box;
  width: ${(props) => (props.widthMobile ? props.widthMobile : ' 100%;')};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${(props) =>
    props.disabled ? props.theme.palette.palidWhite : props.secondary ? 'transparent' : props.theme.palette.pink};
  color: ${(props) => (props.secondary ? '#994D7E' : 'white')};
  height: ${(props) => (props.secondary ? '30px' : '48px')};
  border: ${(props) => (props.secondary ? '2px solid #512D6D;' : 'none')};
  border-radius: 8px;
  text-align: center;
  column-gap: 12px;
  @media ${Devices.laptop} {
    width: ${(props) => (props.widthDesktop ? props.widthDesktop : ' 100%;')};
    height: ${(props) => (props.secondary ? '50px' : '55px')};
    font-size: ${(props) => (props.secondary ? '14px' : '16px')};
    line-height: ${(props) => (props.secondary ? '20px' : '22px')};
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.palette.hoverPink};
  }
  &:active {
    background-color: ${(props) => props.theme.palette.pressedPink};
  }
  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    color: ${(props) => props.theme.palette.greyV4}40;
    background-color: ${(props) => props.theme.palette.palidWhite};
  }
  transition: all 0.3s;
`
