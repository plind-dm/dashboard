import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'

export const $H1 = styled.h1`
  font-family: 'Neuzeit Grotesk';
  font-weight: 900;
  font-style: normal;
  font-size: 3rem;
  line-height: 3.3rem;
  @media ${Devices.laptop} {
    font-size: 3.5rem;
    line-height: 3.85rem;
  }
`

export const $H2 = styled.h2`
  font-family: 'Neuzeit Grotesk';
  font-weight: 900;
  font-style: normal;
  font-size: 2.5rem;
  line-height: 2.75rem;
  @media ${Devices.laptop} {
    font-size: 3rem;
    line-height: 3.3rem;
  }
`

export const $H3 = styled.h3`
  font-family: 'Neuzeit Grotesk';
  font-weight: 900;
  font-style: normal;
  font-size: 2rem;
  line-height: 2.2rem;
  @media ${Devices.laptop} {
    font-size: 2.5rem;
    line-height: 2.75rem;
  }
`

export const $H4 = styled.h4`
  font-family: 'Neuzeit Grotesk';
  font-weight: 900;
  font-style: normal;
  font-size: 1.5rem;
  line-height: 1.65rem;
  @media ${Devices.laptop} {
    font-size: 2rem;
    line-height: 2.2rem;
  }
`

export const $H5 = styled.h5`
  font-family: 'Neuzeit Grotesk';
  font-weight: 900;
  font-style: normal;
  font-size: 1.25rem;
  line-height: 1.375rem;
  @media ${Devices.laptop} {
    font-size: 1.5rem;
    line-height: 1.65rem;
  }
`

export const $H6 = styled.h6`
  font-family: 'Neuzeit Grotesk';
  font-weight: 900;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.4rem;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    line-height: 1.375rem;
  }
`

const $LargeText = styled.p`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-size: 1.125rem;
  line-height: 1.575rem;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`
export const $LargeTextInput = styled.input`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.575rem;
  @media ${Devices.laptop} {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`

export const $LargeTextBold = styled($LargeText)`
  font-weight: bold;
`

export const $LargeTextRegular = styled($LargeText)`
  font-weight: normal;
`

const $MediumText = styled.p`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-size: 1rem;
  line-height: 1.4rem;
  @media ${Devices.laptop} {
    font-size: 1.125rem;
    line-height: 1.575rem;
  }
`

export const $MediumTextBold = styled($MediumText)`
  font-weight: bold;
`

export const $MediumTextRegular = styled($MediumText)`
  font-weight: normal;
`

const $NormalText = styled.p`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-size: 0.875rem;
  line-height: 1.225rem;
  @media ${Devices.laptop} {
    font-size: 1rem;
    line-height: 1.4rem;
  }
`

export const $NormalTextInput = styled.input`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.225rem;
  @media ${Devices.laptop} {
    font-size: 1rem;
    line-height: 1.4rem;
  }
`

export const $NormalTextBold = styled($NormalText)`
  font-weight: bold;
`

export const $NormalTextRegular = styled($NormalText)`
  font-weight: normal;
`

const $SmallText = styled.p`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-size: 0.75rem;
  line-height: 1.0375rem;
  @media ${Devices.laptop} {
    font-size: 0.875rem;
    line-height: 1.225rem;
  }
`

export const $SmallTextBold = styled($SmallText)`
  font-weight: bold;
`

export const $SmallTextRegular = styled($SmallText)`
  font-weight: normal;
`

export const $Text = styled.p`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25rem;
  @media ${Devices.laptop} {
    font-size: 1rem;
    line-height: 1.375rem;
  }
`
