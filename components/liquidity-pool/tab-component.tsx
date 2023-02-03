import styled from 'styled-components'
import Image from 'next/image'
import { Devices } from '../../styles/constants/devices'

const $TabComponent = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid transparent;
  column-gap: 3px;
  font-size: 1rem;
  @media ${Devices.laptop} {
    padding: 3px;
    column-gap: 10px;
    font-size: 1.3rem;
    transition: all 0.3s;
    :hover {
      border-bottom: 2px solid ${(props) => props.theme.dark.text};
      cursor: pointer;
    }
  }
`

const $ImageWrapper = styled.div`
  box-sizing: content-box;
  position: relative;
  width: 15px;
  height: 15px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey + '33'};
  border-radius: 50%;
  @media ${Devices.laptop} {
    width: 30px;
    height: 30px;
  }
`

interface ITabComponentProps {
  src: string | StaticImageData
  className: string
  children: React.ReactText
  onClick: VoidFunction
}

export const TabComponent = ({ src, children, className, onClick }: ITabComponentProps): React.ReactElement => {
  return (
    <$TabComponent className={className} onClick={onClick}>
      <$ImageWrapper>
        <Image src={src} layout="fill" />
      </$ImageWrapper>
      {children}
    </$TabComponent>
  )
}
