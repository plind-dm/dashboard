import styled from 'styled-components'
import Image from 'next/image'
import leftWrapperImage from '../../public/images/shyft-bg.png'
import { Devices } from '../../styles/constants/devices'

const $PromoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  margin-bottom: 24px;
  @media ${Devices.laptop} {
    height: calc(100vh - 32px);
    margin-bottom: 0;
  }
`

const $Promo = styled(Image)`
  border-radius: 8px;
  @media ${Devices.laptop} {
    transition: all 0.3s;
    :hover {
      filter: brightness(0.7);
    }
  }
`

const $ImageTitle = styled.h1`
  padding: 5px 10px;
  position: absolute;
  text-align: left;
  bottom: 30%;
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  @media ${Devices.laptop} {
    font-size: 56px;
    line-height: 62px;
  }
`

// const $ImageFooter = styled.div`
//   display: none;
//   @media ${Devices.laptop} {
//     position: absolute;
//     bottom: 0;
//     background-color: ${(props) => props.theme.palette.defaultGrey};
//     border-radius: 0 0 10px 10px;
//     width: 100%;
//     height: 10%;
//   }
// `

interface IPromoWrapper {
  children: string
}

export const PromoWrapper = (props: IPromoWrapper): React.ReactElement => {
  return (
    <$PromoWrapper>
      <$Promo src={leftWrapperImage} layout="fill" quality="100" priority />
      <$ImageTitle>{props.children}</$ImageTitle>
    </$PromoWrapper>
  )
}
