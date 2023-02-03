import { CustomDispatch } from '@caramelpoint/contuxt'
import { Product, Meta, ParsedCollection, Nft } from '../../types'
import { NftActionTypes } from './nft.actions.types'

export interface NftStore {
  products?: Product[]
  meta: Meta[]
  nftBalance: string
  collectedData?: string
  volume24HData?: string
  holdingsData?: string
  parsedCollections?: ParsedCollection[]
  currentCollection: ParsedCollection
  currentToken: Nft
}

export type NftDispatch = CustomDispatch<NftActionTypes, NftStore>
