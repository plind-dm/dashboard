import { Devices } from '../../styles/constants/devices'
import styled from 'styled-components'
import Image from 'next/image'
import { ReactNode, ReactText } from 'react'
import { $H5, $NormalTextBold } from '../../components/uiKit'

interface IExhibitCard {
  children: ReactNode
  text?: ReactText
  image?: string
  className?: string
}

const $ExhibitCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  @media ${Devices.laptop} {
    width: 330px;
    padding: 24px;
  }
`

const $ImageWrapper = styled.div`
  position: relative;
  min-height: 50px;
  min-width: 50px;
`

const $ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
`

const $TextContainer = styled.div`
  align-self: flex-end;
`

export const ExhibitCard = (props: IExhibitCard): React.ReactElement => {
  return (
    <$ExhibitCard className={props.className}>
      <div>
        {props.image && props.text ? (
          <$ContextContainer>
            <$ImageWrapper>
              <Image src={props.image} layout="fill" />
            </$ImageWrapper>
            <$NormalTextBold>{props.text}</$NormalTextBold>
          </$ContextContainer>
        ) : null}
      </div>
      <$TextContainer>
        <$H5>{props.children}</$H5>
      </$TextContainer>
    </$ExhibitCard>
  )
}
