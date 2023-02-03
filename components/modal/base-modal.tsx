import styled from 'styled-components'
import Image from 'next/image'
import closeIcon from '../../public/images/close-icon.svg'
import { ReactNode } from 'react'
import { Devices } from '../../styles/constants/devices'

const $OutsideModal = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
`
const $Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(3px) brightness(75%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${Devices.laptop} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
export const $ModalBox = styled.div`
  position: relative;
  width: 90%;
  height: auto;
  padding: 24px;
  max-width: 465px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.black};
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.15);
  @media ${Devices.laptop} {
    max-width: 1000px;
    width: unset;
    ::-webkit-scrollbar {
      width: 0; /* Remove scrollbar space */
      background: transparent; /* Optional: just make scrollbar invisible */
    }
  }
`

interface ModalCloseBtnInterface {
  noCloseButton: boolean
}

const $ModalCloseBtn = styled.button<ModalCloseBtnInterface>`
  display: ${(props) => (props.noCloseButton ? 'none' : 'inherit')};
  position: absolute;
  background: none;
  border: none;
  top: 23px;
  right: 23px;
  transition: transform 250ms ease-in-out;
  transform-origin: 50% 50%;
  cursor: pointer;
`

const $ModalContent = styled.div`
  margin: auto;
`

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  noCloseButton?: boolean
}
export const BaseModal: React.FC<IModalProps> = ({ isOpen, onClose, children, noCloseButton }) => {
  return isOpen ? (
    <>
      <$Modal id="modal">
        <$OutsideModal onClick={onClose} />
        <$ModalBox id="box">
          <$ModalCloseBtn onClick={onClose} noCloseButton={noCloseButton || false}>
            <Image src={closeIcon} alt="close-icon" height="35px" width="35px" />
          </$ModalCloseBtn>
          <$ModalContent id="content">{children}</$ModalContent>
        </$ModalBox>
      </$Modal>
    </>
  ) : null
}
