//------- Shared
export interface MetaEntity {
  label: string
  value: number
  type: string
}

//------- TOKEN BALANCE
export interface TokenBalance {
  products?: TokenEntity[]
  meta?: MetaEntity[]
}
export interface TokenEntity {
  label: string
  assets?: TokenAssetsEntity[] | null
  meta?: null[] | null
}
export interface TokenAssetsEntity {
  type: string
  category: string
  network: string
  address: string
  symbol: string
  decimals: number
  label: string
  img: string
  hide: boolean
  canExchange: boolean
  price: number
  balance: number
  balanceRaw: string
  balanceUSD: number
}

//------- NFT BALANCE

export interface NftBalance {
  products?: NftEntity[] | null
  meta?: MetaEntity[] | null
}
export interface NftEntity {
  label: string
  assets?: NftAssetsEntity[] | null
  meta?: null[] | null
}
export interface NftAssetsEntity {
  type: string
  category: string
  network: string
  address: string
  symbol: string
  decimals: number
  price?: null
  balance: number
  balanceUSD: number
  balanceRaw: string
  shouldDisplay: boolean
  collectionId: string
  collectionName: string
  collectionHidden: boolean
  collectionImg: string
  collection: Collection
  assets?: AssetsEntity[] | null
}
export interface Collection {
  id: string
  name: string
  hidden: boolean
  img: string
  floorPrice: number
  floorPriceUSD: number
  owners: number
  items: number
  volume24h: number
  volume24hUSD: number
}
export interface AssetsEntity {
  tokenId: string
  balance: number
  assetImg: string
  balanceUSD: number
  assetName: string
}

//------- FIAT RATES

export interface FiatRates {
  AED: number
  AFN: number
  ALL: number
  AMD: number
  ANG: number
  AOA: number
  ARS: number
  AUD: number
  AWG: number
  AZN: number
  BAM: number
  BBD: number
  BDT: number
  BGN: number
  BHD: number
  BIF: number
  BMD: number
  BND: number
  BOB: number
  BRL: number
  BSD: number
  BTC: number
  BTN: number
  BWP: number
  BYN: number
  BZD: number
  CAD: number
  CDF: number
  CHF: number
  CLF: number
  CLP: number
  CNH: number
  CNY: number
  COP: number
  CRC: number
  CUC: number
  CUP: number
  CVE: number
  CZK: number
  DJF: number
  DKK: number
  DOP: number
  DZD: number
  EGP: number
  ERN: number
  ETB: number
  EUR: number
  FJD: number
  FKP: number
  GBP: number
  GEL: number
  GGP: number
  GHS: number
  GIP: number
  GMD: number
  GNF: number
  GTQ: number
  GYD: number
  HKD: number
  HNL: number
  HRK: number
  HTG: number
  HUF: number
  IDR: number
  ILS: number
  IMP: number
  INR: number
  IQD: number
  IRR: number
  ISK: number
  JEP: number
  JMD: number
  JOD: number
  JPY: number
  KES: number
  KGS: number
  KHR: number
  KMF: number
  KPW: number
  KRW: number
  KWD: number
  KYD: number
  KZT: number
  LAK: number
  LBP: number
  LKR: number
  LRD: number
  LSL: number
  LYD: number
  MAD: number
  MDL: number
  MGA: number
  MKD: number
  MMK: number
  MNT: number
  MOP: number
  MRO: number
  MRU: number
  MUR: number
  MVR: number
  MWK: number
  MXN: number
  MYR: number
  MZN: number
  NAD: number
  NGN: number
  NIO: number
  NOK: number
  NPR: number
  NZD: number
  OMR: number
  PAB: number
  PEN: number
  PGK: number
  PHP: number
  PKR: number
  PLN: number
  PYG: number
  QAR: number
  RON: number
  RSD: number
  RUB: number
  RWF: number
  SAR: number
  SBD: number
  SCR: number
  SDG: number
  SEK: number
  SGD: number
  SHP: number
  SLL: number
  SOS: number
  SRD: number
  SSP: number
  STD: number
  STN: number
  SVC: number
  SYP: number
  SZL: number
  THB: number
  TJS: number
  TMT: number
  TND: number
  TOP: number
  TRY: number
  TTD: number
  TWD: number
  TZS: number
  UAH: number
  UGX: number
  USD: number
  UYU: number
  UZS: number
  VES: number
  VND: number
  VUV: number
  WST: number
  XAF: number
  XAG: number
  XAU: number
  XCD: number
  XDR: number
  XOF: number
  XPD: number
  XPF: number
  XPT: number
  YER: number
  ZAR: number
  ZMW: number
  ZWL: number
  ETH: number
  BNB: number
  MATIC: number
  FTM: number
}
