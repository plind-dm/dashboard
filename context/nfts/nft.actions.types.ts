import { ParsedCollection, SummaryState, Nft } from '../../types'
import { NftStore } from './nft.reducer.types'

export const SET_NFT_STATE = 'SET_NFT_STATE'
export const SET_CURRENT_COLLECTION = 'SET_CURRENT_COLLECTION'
export const SET_NFT_BALANCE = 'SET_NFT_BALANCE'
export const SET_SUMMARY_DATA = 'SET_SUMMARY_DATA'
export const SET_PARSED_NFTS = 'SET_PARSED_NFTS'
export const SET_CURRENT_TOKEN = 'SET_CURRENT_TOKEN'
export const RESET_NFT = 'RESET_NFT'

interface SetNftState {
  type: typeof SET_NFT_STATE
  payload: NftStore
}
interface SetCurrentCollection {
  type: typeof SET_CURRENT_COLLECTION
  payload: ParsedCollection
}

interface SetNftBalance {
  type: typeof SET_NFT_BALANCE
  payload: string
}

interface SetSummaryData {
  type: typeof SET_SUMMARY_DATA
  payload: SummaryState
}

interface SetParseNfts {
  type: typeof SET_PARSED_NFTS
  payload: ParsedCollection[]
}

interface SetCurrentToken {
  type: typeof SET_CURRENT_TOKEN
  payload: Nft
}
interface ResetNft {
  type: typeof RESET_NFT
}

export type NftActionTypes =
  | SetNftState
  | SetCurrentCollection
  | SetNftBalance
  | SetSummaryData
  | SetParseNfts
  | SetCurrentToken
  | ResetNft
