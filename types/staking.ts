import { Networks } from '.'

export enum StakingTypes {
  BASE = 'base',
  CLAIMABLE = 'claimable',
  COLLATERAL = 'collateral',
  INSURANCE = 'insurance',
  'INTEREST-BEARING' = 'interest-bearing',
  'LEVERAGED-POSITION' = 'leveraged-position',
  NFT = 'nft',
  OPTION = 'option',
  POOL = 'pool',
  VAULT = 'vault'
}

export interface AppMarketData {
  network: string
  app: string
  stakingItems: Array<StakingItem>
}

export interface StakingToken {
  appImageUrl: string
  type: string
  network: string
  symbol: string
  address: string
  price: number
  decimals: number
  reserve: number
  weight: number
  tokenImageUrl: string
  tokens?: StakingToken[]
}

export interface AppsByNetwork {
  network: string
  appIds: Array<string>
}

export interface ApprovalStateParams {
  type: StakingTypes
  appId: string
  ownerAddress: string
  sellTokenAddress: string
  amount: string
  network: Networks
}

export interface ApprovalTransactionParams {
  type: StakingTypes
  appId: string
  ownerAddress: string
  sellTokenAddress: string
  amount: string
  network: Networks
  gasPrice: string
  allowInfinite?: boolean
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
}

export interface TransactionParams {
  type: StakingTypes
  appId: string
  ownerAddress: string
  sellTokenAddress: string
  sellAmount: string
  poolAddress: string
  payoutTokenAddress: string
  toTokenAddress: string
  slippagePercentage: number
  network: Networks
  gasPrice: string
  affiliateAddress?: boolean
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
}
export interface ApprovalState {
  spenderAddress: string
  tokenAddress: string
  ownerAddress: string
  allowance: string
  amount: string
  isApproved: boolean
}
export interface ApprovalTransaction {
  gasPrice: string
  from: string
  to: string
  data: string
}

export interface StakingTransaction {
  gasPrice: string
  maxFeePerGas: string
  maxPriorityFeePerGas: string
  from: string
  to: string
  value: string
  gas: string
  data: string
}

interface TransactionRequest {
  type: StakingTypes
  appId: string
  ownerAddress: string
  sellTokenAddress: string
  sellAmount: string
  poolAddress: string
  slippagePercentage: number
  network: Networks
  affiliateAddress?: boolean
  allowInfinite?: boolean
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
}

export interface StakingTransactionParams extends TransactionRequest {
  payoutTokenAddress: string
}
export interface TransactionNotification {
  onTxSuccess: (txHash: string) => void
  onTxError: () => void
  onTxLoading: (txHash: string) => void
  onTxFinished: () => void
}

export interface WithdrawTransactionParams {
  type: StakingTypes
  appId: string
  ownerAddress: string
  sellAmount: string
  poolAddress: string
  slippagePercentage: number
  network: Networks
  affiliateAddress?: boolean
  allowInfinite?: boolean
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
  toTokenAddress: string
  gasPrice: string
  inWei?: boolean
}

export interface WithdrawApprovalStateParams {
  type: StakingTypes
  appId: string
  ownerAddress: string
  sellTokenAddress: string
  amount: string
  network: Networks
}

export interface GasPrice {
  standard: number | GasPriceItem
  fast: number | GasPriceItem
  instant: number | GasPriceItem
}

export interface GasPriceItem {
  baseFeePerGas: number
  maxPriorityFeePerGas: number
  maxFeePerGas: number
}
export interface StakedBalance {
  products: StakedProduct[]
  meta: StakedItemMeta[]
}

export interface StakedItemMeta {
  label: string
  value: number
  type: string
}

export interface StakedProduct {
  label: string
  assets: StakedAsset[]
}

export interface StakedAsset {
  type: string
  balanceUSD: number
  appID: string
  tokens: StakedItem[]
  appName: string
  img: string
  appImageUrl: string
}

export interface StakedItem {
  type: string
  category: string
  network: string
  address: string
  decimals: number
  symbol: string
  label: string
  appId: string
  liquidity: number
  supply: number
  price: number
  fee: number
  volume: number
  volumeChangePercentage: number
  tokens: Array<StakedToken>
  isBlocked: boolean
  balance: number
  balanceRaw: string
  balanceUSD: number
  share: number
  tokenImageURL: boolean
  appName: string
  img: string
  appImageUrl: string
}

export interface StakingItem {
  type: string
  category: string
  network: string
  address: string
  label: string
  symbol: string
  decimals: number
  appId: string
  supply: number
  price: number
  volume: number
  fee: number
  liquidity: number
  tokens: Array<StakingToken>
  appName: string
  appImageUrl: string
  img: string
  protocolDisplay: string
}

export interface StakedToken {
  type: string
  network: string
  address: string
  decimals: number
  symbol: string
  price: number
  reserve: number
  balance: number
  balanceRaw: string
  balanceUSD: number
  tokenImageUrl: string
  tokens?: StakingToken[]
}

export interface StakedBalancesByNetwork {
  [key: string]: StakedBalance[]
}
