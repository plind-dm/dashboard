import { CustomDispatch } from '@caramelpoint/contuxt'
import {
  AppMarketData,
  ApprovalState,
  StakedBalance,
  StakedBalancesByNetwork,
  StakedItem,
  StakingItem,
  StakingTypes
} from '../../types'
import { StakingActionTypes } from './staking.actions.types'

export interface StakingStore {
  appsSupported: Array<AppMarketData>
  currentStakingType: StakingTypes
  stakedBalances: Array<StakedBalance>
  currentStakingItem: StakingItem | StakedItem
  approvalTransactionState: ApprovalState
  slippageTolerance: number
  allowInfinite: boolean
  txHash: string
  stakedBalanceFiat: string
  stakedPools?: StakedBalancesByNetwork
  loadingStakedBalance: boolean
}

export type StakingDispatch = CustomDispatch<StakingActionTypes, StakingStore>
