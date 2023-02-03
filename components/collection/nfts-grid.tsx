import styled from 'styled-components'
import Image from 'next/image'
import { Devices } from '../../styles/constants/devices'
import { useNftDispatch, useNftState } from '../../context/nfts'
import { $Text } from '../uiKit'
import { useBalanceState } from '../../context/balances'
import { useFormatter } from '../../hooks/useFormatter'
import { NftModal } from './nft-modal'
import { useState } from 'react'
import { setCurrentToken } from '../../context/nfts/nft.actions'
import { Nft } from '../../types'

const $ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media ${Devices.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 100px;
  }
`

const $NftCard = styled.div`
  background: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  :hover {
    cursor: pointer;
  }
`

const $NftImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex-basis: calc((50vw - 24px - 24px));
  img {
    border-radius: 8px;
  }
  @media ${Devices.tablet} {
    flex-basis: calc((100vw - 320px - 24px) / 3);
  }
  @media ${Devices.laptop} {
    flex-basis: calc((100vw - 520px - 24px) / 3);
  }
  @media ${Devices.laptopL} {
    flex-basis: calc((1440px - 520px - 24px) / 3);
  }
`

const $Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const $NFTProperty = styled($Text)`
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.25rem;
  @media ${Devices.laptop} {
    font-size: 1rem;
    line-height: 1.375rem;
  }
`

export const NftsGrid = (): React.ReactElement => {
  const { currentCollection } = useNftState()
  const dispatch = useNftDispatch()
  const { fiatRates, currentCurrency } = useBalanceState()
  const { formatFiatValue } = useFormatter()
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalClose = (): void => {
    setModalOpen(false)
  }

  const toggleModalOpen = (nft: Nft): void => {
    dispatch(setCurrentToken(nft))
    setModalOpen(!modalOpen)
  }

  return (
    <$ContainerGrid>
      {currentCollection.nfts.map((nft) => {
        return (
          <$NftCard key={nft.tokenId} onClick={() => toggleModalOpen(nft)}>
            <$NftImage>
              <Image src={nft.assetImg} layout="fill" />
            </$NftImage>
            <$NFTProperty>{nft.assetName}</$NFTProperty>
            <$Row>
              <$NFTProperty>{fiatRates && formatFiatValue(nft.balanceUSD * fiatRates[currentCurrency])}</$NFTProperty>
            </$Row>
          </$NftCard>
        )
      })}
      <NftModal isOpen={modalOpen} onClose={toggleModalClose} />
    </$ContainerGrid>
  )
}
