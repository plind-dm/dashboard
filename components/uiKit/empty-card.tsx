import styled from 'styled-components'
import Image from 'next/image'
import { $Text } from '.'
import { Devices } from '../../styles/constants/devices'
import { $Button } from '../uiKit'

interface EmptyProps {
  size?: 'normal' | 'bigger'
}
const $NothingToShow = styled.div<EmptyProps>`
  height: ${(props) => (props.size ? (props.size === 'bigger' ? '239px ' : '183px') : '183px')};
  width: ${(props) => (props.size ? (props.size === 'bigger' ? '318px ' : '252px') : '252px')};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.palette.defaultGrey};
  padding: 16px 32px;
  text-align: center;
  margin-top: 8px;
  @media ${Devices.laptop} {
    height: ${(props) => (props.size ? (props.size === 'bigger' ? '290px ' : '231px') : '231px')};
    width: ${(props) => (props.size ? (props.size === 'bigger' ? '410px ' : '342px') : '342px')};
    padding: 24px 64px;
    margin-top: 60px;
  }
`

interface ImageProps {
  imageSize?: 'normal' | 'bigger'
}
const $ImageToShow = styled.div<ImageProps>`
  position: relative;
  height: 56px;
  width: 56px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  @media ${Devices.laptop} {
    height: ${(props) => (props.imageSize ? (props.imageSize === 'bigger' ? '75px ' : '56px') : '56px')};
    width: ${(props) => (props.imageSize ? (props.imageSize === 'bigger' ? '75px ' : '56px') : '56px')};
  }
`

const $FirstText = styled($Text)`
  font-size: 16px;
  @media ${Devices.laptop} {
    font-size: 18px;
    line-height: 25.2px;
  }
`

const $SecondText = styled($Text)`
  font-weight: 400;
  @media ${Devices.laptop} {
    font-size: 16px;
    line-height: 22.4px;
  }
`

interface EmptyCardProps {
  image: StaticImageData
  text: string
  textButton?: string
  onClick?: () => void
  size?: 'normal' | 'bigger'
  children: string
}

export const EmptyCard = ({ image, text, textButton, onClick, size, children }: EmptyCardProps): React.ReactElement => {
  return (
    <$NothingToShow size={size ? size : undefined}>
      <$ImageToShow imageSize={size ? size : undefined}>
        <Image src={image} width="100px" height={'100px'} layout="fill" />
      </$ImageToShow>
      <$FirstText>{text}</$FirstText>
      <$SecondText>{children}</$SecondText>
      {textButton && onClick && <$Button onClick={onClick}>{textButton}</$Button>}
    </$NothingToShow>
  )
}
