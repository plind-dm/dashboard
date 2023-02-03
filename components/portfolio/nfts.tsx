import styled from 'styled-components'
import Image from 'next/image'
import { $Text, EmptyCard, UnderMaintenanceCard } from '../uiKit'
import { Devices } from '../../styles/constants/devices'
import {
  useNftState,
  useNftDispatch,
  getSummaryData,
  getParsedCollections,
  setCurrentCollection
} from '../../context/nfts'
import { useBalanceState } from '../../context/balances'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import noAssetImage from '../../public/images/no-assets.svg'
import { NativeTokens, ParsedCollection, Routes } from '../../types'
import EthSymbol from '../../public/images/nft-eth.svg'
import { useFormatter } from '../../hooks/useFormatter'
import { useTokenState } from '../../context/token'
import { config } from '../../config/env.config'
import { Loader } from '../uiKit/loader'

const $NFTContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 16px;
  .not-in-mobile {
    display: none;
    @media ${Devices.laptop} {
      display: inherit;
    }
  }
  @media ${Devices.laptop} {
    padding: 0 24px;
  }
`

const $NFTSummarySection = styled.div`
  display: flex;
  padding: 16px;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  justify-content: space-between;
  @media ${Devices.laptop} {
    padding: 24px 56px;
  }
`

const $Data = styled($Text)`
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${(props) => props.theme.palette.greyV4};
  > span {
    margin-right: 2px !important;
  }
`

const $NFTSummaryData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  row-gap: 5px;
  @media ${Devices.laptop} {
    row-gap: 24px;
  }
`

const $NFTCollectionsTable = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.defaultGrey};
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  border-radius: 8px;
  .last-one {
    border: none;
    :hover {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .first-one {
    :hover {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
`

const $NftTableElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.paleGrey};
  padding: 16px 11.5px;
  column-gap: 12px;
  width: 100%;
  @media ${Devices.laptop} {
    padding: 24px 40px;
  }

  :hover {
    background-color: ${(props) => props.theme.palette.hover};
    cursor: pointer;
  }
`

const $ImageContainer = styled.div`
  position: relative;
  min-height: 50px;
  min-width: 50px;
  img {
    border-radius: 50%;
  }
`

const $NftCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
`

const $ImageAndNameContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  width: 100%;
  max-width: 100px;
  @media ${Devices.mobileM} {
    max-width: 150px;
    column-gap: 16px;
  }
  @media ${Devices.tablet} {
    max-width: 250px;
    column-gap: 32px;
  }
  @media ${Devices.laptop} {
    max-width: 300px;
    column-gap: 32px;
  }
`

const $TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const $Title = styled($Text)`
  font-size: 16px;
`

const $SummaryTitle = styled($Text)`
  font-size: 16px;
  font-weight: 700;
  @media ${Devices.laptop} {
    font-size: 24px;
    font-weight: 900;
  }
`

const $SummaryData = styled($Data)`
  font-weight: 400;
  font-size: 14px;
  max-width: 150px;
  @media ${Devices.laptop} {
    font-size: 20px;
  }
`

const $SocialLinks = styled($Data)`
  max-width: 180px;
  align-self: flex-start;
`

const $NftName = styled($Title)`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const NFTS = (): React.ReactElement => {
  const { products, parsedCollections, collectedData, volume24HData, holdingsData } = useNftState()
  const { formatFiatValue, formatBigNumbers, formatTokenValue } = useFormatter()
  const { currentCurrency, currentCurrencySymbol, fiatRates } = useBalanceState()
  const [ethPrice, setEthPrice] = useState<number>(1)
  const { prices } = useTokenState()
  const dispatch = useNftDispatch()
  const router = useRouter()

  const onCollectionClick = (collection: ParsedCollection): void => {
    dispatch(setCurrentCollection(collection))
    router.push(Routes.COLLECTION)
  }

  useEffect(() => {
    const nativeToken = prices.find((token) => token.symbol === NativeTokens.ethereum)
    setEthPrice(nativeToken?.price || 1)
  }, [prices])

  useEffect(() => {
    if (fiatRates && products) dispatch(getSummaryData(products, currentCurrency, currentCurrencySymbol, fiatRates))
    if (fiatRates && products) dispatch(getParsedCollections())
  }, [products, currentCurrency, currentCurrencySymbol, fiatRates])

  if (config.site.underMaintenanceMood) {
    return <UnderMaintenanceCard />
  }
  return (
    <>
      <$NFTContainer>
        {products && products.length > 0 && collectedData && volume24HData && holdingsData && (
          <>
            <$NFTSummarySection>
              <$NFTSummaryData>
                <$SummaryTitle>{'Collected'}</$SummaryTitle>
                <$SummaryData>{collectedData}</$SummaryData>
              </$NFTSummaryData>
              <$NFTSummaryData>
                <$SummaryTitle>{'24H Volume'}</$SummaryTitle>
                <$SummaryData>{`${formatBigNumbers(formatFiatValue(+volume24HData))}`}</$SummaryData>
              </$NFTSummaryData>
              <$NFTSummaryData>
                <$SummaryTitle>{'Holdings'}</$SummaryTitle>
                <$SummaryData>{`${formatBigNumbers(formatFiatValue(+holdingsData))}`}</$SummaryData>
              </$NFTSummaryData>
            </$NFTSummarySection>
            <$NFTCollectionsTable>
              {parsedCollections &&
                parsedCollections.map((collection, index) => {
                  return (
                    <$NftTableElement
                      onClick={() => onCollectionClick(collection)}
                      key={collection.collectionName}
                      className={index === parsedCollections.length - 1 ? 'last-one' : index === 0 ? 'first-one' : ''}
                    >
                      <$ImageAndNameContainer>
                        <$ImageContainer>
                          <Image src={collection.collectionImage} layout="fill" />
                        </$ImageContainer>
                        <$TextContainer>
                          <$NftName>{collection.collectionName}</$NftName>
                          <$SocialLinks className="not-in-mobile">
                            {collection.socialNetworks.discord ? (
                              <a href={collection.socialNetworks.discord} target="_blank" rel="noreferrer">
                                Discord
                              </a>
                            ) : (
                              ''
                            )}
                            {collection.socialNetworks.discord && collection.socialNetworks.twitter && ` | `}
                            {collection.socialNetworks.twitter ? (
                              <a
                                href={`https://www.twitter.com/${collection.socialNetworks.twitter}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Twitter
                              </a>
                            ) : (
                              ''
                            )}
                            {(collection.socialNetworks.discord || collection.socialNetworks.twitter) &&
                              collection.socialNetworks.website &&
                              ` | `}
                            {collection.socialNetworks.website ? (
                              <a href={collection.socialNetworks.website} target="_blank" rel="noreferrer">
                                Website
                              </a>
                            ) : (
                              ''
                            )}
                          </$SocialLinks>
                        </$TextContainer>
                      </$ImageAndNameContainer>
                      <$NftCell>
                        <$Title>Collected</$Title>
                        <$Data>{collection.itemsAmount}</$Data>
                      </$NftCell>
                      <$NftCell className="not-in-mobile">
                        <$Title>Floor</$Title>
                        <$Data>
                          <Image src={EthSymbol} layout="fixed" height={`12px`} width={`12px`} />
                          {parseFloat(collection.floorPrice).toFixed(3)}
                        </$Data>
                      </$NftCell>
                      <$NftCell className="not-in-mobile">
                        <$Title>24H Volume</$Title>
                        <$Data>
                          <Image src={EthSymbol} layout="fixed" height={`12px`} width={`12px`} />
                          {collection.volume24h}
                        </$Data>
                      </$NftCell>
                      <$NftCell>
                        <$Title>Holdings</$Title>
                        <$Data>
                          <Image src={EthSymbol} layout="fixed" height={`12px`} width={`12px`} />
                          {`${formatTokenValue(+collection.balance / ethPrice, 2).toUpperCase()}`}
                        </$Data>
                      </$NftCell>
                    </$NftTableElement>
                  )
                })}
            </$NFTCollectionsTable>
          </>
        )}
        {products?.length === 0 && (
          <EmptyCard image={noAssetImage} text="No items found">
            {`You haven’t gotten any NFT yet.`}
          </EmptyCard>
        )}
      </$NFTContainer>
      {!products && <Loader />}
    </>
  )
}
