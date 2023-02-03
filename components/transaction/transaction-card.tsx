import { ICardProps } from './transaction-types'
import styled from 'styled-components'
import { IProps } from '../../interfaces/Iprops'
import { Devices } from '../../styles/constants/devices'

const $CardButton = styled.div<IProps>`
  padding: 16px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  background-color: ${(props) => props.theme.palette.defaultGrey};
  min-height: 113px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  ${(props) => props.isLast && ' margin-bottom: 16px;'}
  @media ${Devices.tablet} {
    padding: 0px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  @media ${Devices.laptopM} {
    padding: 0px 40px;
  }
  ${(props) =>
    props.isLast &&
    'border-bottom: 1px solid #3a3f50; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px;'}
  ${(props) =>
    props.isFirst && ' border-top: 1px solid #3a3f50; border-top-right-radius: 8px; border-top-left-radius: 8px;'}
  @media ${Devices.laptop} {
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.palette.hover};
    }
  }
`

export const Card = ({ children, onClick, isFirst, isLast }: ICardProps): React.ReactElement => {
  return (
    <>
      <$CardButton onClick={onClick} isFirst={isFirst} isLast={isLast}>
        {children}
      </$CardButton>
    </>
  )
}
