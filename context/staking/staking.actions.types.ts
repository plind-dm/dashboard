import {
  AppMarketData,
  ApprovalState,
  StakedBalance,
  StakedBalancesByNetwork,
  StakedItem,
  StakingItem
} from '../../types'

export const SET_SUPPORTED_APPS = 'SET_SUPPORTED_APPS'
export const SET_STAKED_BALANCES = 'SET_STAKED_BALANCES'
export const SET_CURRENT_STAKING_ITEM = 'SET_CURRENT_STAKING_ITEM'
export const SET_APPROVAL_TRANSACTION_STATE = 'SET_APPROVAL_TRANSACTION_STATE'
export const SET_ALLOW_INFINITE = 'SET_ALLOW_INFINITE'
export const SET_SLIPPAGE_TOLERANCE = 'SET_SLIPPAGE_TOLERANCE'
export const SET_TX_HASH = 'SET_TX_HASH'
export const SET_STAKED_BALANCE_FIAT = 'SET_STAKED_BALANCE_FIAT'
export const SET_STAKED_POOLS = 'SET_STAKED_POOLS'
export const SET_LOADING_STAKED_BALANCE = 'SET_LOADING_STAKED_BALANCE'
export const RESET_STAKING = 'RESET_STAKING'

interface SetSupportedApps {
  type: typeof SET_SUPPORTED_APPS
  payload: Array<AppMarketData>
}
interface SetCurrentStakingItem {
  type: typeof SET_CURRENT_STAKING_ITEM
  payload: StakingItem | StakedItem
}
interface SetApprovalTransaction {
  type: typeof SET_APPROVAL_TRANSACTION_STATE
  payload: ApprovalState
}
interface SetStakedBalances {
  type: typeof SET_STAKED_BALANCES
  payload: Array<StakedBalance>
}
interface SetSlippageTolerance {
  type: typeof SET_SLIPPAGE_TOLERANCE
  payload: number
}
interface SetAllowInfinite {
  type: typeof SET_ALLOW_INFINITE
  payload: boolean
}

interface SetLoadingStakedBalance {
  type: typeof SET_LOADING_STAKED_BALANCE
  payload: boolean
}
interface SetTxHash {
  type: typeof SET_TX_HASH
  payload: string
}

interface SetStakedBalanceFiat {
  type: typeof SET_STAKED_BALANCE_FIAT
  payload: string
}

interface SetStakedPools {
  type: typeof SET_STAKED_POOLS
  payload: StakedBalancesByNetwork
}

interface ResetStaking {
  type: typeof RESET_STAKING
}

export type StakingActionTypes =
  | SetSupportedApps
  | SetStakedBalances
  | SetCurrentStakingItem
  | SetApprovalTransaction
  | SetSlippageTolerance
  | SetAllowInfinite
  | SetTxHash
  | SetStakedBalanceFiat
  | SetStakedPools
  | SetLoadingStakedBalance
  | ResetStaking
