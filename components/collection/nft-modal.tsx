import { BaseModal } from '../modal/base-modal'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useNftState } from '../../context/nfts'
import OpenseaLogo from '../../public/images/opensea.svg'
import { Devices } from '../../styles/constants/devices'
import { $LargeTextRegular } from '../uiKit'

const $NftModal = styled(BaseModal)``

const $NftImage = styled.div`
  border-radius: 8px;
  overflow: hidden;
`

const $Row = styled.div`
  display: flex;
  margin-top: 24px;
  flex-direction: row;
  align-items: center;
  @media ${Devices.desktop} {
    margin: 35px 0px;
  }
`

const $LinkOpenSea = styled.a`
  margin-left: 10px;
  color: ${(props) => props.theme.palette.greyV4};
  *:hover {
    cursor: pointer;
  }
`

const $NftWrapper = styled.div``

const $WrapperIcon = styled.div`
  @media ${Devices.desktop} {
    width: 50px;
    height: 50px;
    :hover {
      cursor: pointer;
    }
  }
`
interface IModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NftModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const { currentToken, currentCollection } = useNftState()
  const openseaUri = `https://opensea.io/assets/${currentCollection.address}/${currentToken.tokenId}`

  const redirect = (url: string): void => {
    window.open(url, '_blank')
  }

  return (
    <$NftModal isOpen={isOpen} onClose={onClose}>
      <$NftWrapper>
        <$NftImage>
          <Image src={currentToken.assetImg} width="566px" height="566px" objectFit="cover" />
        </$NftImage>
        <$Row>
          <$WrapperIcon>
            <Image src={OpenseaLogo} width="50" height="50" />
          </$WrapperIcon>
          <$LinkOpenSea target="_blank" href={openseaUri} onClick={() => redirect(openseaUri)}>
            <$LargeTextRegular>{'View on OpenSea'}</$LargeTextRegular>
          </$LinkOpenSea>
        </$Row>
      </$NftWrapper>
    </$NftModal>
  )
}
