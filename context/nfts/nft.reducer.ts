import { ParsedCollection, Nft } from '../../types'
import {
  NftActionTypes,
  SET_NFT_STATE,
  SET_CURRENT_COLLECTION,
  SET_CURRENT_TOKEN,
  SET_NFT_BALANCE,
  SET_SUMMARY_DATA,
  SET_PARSED_NFTS,
  RESET_NFT
} from './nft.actions.types'
import { NftStore } from './nft.reducer.types'

export const initialNftStore: NftStore = {
  meta: [],
  nftBalance: 'loading',
  currentCollection: {} as ParsedCollection,
  currentToken: {} as Nft
}

export const nftReducer = (state: NftStore, action: NftActionTypes): NftStore => {
  switch (action.type) {
    case SET_NFT_STATE:
      return {
        ...state,
        ...action.payload
      }
    case SET_CURRENT_COLLECTION:
      return {
        ...state,
        currentCollection: action.payload
      }
    case SET_CURRENT_TOKEN:
      return {
        ...state,
        currentToken: action.payload
      }
    case SET_NFT_BALANCE:
      return {
        ...state,
        nftBalance: action.payload
      }
    case SET_SUMMARY_DATA:
      return {
        ...state,
        collectedData: action.payload.collectedData,
        volume24HData: action.payload.volume24HData,
        holdingsData: action.payload.holdingsData
      }
    case SET_PARSED_NFTS:
      return {
        ...state,
        parsedCollections: action.payload
      }
    case RESET_NFT:
      return {
        ...initialNftStore
      }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
