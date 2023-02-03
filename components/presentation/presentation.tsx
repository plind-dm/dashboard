import styled from 'styled-components'
import Image from 'next/image'
import logoWrapperImage from '../../public/images/shyft-logo.svg'
import React from 'react'
import Discord from '../../public/images/icons/discord-icon.svg'
import { Devices } from '../../styles/constants/devices'

const $Logo = styled(Image)`
  animation-duration: 3s;
  animation-name: rotationLogo;
  animation-iteration-count: infinite;
  @keyframes rotationLogo {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`

const $PresentationText = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
  @media ${Devices.laptop} {
    row-gap: 32px;
  }
`

const $Title = styled.h2`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  @media ${Devices.laptop} {
    font-size: 40px;
    line-height: 44px;
  }
`
const $Subtitle = styled.pre`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  text-decoration-line: underline;
  &:hover {
    cursor: pointer;
  }
`

const $Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

interface IPresentation {
  pageTitle: string
  pagePresentation: string | React.ReactText
}

export const Presentation = (props: IPresentation): React.ReactElement => {
  const openDiscord = (): void => {
    window.open('https://discord.gg/shyftnetwork', '_blank')?.focus()
  }

  return (
    <>
      <$Logo src={logoWrapperImage} />
      <$PresentationText>
        <$Title>{props.pageTitle}</$Title>
        <$Row>
          <Image onClick={() => openDiscord()} src={Discord} height={'24px'} width={'24px'} quality="100" />
          <$Subtitle onClick={() => openDiscord()}>{props.pagePresentation}</$Subtitle>
        </$Row>
      </$PresentationText>
    </>
  )
}
