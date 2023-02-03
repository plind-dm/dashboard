import React from 'react'
import styled from 'styled-components'
import { BaseModal } from './base-modal'
import { Devices } from '../../styles/constants/devices'
import { useRouter } from 'next/router'
import { useAuthDispatch, logout } from '../../context/auth'
import { setLogoutModalState, useLogoutModalDispatch } from '../../context/logout-modal'
import { Routes } from '../../types'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
}

const $Wrapper = styled.div`
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.black};
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
  @media ${Devices.laptop} {
    min-width: 750px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
`

const $Title = styled.p`
  margin-top: 24px;
  margin-bottom: 8px;
  font-weight: 700 bold;
  font-size: 1.125rem;
  line-height: 22.4px;
  @media ${Devices.laptop} {
    margin-top: 0;
    margin-bottom: 32px;
    font-weight: 700 bold;
    font-size: 1.125rem;
    justify-content: center;
    align-items: center;
  }
`

const $Text1 = styled.span`
  width: 70%;
  margin-top: 8px;
  font-size: 0.875rem;
  text-align: center;
  align-items: center;
  line-height: 22.4px;
  font-weight: 400 bold;
  color: ${(props) => props.theme.palette.grey};
  @media ${Devices.laptop} {
    text-align: center;
    align-items: center;
    line-height: 22.4px;
    font-size: 1.125rem;
    font-weight: 400 bold;
    width: 60%;
    padding: 0;
    font-weight: normal;
    color: ${(props) => props.theme.palette.grey};
  }
`

const $Text2 = styled.span`
  width: 85%;
  padding: 0 12px;
  line-height: 22.4px;
  font-size: 0.875rem;
  text-align: center;
  font-weight: 400 bold;
  align-items: center;
  font-weight: normal;
  margin-bottom: 16px;
  color: ${(props) => props.theme.palette.grey};
  @media ${Devices.laptop} {
    line-height: 22.4px;
    font-size: 1.125rem;
    width: 50%;
    font-weight: 400 bold;
    color: ${(props) => props.theme.palette.grey};
  }
`

const $ModalCancelBtn = styled.button`
  margin-top: 16px;
  margin-bottom: 24px;
  margin-right: 16px;
  width: 103px;
  cursor: pointer;
  height: 50px;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 25.2px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  color: white;
  @media ${Devices.laptop} {
    margin-right: 16px;
    width: 103px;
    cursor: pointer;
    height: 50px;
    border: none;
    font-family: 'Neuzeit Grotesk';
    border-radius: 8px;
    background-color: ${(props) => props.theme.palette.defaultGrey};
    color: white;
    margin-bottom: 24px;
    &:hover {
      background-color: ${(props) => props.theme.palette.hover};
    }
    &:active {
      background-color: ${(props) => props.theme.palette.darkGrey};
    }
  }
`

const $LogOutBtn = styled.button`
  margin-top: 16px;
  margin-bottom: 24px;
  cursor: pointer;
  width: 103px;
  font-weight: 700;
  font-size: 1.125rem;
  border: none;
  height: 50px;
  text-align: center;
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.defaultRose};
  color: white;
  @media ${Devices.laptop} {
    transition: all 0.3s;
    margin-right: 16px;
    cursor: pointer;
    width: 103px;
    font-family: 'Neuzeit Grotesk';
    border: none;
    height: 50px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.palette.defaultRose};
    color: white;
    margin-bottom: 24px;
    &:hover {
      background-color: ${(props) => props.theme.palette.lightRose};
    }
    &:active {
      background-color: ${(props) => props.theme.palette.darkRose};
    }
  }
`

const $Buttons = styled.div`
  display: flex;
  @media ${Devices.laptop} {
    flex-direction: row;
  }
`

export const LogOutModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const authDispatch = useAuthDispatch()
  const dispatch = useLogoutModalDispatch()

  const LogOut = (): void => {
    dispatch(setLogoutModalState(false))
    authDispatch(logout(router, Routes.LOGIN))
  }
  return isOpen ? (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <$Wrapper>
        <$Title>Log out of all your accounts?</$Title>
        <$Text1>This will remove all watched and connected addresses from the</$Text1>
        <$Text2>dashboard and return you to the home screen.</$Text2>
        <$Buttons>
          <$ModalCancelBtn onClick={onClose}>Cancel</$ModalCancelBtn>
          <$LogOutBtn onClick={LogOut}>Logout</$LogOutBtn>
        </$Buttons>
      </$Wrapper>
    </BaseModal>
  ) : null
}
