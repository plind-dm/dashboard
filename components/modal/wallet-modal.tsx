import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Devices } from '../../styles/constants/devices'
import { $H4, $H5, $H6 } from '../uiKit'
import { useBalanceState } from '../../context/balances'
import walletIcon from '../../public/images/wallet-icon.svg'
import { AssetItem } from './asset-item'
import { BaseModal } from './base-modal'
import { DigestedTokenAsset, DigestedTokenBalance } from '../../pages/api/token-balances'

const $Wallet = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const $WalletPriceWrapper = styled.div`
  margin-left: 8px;
  margin-top: 8px;
`
const $TitleWallet = styled($H4)`
  margin-right: 12px;
  margin-bottom: 2px;
  font-family: 'Montserrat';
  color: #878789;
  font-weight: normal;
`

const $WalletPrice = styled($H5)`
  margin-top: 8px;
  font-family: 'Montserrat';
`

const $ContentModalWrapper = styled.div`
  display: flex;
  row-gap: 20px;
  width: 900px;
  flex-wrap: wrap;
  margin-top: 30px;
  border-radius: 8px;
`

const $BalanceCrypto = styled.p`
  font-weight: normal;
`

const $BalanceFiat = styled($H6)``

const $Symbol = styled.p`
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: normal;
`

const $CryptoSymbol = styled.div`
  display: flex;
`

const $Wrapper = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 10px;
  height: 80px;
  margin-left: 15px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border-radius: 8px;
  & > div {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media ${Devices.laptop} {
    flex-direction: row;
    column-gap: 5%;
  }
`
interface IModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WalletModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  const { convertedBalances, totalBalances, networks } = useBalanceState()

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <$Wallet>
        <Image src={walletIcon} alt="modal-icon-img" width="40px" height="40px" />
        <$WalletPriceWrapper>
          <$TitleWallet>Wallet</$TitleWallet>
        </$WalletPriceWrapper>
        <$WalletPrice>$ {totalBalances ? `${totalBalances?.assetBalance.toFixed(2)}` : `Loading...`}</$WalletPrice>
      </$Wallet>
      <$ContentModalWrapper>
        {convertedBalances?.map((tokenBalance: DigestedTokenBalance) => {
          return (
            networks[tokenBalance.networkName.toUpperCase()] &&
            tokenBalance.products?.map((product: DigestedTokenAsset) => {
              return (
                <Link href={`/${product.network}/token/${product.address}`} key={product.name}>
                  <$Wrapper>
                    <AssetItem image={product.imageUrl} networkImage={tokenBalance.networkImage}>
                      <$BalanceFiat>$ {product.balanceFiat.toFixed(2)}</$BalanceFiat>
                      <$CryptoSymbol>
                        <$BalanceCrypto>{product.balanceCrypto.toFixed(8)}</$BalanceCrypto>
                        <$Symbol>{product.symbol}</$Symbol>
                      </$CryptoSymbol>
                    </AssetItem>
                  </$Wrapper>
                </Link>
              )
            })
          )
        })}
      </$ContentModalWrapper>
    </BaseModal>
  )
}
