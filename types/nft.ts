export interface Meta {
  label: string
  value: number
  type: string
}

export interface Product {
  label: string
  assets: ProductAsset[]
  meta: [
    {
      label: string
      value: string | undefined
      type: string
    }
  ]
}

export interface ProductAsset {
  type: string
  category: string
  network: string
  address: string
  symbol: string
  decimals: number
  price: null
  balance: number
  balanceUSD: number
  balanceRaw: string
  shouldDisplay: boolean
  collectionId: string
  collectionName: string
  collectionHidden: boolean
  collectionImg: string
  collection: Collection
  assets: Nft[]
}

export interface Nft {
  tokenId: string
  balance: number
  assetImg: string
  balanceUSD: number
  assetName: string
}

export interface Collection {
  id: string
  name: string
  hidden: boolean
  img: string
  imgBanner: string
  imgProfile: string
  imgFeatured: string
  description: string
  socials: {
    discord: string
    twitter: string
    website: string
  }
  floorPrice: number
  floorPriceUSD: number
  owners: number
  items: number
  volume24h: number
  volume24hUSD: number
}

export interface SummaryState {
  collectedData: string
  volume24HData: string
  holdingsData: string
}

export interface ParsedCollection {
  address: string
  floorPrice: string
  volume24h: string
  balance: string
  itemsAmount: string
  collectionName: string
  socialNetworks: { [key: string]: string }
  collectionImage: string
  nfts: Nft[]
}
