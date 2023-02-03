import {
  NftActionTypes,
  SET_NFT_STATE,
  SET_CURRENT_COLLECTION,
  SET_NFT_BALANCE,
  SET_SUMMARY_DATA,
  SET_PARSED_NFTS,
  SET_CURRENT_TOKEN,
  RESET_NFT
} from './nft.actions.types'
import { NftDispatch, NftStore } from './nft.reducer.types'
import axios from 'axios'
import { Product, SummaryState, ParsedCollection, Nft } from '../../types'
import { fiatCurrencies, fiatCurrenciesSymbols, FiatRates, NetworksState } from '../balances'

export const getCurrentToken = (payload: Nft): NftActionTypes => {
  return {
    type: SET_CURRENT_TOKEN,
    payload
  }
}

export const setNftState = (nftState: NftStore): NftActionTypes => {
  return { type: SET_NFT_STATE, payload: nftState }
}

export const getNfts = (address: string) => async (dispatch: NftDispatch) => {
  try {
    const result = await axios.get('/api/nft-balances', { params: { address } })
    dispatch(setNftState(result.data as NftStore))
  } catch (error) {
    console.log(error)
  }
}

export const setNftBalance = (payload: string): NftActionTypes => {
  return { type: SET_NFT_BALANCE, payload }
}

export const setCurrentCollection = (currentCollection: ParsedCollection): NftActionTypes => {
  return { type: SET_CURRENT_COLLECTION, payload: currentCollection }
}

export const setSummaryData = (payload: SummaryState): NftActionTypes => {
  return { type: SET_SUMMARY_DATA, payload }
}

export const setParsedCollections = (payload: ParsedCollection[]): NftActionTypes => {
  return { type: SET_PARSED_NFTS, payload }
}

export const getNftBalance =
  (nftCollection: Product[], fiatRates: FiatRates, currentCurrency: fiatCurrencies, networks: NetworksState) =>
  async (dispatch: NftDispatch) => {
    let value = 0
    if (nftCollection && nftCollection[0]?.assets)
      value = nftCollection[0]?.assets
        ?.filter((nft) => networks[nft.network.split('-')[0].toUpperCase()])
        .map((nft) => nft.balanceUSD)
        .reduce((previous, current) => previous + current, 0)
    fiatRates ? (value = value * fiatRates[currentCurrency]) : value
    dispatch(setNftBalance(value.toFixed(2)))
  }

export const getSummaryData =
  (
    payload: Product[],
    currentCurrency: fiatCurrencies,
    currentCurrencySymbol: fiatCurrenciesSymbols,
    fiatRates: FiatRates
  ) =>
  (dispatch: NftDispatch) => {
    let getCollectedData
    let get24HData
    let getHoldingsData
    if (payload) {
      getCollectedData = '0.00'
      get24HData = '0.00'
      getHoldingsData = '0.00'
    }
    if (payload[0] && payload[0].assets) {
      getCollectedData = `
      ${payload[0].assets
        .map((asset) => parseInt(asset.balanceRaw))
        .reduce((previous, current) => previous + current, 0)}`
      get24HData = `${(
        payload[0].assets
          .map((asset) => asset.collection.volume24hUSD)
          .reduce((previous, current) => previous + current, 0) * fiatRates[currentCurrency]
      ).toFixed(2)}`
      getHoldingsData = `${(
        payload[0].assets.map((asset) => asset.balanceUSD).reduce((previous, current) => previous + current, 0) *
        fiatRates[currentCurrency]
      ).toFixed(2)}`
    }
    if (getCollectedData && get24HData && getHoldingsData) {
      dispatch(
        setSummaryData({
          collectedData: getCollectedData,
          volume24HData: get24HData,
          holdingsData: getHoldingsData
        })
      )
    }
  }

export const getParsedCollections = () => (dispatch: NftDispatch, state: NftStore) => {
  if (state.products && state.products[0] && state.products[0].assets) {
    const payload = state.products[0].assets.map((collection) => {
      const floorPrice = `${collection?.collection?.floorPrice || `0.00`}`
      const volume24h = `${collection?.collection?.volume24h.toFixed(2) || '0.00'}`
      const balance = `${collection?.balanceUSD || `0.00`}`
      const itemsAmount = `${collection?.balance}`
      const collectionName = `${collection?.collectionName}`
      const socialNetworks = collection?.collection?.socials
      const collectionImage = `${collection?.collection?.imgProfile || '/images/collection-image-not-found.svg'}`
      return {
        address: collection.address,
        floorPrice,
        volume24h,
        balance,
        itemsAmount,
        collectionName,
        socialNetworks,
        collectionImage,
        nfts: collection.assets
      }
    })
    payload.sort((a, b) => {
      if (parseFloat(a.balance) > parseFloat(b.balance)) return -1
      if (parseFloat(a.balance) < parseFloat(b.balance)) return 1
      return 0
    })
    dispatch(setParsedCollections(payload))
  }
}

export const setCurrentToken = (payload: Nft) => (dispatch: NftDispatch) => {
  dispatch(getCurrentToken(payload))
}

export const resetNft = (): NftActionTypes => {
  return { type: RESET_NFT }
}
