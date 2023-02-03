import { ApprovalState } from './../../types/staking'
import {
  StakingActionTypes,
  SET_SUPPORTED_APPS,
  SET_STAKED_BALANCES,
  SET_CURRENT_STAKING_ITEM,
  SET_APPROVAL_TRANSACTION_STATE,
  SET_SLIPPAGE_TOLERANCE,
  SET_TX_HASH,
  SET_STAKED_BALANCE_FIAT,
  SET_STAKED_POOLS,
  SET_LOADING_STAKED_BALANCE,
  RESET_STAKING
} from './staking.actions.types'
import { StakingStore } from './staking.reducer.types'
import { StakingItem, StakingTypes } from '../../types'
import { SET_ALLOW_INFINITE } from '.'

export const initialStakingStore: StakingStore = {
  appsSupported: [],
  stakedBalances: [],
  currentStakingType: StakingTypes.POOL,
  currentStakingItem: {} as StakingItem,
  approvalTransactionState: {} as ApprovalState,
  slippageTolerance: 0.02,
  allowInfinite: false,
  txHash: '',
  stakedBalanceFiat: 'loading',
  loadingStakedBalance: true
}

export const stakingReducer = (state: StakingStore, action: StakingActionTypes): StakingStore => {
  switch (action.type) {
    case SET_SUPPORTED_APPS:
      return {
        ...state,
        appsSupported: action.payload
      }
    case SET_SLIPPAGE_TOLERANCE:
      return {
        ...state,
        slippageTolerance: action.payload
      }
    case SET_TX_HASH:
      return {
        ...state,
        txHash: action.payload
      }
    case SET_ALLOW_INFINITE:
      return {
        ...state,
        allowInfinite: action.payload
      }
    case SET_LOADING_STAKED_BALANCE:
      return {
        ...state,
        loadingStakedBalance: action.payload
      }
    case SET_APPROVAL_TRANSACTION_STATE:
      return {
        ...state,
        approvalTransactionState: action.payload
      }
    case SET_CURRENT_STAKING_ITEM:
      return {
        ...state,
        currentStakingItem: action.payload
      }
    case SET_STAKED_BALANCES:
      return {
        ...state,
        stakedBalances: action.payload
      }
    case SET_STAKED_BALANCE_FIAT:
      return {
        ...state,
        stakedBalanceFiat: action.payload
      }
    case SET_STAKED_POOLS:
      return {
        ...state,
        stakedPools: action.payload
      }
    case RESET_STAKING:
      return {
        ...initialStakingStore
      }
    default: {
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
    }
  }
}
