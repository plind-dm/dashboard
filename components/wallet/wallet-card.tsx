import styled from 'styled-components'
import Image from 'next/image'
import { $H5, $Text } from '../uiKit'
import { DigestedTokenAsset } from '../../pages/api/token-balances'
import { Devices } from '../../styles/constants/devices'
import { useFormatter } from '../../hooks/useFormatter'

interface WalletCardProps {
  tokenInformation: DigestedTokenAsset
  networkImage: string
}

const $WalletCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  @media ${Devices.laptop} {
    padding: 24px;
    width: 100%;
    max-width: 212px;
  }
`

const $ImagesWrapper = styled.div`
  display: inline-block;
  flex-basis: 40px;
`

const $NetworkImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  height: 16px;
  width: 16px;
  z-index: 1;
`

const $TokenImageWrapper = styled.div`
  top: -16px;
  left: 8px;
  position: relative;
  height: 32px;
  width: 32px;
`

const $TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-left: 8px;
  @media ${Devices.laptop} {
    margin-left: 16px;
  }
`

const $Name = styled($H5)`
  font-size: 20px;
`

const $CryptoAmount = styled($Text)`
  color: ${(props) => props.theme.palette.grey};
  font-weight: 400;
`

const $CryptoWrapper = styled.div`
  @media ${Devices.laptop} {
    display: flex;
    column-gap: 8px;
  }
`

export const WalletCard = ({ tokenInformation, networkImage }: WalletCardProps): React.ReactElement => {
  const { formatFiatValue, formatTokenValue } = useFormatter()

  return (
    <$WalletCard>
      <$ImagesWrapper>
        <$NetworkImageWrapper>
          <Image src={networkImage} layout="fill" />
        </$NetworkImageWrapper>
        <$TokenImageWrapper>
          <Image src={tokenInformation.imageUrl} layout="fill" />
        </$TokenImageWrapper>
      </$ImagesWrapper>
      <$TextWrapper>
        <$Name>{tokenInformation.symbol}</$Name>
        <$H5>{formatFiatValue(+tokenInformation.balanceFiat.toFixed(2))}</$H5>
        <$CryptoWrapper>
          <$CryptoAmount>{formatTokenValue(+tokenInformation.balanceCrypto, 6)}</$CryptoAmount>
          <$CryptoAmount>{tokenInformation.symbol}</$CryptoAmount>
        </$CryptoWrapper>
      </$TextWrapper>
    </$WalletCard>
  )
}
