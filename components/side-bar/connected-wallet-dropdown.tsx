import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Devices } from '../../styles/constants/devices'
import { connectWallet, useAuthDispatch, useAuthState } from '../../context/auth'
import { parseAddress } from '../../utils/address-utils'
import Image from 'next/image'
import arrowDown from '../../public/images/arrow-down.svg'
import walletAvatar from '../../public/images/wallet-avatar.svg'
import switchButton from '../../public/images/switchButton.svg'
import disconnectIcon from '../../public/images/disconnectButton.svg'
import { setLogoutModalState, useLogoutModalDispatch } from '../../context/logout-modal'
import { ItemDropdown } from '../../components/side-bar/item-dropdown'
import { useRouter } from 'next/router'
import { Routes, Tabs } from '../../types'
import { $NormalTextBold } from '../uiKit'
import { useDropdownState, useDropdownDispatch, setWalletDropdownState } from '../../context/dropdown'

interface WalletVisibilityHandlerProps {
  open: boolean
}

const $DropdownWrapper = styled.div`
  margin-bottom: 32px;
  width: 100%;
`
const $CurrentWallet = styled.div<WalletVisibilityHandlerProps>`
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  &:hover {
    background-color: ${(props) => props.theme.palette.hover};
    cursor: pointer;
  }
`

const $DropdownMenu = styled.div<WalletVisibilityHandlerProps>`
  display: ${(props) => (props.open ? 'inherit' : 'none')};
  position: absolute;
  width: 100%;
  min-height: 186px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  z-index: 9;
  @media ${Devices.laptop} {
    width: 300px;
  }
`

const $Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.palette.hover};
  }
`

const $CurrentWalletItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  &:hover {
    cursor: pointer;
  }
`

const $ImageArrow = styled.div`
  &[data-selected='true'] {
    img {
      transform: rotateZ(180deg);
    }
  }
`

const $Line = styled.div`
  background-color: ${(props) => props.theme.palette.paleGrey};
  width: 100%;
  height: 1px;
`

const $ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ConnectedWalletDropdown = (): React.ReactElement => {
  const { walletDropdownState } = useDropdownState()
  const dropdownDispatch = useDropdownDispatch()
  const router = useRouter()
  const authDispatch = useAuthDispatch()
  const { connectedAccounts, walletAddress } = useAuthState()
  const [showDropdown, setShowDropdown] = useState(false)
  const dispatch = useLogoutModalDispatch()

  const toggleModal = (): void => {
    dispatch(setLogoutModalState(true))
    dropdownDispatch(setWalletDropdownState(!walletDropdownState))
  }

  const toggleDropdown = (): void => {
    dropdownDispatch(setWalletDropdownState(!walletDropdownState))
  }

  const switchWalletProvider = (): void => {
    authDispatch(connectWallet(router, `${Routes.PORTFOLIO}?tab=${Tabs.MAIN}`))
  }

  useEffect(() => {
    setShowDropdown(walletDropdownState)
  }, [walletDropdownState])

  return (
    <$DropdownWrapper>
      <$CurrentWallet onClick={toggleDropdown} open={walletDropdownState}>
        <$CurrentWalletItem>
          <Image src={walletAvatar} />
          <$NormalTextBold>{walletAddress && parseAddress(walletAddress)}</$NormalTextBold>
        </$CurrentWalletItem>
        <$ImageArrow data-selected={showDropdown}>
          <Image src={arrowDown} />
        </$ImageArrow>
      </$CurrentWallet>
      <$DropdownMenu open={walletDropdownState}>
        <$ItemsContainer>
          {Array.from(connectedAccounts).map((account) => {
            return <ItemDropdown account={account} key={account} toggleDropdown={toggleDropdown} />
          })}
        </$ItemsContainer>
        <$Line></$Line>
        <$ItemsContainer>
          <$Item onClick={switchWalletProvider}>
            <Image src={switchButton} />
            <$NormalTextBold>Switch Wallet Provider</$NormalTextBold>
          </$Item>
          <$Item onClick={toggleModal}>
            <Image src={disconnectIcon} />
            <$NormalTextBold>Disconnect</$NormalTextBold>
          </$Item>
        </$ItemsContainer>
      </$DropdownMenu>
    </$DropdownWrapper>
  )
}
