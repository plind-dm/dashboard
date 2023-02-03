import styled from 'styled-components'
import Image from 'next/image'
import { Devices } from '../../styles/constants/devices'
import noAssetImage from '../../public/images/no-assets.svg'
import { useNftState } from '../../context/nfts'
import { $H5, $Text, ChildPageContainer, EmptyCard } from '../uiKit'
import { NftsGrid } from '.'
import { BackArrow } from '../uiKit'
import { useBalanceState } from '../../context/balances'
import EthSymbol from '../../public/images/nft-eth.svg'
import { useFormatter } from '../../hooks/useFormatter'
import { useEffect, useState } from 'react'
import { useTokenState } from '../../context/token'
import { NativeTokens, Routes, Tabs } from '../../types'

const $CollectionCard = styled.div`
  background: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  @media ${Devices.laptop} {
    padding: 48px 0 24px 0;
  }
`

const $CollectionOverviewCard = styled.div`
  background: #2f2b38;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  max-width: 446px;
  @media ${Devices.laptop} {
    margin-top: 24px;
  }
`

const $Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
`

const $CollectionImage = styled.div`
  position: relative;
  height: 75px;
  width: 75px;
  img {
    border-radius: 50%;
  }
  @media ${Devices.laptop} {
    height: 156px;
    width: 156px;
  }
`

const $SocialLinksContainer = styled.div``

const $GreyText = styled.span`
  color: ${(props) => props.theme.palette.greyV4};
`

const $SocialLink = styled.a`
  color: ${(props) => props.theme.palette.greyV4};
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
`

const $CollectionProperty = styled($Text)`
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.25rem;
  @media ${Devices.laptop} {
    font-size: 1rem;
    line-height: 1.375rem;
  }
`

const $CollectionPropertyValue = styled($Text)`
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${(props) => props.theme.palette.greyV4};
`

export const Collection = (): React.ReactElement => {
  const { currentCollection } = useNftState()
  const { fiatRates } = useBalanceState()
  const { formatFiatValue, formatBigNumbers, formatTokenValue } = useFormatter()
  const [ethPrice, setEthPrice] = useState<number>(1)
  const { prices } = useTokenState()

  useEffect(() => {
    const nativeToken = prices.find((token) => token.symbol === NativeTokens.ethereum)
    setEthPrice(nativeToken?.price || 1)
  }, [prices])

  return (
    <ChildPageContainer>
      <BackArrow redirectTo={`${Routes.PORTFOLIO}?tab=${Tabs.NFTS}`} />
      {Object.keys(currentCollection).length === 0 ? (
        <EmptyCard image={noAssetImage} text="Collection not found">
          {`You haven’t gotten any collection.`}
        </EmptyCard>
      ) : (
        <>
          <$CollectionCard>
            <$CollectionImage>
              <Image src={currentCollection.collectionImage} layout="fill" />
            </$CollectionImage>
            <$Column>
              <$H5>{currentCollection.collectionName}</$H5>
              <$SocialLinksContainer>
                {currentCollection.socialNetworks.discord ? (
                  <$SocialLink target="_blank" rel="noreferrer" href={currentCollection.socialNetworks.discord}>
                    Discord
                  </$SocialLink>
                ) : (
                  ''
                )}
                {currentCollection.socialNetworks.discord && currentCollection.socialNetworks.twitter && (
                  <$GreyText>{' | '} </$GreyText>
                )}
                {currentCollection.socialNetworks.twitter ? (
                  <$SocialLink target="_blank" rel="noreferrer" href={currentCollection.socialNetworks.twitter}>
                    Twitter
                  </$SocialLink>
                ) : (
                  ''
                )}
                {(currentCollection.socialNetworks.discord || currentCollection.socialNetworks.twitter) &&
                  currentCollection.socialNetworks.website && <$GreyText>{' | '} </$GreyText>}
                {currentCollection.socialNetworks.website ? (
                  <$SocialLink target="_blank" rel="noreferrer" href={currentCollection.socialNetworks.website}>
                    Website
                  </$SocialLink>
                ) : (
                  ''
                )}
              </$SocialLinksContainer>
            </$Column>
            <$CollectionOverviewCard>
              <$Column>
                <$CollectionProperty>{'Collected'}</$CollectionProperty>
                <$CollectionPropertyValue>{currentCollection.itemsAmount}</$CollectionPropertyValue>
              </$Column>
              <$Column>
                <$CollectionProperty>{'24H Volume'}</$CollectionProperty>
                <$CollectionPropertyValue>{`${formatBigNumbers(
                  formatFiatValue(+currentCollection.volume24h)
                )}`}</$CollectionPropertyValue>
              </$Column>
              <$Column>
                <$CollectionProperty>{'Holdings'}</$CollectionProperty>
                {fiatRates && (
                  <$CollectionPropertyValue>
                    <Image src={EthSymbol} layout="fixed" height={`12px`} width={`12px`} />
                    {`${formatTokenValue(+currentCollection.balance / ethPrice, 2).toUpperCase()}`}
                  </$CollectionPropertyValue>
                )}
              </$Column>
            </$CollectionOverviewCard>
          </$CollectionCard>
          <NftsGrid />
        </>
      )}
    </ChildPageContainer>
  )
}
