import { Devices } from '../../styles/constants/devices'
import styled from 'styled-components'
import Image from 'next/image'
import { $ImageWrapper } from '../uiKit'
import { ReactNode } from 'react'

interface IModalCard {
  children: ReactNode
  image: string
  networkImage: string
  className?: string
}

const $AssetItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: auto;
  max-width: 190px;
  padding: 10px;
  height: 80px;
  margin-left: 15px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border-radius: 8px;
  & > div {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media ${Devices.laptop} {
    flex-direction: row;
    column-gap: 5%;
  }
`
const $Content = styled.p`
  text-align: start;
  margin-bottom: 5px;
  margin-right: 10px;
`
const $TitlePriceUSD = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
  flex-direction: column;
`

const $Wrapper = styled.div`
  margin-top: 40pc;
`

const $ImagePosition = styled.div`
  position: relative;
  margin-left: 10px;
  margin-bottom: 10px;
`

const $NetworkImage = styled.div`
  position: relative;
  z-index: 999;
  height: 45%;
  width: 45%;
`

export const AssetItem = (props: IModalCard): React.ReactElement => {
  return (
    <$AssetItem className={props.className}>
      <$Wrapper>
        <$ImagePosition>
          <$ImageWrapper height="35px" width="35px">
            {props.networkImage && (
              <$NetworkImage>
                <Image src={props.networkImage} layout="fill" />
              </$NetworkImage>
            )}
            {props.image && <Image src={props.image} layout="fill" />}
          </$ImageWrapper>
        </$ImagePosition>
        <$TitlePriceUSD>
          <$Content>{props.children}</$Content>
        </$TitlePriceUSD>
      </$Wrapper>
    </$AssetItem>
  )
}
