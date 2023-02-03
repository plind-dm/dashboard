export interface CryptoListingResponse {
  status: Status
  data?: DataEntity[] | null
}
export interface Status {
  timestamp: string
  error_code: number
  error_message?: null
  elapsed: number
  credit_count: number
  notice?: null
  total_count: number
}
export interface DataEntity {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags?: string[] | null
  max_supply: number
  circulating_supply: number
  total_supply: number
  platform?: null
  cmc_rank: number
  last_updated: string
  quote: Quote
}
export interface Quote {
  [key: string]: Currency
}
export interface Currency {
  price: number
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_60d: number
  percent_change_90d: number
  market_cap: number
  market_cap_dominance: number
  fully_diluted_market_cap: number
  last_updated: string
}

export interface TokenHistory {
  coingeckoId: string
  name: string
  symbol: string
  link: string
  marketCapRank: number
  circulatingSupply: number
  priceChange24h: number
  priceChangePercentage24h: number
  priceChangePercentage7d: number
  priceChangePercentage30d: number
  priceChangePercentage1y: number
  volume24h: {
    [key: string]: number
  }
  marketCap: {
    [key: string]: number
  }
  ath: HistoryData
  atl: HistoryData
  prices: Array<Array<number>>
}

interface HistoryData {
  date: {
    [key: string]: string
  }
  price: {
    [key: string]: number
  }
  percent: {
    [key: string]: number
  }
}

export interface TokenPrice {
  address: string
  decimals: number
  symbol: string
  price: number
}
