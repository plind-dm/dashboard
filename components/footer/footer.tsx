import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { $Divider, $Text, SocialMediaIcon, $SmallTextBold } from '../uiKit'
import { Devices } from '../../styles/constants/devices'
import logo from '../../public/images/shyft-sidebar-logo.svg'
import textLogo from '../../public/images/text-logo.svg'
import Link from 'next/link'
import json from '../../package.json'

const $FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.palette.black};
  @media ${Devices.laptop} {
    position: absolute;
    width: 100%;
    grid-area: footer;
    top: 100%;
  }
`

const $RowIcon = styled.div`
  @media ${Devices.laptop} {
    display: flex;
    margin-right: 16px;
  }
`

const $RowLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 22px 10px;
  @media ${Devices.tablet} {
    display: flex;
    margin: 22px 20px;
    justify-content: flex-start;
    gap: 50px;
  }
`

const $WrapperImage = styled.a`
  position: relative;
  width: 24px;
  height: 24px;
  @media ${Devices.laptop} {
    width: 36px;
    height: 36px;
  }
`

const $TextLink = styled($Text)`
  color: ${(props) => props.theme.palette.greyV4};
  font-weight: 400;
  :hover {
    color: ${(props) => props.theme.palette.white};
  }
`

const $ColumnWrapper = styled.div`
  width: 100%;
  margin: 10px;
  @media ${Devices.laptop} {
    display: flex;
    flex-direction: column;
  }
`

const $Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 8px;
  @media ${Devices.laptop} {
    gap: 24px;
  }
`

const $Row = styled.div`
  @media ${Devices.laptop} {
    display: flex;
    justify-content: space-between;
  }
`

const $LogoTextZapper = styled.div`
  display: flex;
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;
  @media ${Devices.laptop} {
    width: 25%;
  }
`
const $TextLogo = styled.div`
  display: flex;
  margin: 10px 0px;
  @media ${Devices.laptop} {
    display: flex;
    margin-left: 15px;
  }
`

const $TextShyft = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`

const $VersionWrapper = styled($SmallTextBold)`
  margin-left: 16px;
  align-self: flex-end;
  color: ${(props) => props.theme.palette.greyV4};
  margin-bottom: 5.5px;
  @media ${Devices.laptop} {
    margin-bottom: 4.5px;
  }
`

const Footer = (): React.ReactElement => {
  return (
    <$FooterWrapper>
      <$ColumnWrapper>
        <$Divider />
        <$Row>
          <$LogoTextZapper>
            <$TextLogo>
              <Image src={logo} layout="fixed" />
              <$TextShyft>
                <Image src={textLogo} layout="fixed" />
              </$TextShyft>
              <$VersionWrapper>v{json.version}</$VersionWrapper>
            </$TextLogo>
          </$LogoTextZapper>
          <$RowIcon>
            <$Divider />
            <$Wrapper>
              <$WrapperImage target="_blank" href="https://discord.com/invite/shyftnetwork">
                <SocialMediaIcon imagePath="/images/icons/discord-icon.svg" />
              </$WrapperImage>
              <$WrapperImage target="_blank" href="https://twitter.com/shyftnetwork">
                <SocialMediaIcon imagePath="/images/icons/twitter-icon.svg" />
              </$WrapperImage>
              <$WrapperImage target="_blank" href="https://github.com/ShyftNetwork">
                <SocialMediaIcon imagePath="/images/icons/github-icon.svg" />
              </$WrapperImage>
              <$WrapperImage target="_blank" href="https://shyftnetwork.medium.com/">
                <SocialMediaIcon imagePath="/images/icons/medium-icon.svg" />
              </$WrapperImage>
              <$WrapperImage target="_blank" href="https://www.linkedin.com/company/shyftnetwork">
                <SocialMediaIcon imagePath="/images/icons/linkedin-icon.svg" />
              </$WrapperImage>
              <$WrapperImage target="_blank" href="https://www.facebook.com/ShyftNetwork">
                <SocialMediaIcon imagePath="/images/icons/facebook-icon.svg" />
              </$WrapperImage>
              <$WrapperImage target="_blank" href="https://t.me/shyftnetwork">
                <SocialMediaIcon imagePath="/images/icons/telegram-icon.svg" />
              </$WrapperImage>
            </$Wrapper>
          </$RowIcon>
        </$Row>
        <$Divider />
        <$RowLinks>
          <Link href="/privacy-policy" passHref>
            <$TextLink as="a" target="_blank">
              Privacy Policy
            </$TextLink>
          </Link>
          <Link href="/terms-and-conditions" passHref>
            <$TextLink as="a" target="_blank">
              Terms of Use
            </$TextLink>
          </Link>
        </$RowLinks>
      </$ColumnWrapper>
    </$FooterWrapper>
  )
}

export default Footer
