import styled from 'styled-components'
import { IProps } from '../../interfaces/Iprops'
import { Devices } from '../../styles/constants/devices'
import { $MediumTextBold, $MediumTextRegular, $NormalTextRegular, $Text } from '../uiKit'

export const $ArrowImageWrapper = styled.div`
  margin-top: 6px;
  @media ${Devices.laptop} {
    position: relative;
    bottom: 0;
    right: 5%;
  }
`

export const $ArrowWrapper = styled.div`
  @media ${Devices.laptop} {
    margin: 0px;
  }
`

export const $ArrowWrapperReceive = styled.div`
  @media ${Devices.laptop} {
    margin: 0px;
  }
`

export const $ArrowWrapperSent = styled.div`
  @media ${Devices.laptop} {
    margin: 0px;
  }
`

export const $ArrowNetworkImageWrapper = styled.div`
  display: inherit;
  height: 20px;
  width: 20px;
  @media ${Devices.laptop} {
    display: none;
  }
`

export const $WrapperImage = styled.div`
  display: flex;
  align-items: center;
  @media ${Devices.laptop} {
    display: none;
  }
`
export const $TextTransactionName = styled($MediumTextBold)`
  margin-left: 2px;
  @media ${Devices.laptop} {
    margin-right: 8px;
  }
`

export const $TransactionNameWrapper = styled.div`
  display: flex;
  gap: 4px;
  @media ${Devices.laptop} {
  }
`

export const $GasFeeMobile = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  @media ${Devices.tablet} {
    display: none;
  }
`

export const $HighLightTextGas = styled($MediumTextRegular)`
  line-height: 1rem;
  @media ${Devices.laptop} {
    margin-top: 5px;
  }
`

export const $TransactionContainer = styled.div<IProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media ${Devices.laptop} {
    justify-content: flex-start;
    gap: 10px;
  }
  @media ${Devices.laptopL} {
    &[data-is-first='true'] {
      width: 20%;
    }
    width: 35%;
  }
`

export const $HighLightTextDate = styled($MediumTextRegular)``

export const $SubTransaction = styled.div`
  display: flex;
  flex-direction: column;
`
export const $SubTransactionText = styled($MediumTextBold)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 3;
  max-width: 85px;
  @media ${Devices.laptop} {
    overflow: visible;
    white-space: wrap;
    -webkit-line-clamp: 0;
    text-overflow: inherit;
  }
`

export const $SubTransactionSymbol = styled($Text)``

export const $ArrowNetworkImageWrapperDesktop = styled.div`
  display: none;
  @media ${Devices.laptop} {
    display: inherit;
  }
`

export const $FromText = styled($NormalTextRegular)``
