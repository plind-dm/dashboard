import {
  StakingActionTypes,
  SET_SUPPORTED_APPS,
  SET_STAKED_BALANCES,
  SET_CURRENT_STAKING_ITEM,
  SET_APPROVAL_TRANSACTION_STATE,
  SET_ALLOW_INFINITE,
  SET_SLIPPAGE_TOLERANCE,
  SET_TX_HASH,
  SET_STAKED_BALANCE_FIAT,
  SET_STAKED_POOLS,
  SET_LOADING_STAKED_BALANCE,
  RESET_STAKING
} from './staking.actions.types'
import { StakingDispatch, StakingStore } from './staking.reducer.types'
import axios from 'axios'
import {
  AppMarketData,
  AppsByNetwork,
  Networks,
  StakingItem,
  StakingTransactionParams,
  WithdrawTransactionParams,
  StakingTransaction,
  GasPrice,
  StakedBalance,
  WithdrawApprovalStateParams,
  ApprovalState,
  ApprovalTransactionParams,
  ApprovalTransaction,
  TransactionNotification,
  StakedItem,
  StakedBalancesByNetwork
} from '../../types'
import { sendTransaction, toWei } from '../../api-services/web3.service'
import { fiatCurrencies, FiatRates, NetworksState } from '../balances'

export const setStakedPools = (stakedPools: StakedBalancesByNetwork): StakingActionTypes => {
  return { type: SET_STAKED_POOLS, payload: stakedPools }
}

export const setAllowInfinite = (value: boolean): StakingActionTypes => {
  return { type: SET_ALLOW_INFINITE, payload: value }
}

export const setLoadingStakedBalance = (value: boolean): StakingActionTypes => {
  return { type: SET_LOADING_STAKED_BALANCE, payload: value }
}

export const setTxHash = (value: string): StakingActionTypes => {
  return { type: SET_TX_HASH, payload: value }
}

export const setSlippageTolerance = (value: number): StakingActionTypes => {
  return { type: SET_SLIPPAGE_TOLERANCE, payload: value }
}

export const setSupportedApps = (appsMarketData: Array<AppMarketData>): StakingActionTypes => {
  return { type: SET_SUPPORTED_APPS, payload: appsMarketData }
}

export const setStakedBalances = (stakedBalances: Array<StakedBalance>): StakingActionTypes => {
  return { type: SET_STAKED_BALANCES, payload: stakedBalances }
}

export const setCurrentStakingItem = (stakingItem: StakingItem | StakedItem): StakingActionTypes => {
  return { type: SET_CURRENT_STAKING_ITEM, payload: stakingItem }
}

export const setApprovalTransaction = (approvalTransactionState: ApprovalState): StakingActionTypes => {
  return { type: SET_APPROVAL_TRANSACTION_STATE, payload: approvalTransactionState }
}

export const setStakedBalanceFiat = (payload: string): StakingActionTypes => {
  return { type: SET_STAKED_BALANCE_FIAT, payload }
}

const _getMarketDataByNetwork = async (
  appsByNetwork: Array<AppsByNetwork>,
  stakingType: string,
  currentNetwork: Networks
): Promise<Array<AppMarketData>> => {
  const appsMarketData: Array<AppMarketData> = [] as Array<AppMarketData>
  for (const app of appsByNetwork) {
    if (currentNetwork.toUpperCase() === app.network.toUpperCase()) {
      for (const appId of app.appIds) {
        const result = await axios.get('/api/app-market-data', {
          params: { appId: appId, stakingType, network: app.network }
        })
        appsMarketData.push({
          network: app.network,
          app: appId,
          stakingItems: result.data as Array<StakingItem>
        })
      }
    }
  }
  return appsMarketData
}

const _getStakingBalanceByNetworkAndAppId = async (
  appsByNetwork: Array<AppsByNetwork>,
  currentNetwork: Networks,
  walletAddress: string
): Promise<Array<StakedBalance>> => {
  const stakedBalances: Array<StakedBalance> = [] as Array<StakedBalance>
  for (const app of appsByNetwork) {
    if (currentNetwork.toUpperCase() === app.network.toUpperCase()) {
      for (const appId of app.appIds) {
        const result = await axios.get('/api/staking-balance', {
          params: { appId: appId, walletAddress, network: app.network }
        })
        const stakedBalance = result.data as StakedBalance
        if (stakedBalance.products.length > 0) {
          stakedBalances.push(stakedBalance)
        }
      }
    }
  }
  return stakedBalances
}

const _getStakedBalance = async (
  appsByNetwork: Array<AppsByNetwork>,
  walletAddress: string,
  activeNetworks: NetworksState
): Promise<StakedBalancesByNetwork> => {
  const stakedBalances = {} as StakedBalancesByNetwork
  for (const app of appsByNetwork) {
    for (const appId of app.appIds) {
      const result = await axios.get('/api/staking-balance', {
        params: { appId: appId, walletAddress, network: app.network }
      })
      const stakedBalance = result.data as StakedBalance
      if (stakedBalance.products.length > 0 && activeNetworks[app.network.toUpperCase()]) {
        if (stakedBalances[app.network]) stakedBalances[app.network].push(stakedBalance)
        else stakedBalances[app.network] = [stakedBalance]
      }
    }
  }
  return stakedBalances
}

async function _getSupportedApps(state: StakingStore): Promise<Array<AppsByNetwork>> {
  const result = await axios.get('/api/supported-apps', {
    params: { stakingType: state.currentStakingType }
  })
  const stakingData = result.data as Array<AppsByNetwork>
  return stakingData
}

export const getSupportedApps =
  (currentNetworkId: Networks, walletAddress: string, activeNetworks: NetworksState) =>
  async (dispatch: StakingDispatch, state: StakingStore) => {
    try {
      dispatch(setLoadingStakedBalance(true))
      const stakingData = await _getSupportedApps(state)
      const appsMarketData = await _getMarketDataByNetwork(stakingData, state.currentStakingType, currentNetworkId)
      dispatch(setSupportedApps(appsMarketData))
      const stakedBalanceByApp = await _getStakingBalanceByNetworkAndAppId(stakingData, currentNetworkId, walletAddress)
      const stakedPools = await _getStakedBalance(stakingData, walletAddress, activeNetworks)
      dispatch(setStakedPools(stakedPools))
      dispatch(setStakedBalances(stakedBalanceByApp))
      dispatch(setLoadingStakedBalance(false))
    } catch (error) {
      console.log(error)
    }
  }

export const getStakedBalance =
  (currentNetworkId: Networks, walletAddress: string, activeNetworks: NetworksState) =>
  async (dispatch: StakingDispatch, state: StakingStore) => {
    try {
      const stakingData = await _getSupportedApps(state)
      const stakedBalanceByApp = await _getStakingBalanceByNetworkAndAppId(stakingData, currentNetworkId, walletAddress)
      const stakedPools = await _getStakedBalance(stakingData, walletAddress, activeNetworks)
      dispatch(setStakedPools(stakedPools))
      dispatch(setStakedBalances(stakedBalanceByApp))
    } catch (error) {
      console.log(error)
    }
  }

const _getGasPrice = async (network: Networks): Promise<string> => {
  const response = await axios.get('/api/gas-price', {
    params: {
      network
    }
  })
  const gasPrice = response.data as GasPrice
  return toWei(
    typeof gasPrice.instant === 'number' ? gasPrice.instant.toString() : gasPrice.instant.baseFeePerGas.toString(),
    'gwei'
  )
}

export const getStakingTransaction =
  (params: StakingTransactionParams, txNotification: TransactionNotification) => async () => {
    try {
      const gasPrice = await _getGasPrice(params.network)
      const body = {
        type: params.type,
        appId: params.appId,
        ownerAddress: params.ownerAddress,
        sellTokenAddress: params.sellTokenAddress,
        sellAmount: toWei(params.sellAmount, 'ether'),
        poolAddress: params.poolAddress,
        payoutTokenAddress: params.payoutTokenAddress,
        slippagePercentage: params.slippagePercentage,
        network: params.network,
        gasPrice
      }
      const result = await axios.get('/api/transaction-staking', {
        params: body
      })
      const web3Transaction = result.data as StakingTransaction
      await sendTransaction(web3Transaction, txNotification)
    } catch (error) {
      txNotification.onTxError()
      console.log(error)
    }
  }

export const getWithdrawTransaction =
  (params: WithdrawTransactionParams, txNotification: TransactionNotification) => async () => {
    try {
      const gasPrice = await _getGasPrice(params.network)
      const body = {
        type: params.type,
        appId: params.appId,
        ownerAddress: params.ownerAddress,
        sellAmount: params.inWei ? params.sellAmount : toWei(params.sellAmount, 'ether'),
        poolAddress: params.poolAddress,
        toTokenAddress: params.toTokenAddress,
        slippagePercentage: params.slippagePercentage,
        network: params.network,
        gasPrice
      }
      const result = await axios.get('/api/transaction-withdraw', {
        params: body
      })
      const web3Transaction = result.data as StakingTransaction
      await sendTransaction(web3Transaction, txNotification)
    } catch (error) {
      txNotification.onTxError()
      console.log(error)
    }
  }

export const getStakedBalanceFiat =
  (
    stakedBalances: StakedBalancesByNetwork,
    fiatRates: FiatRates,
    currentCurrency: fiatCurrencies,
    networks: NetworksState
  ) =>
  (dispatch: StakingDispatch, state: StakingStore) => {
    let payload = state.stakedBalanceFiat
    if (stakedBalances && Object.keys(stakedBalances).length > 0) {
      if (payload === 'loading' || parseFloat(payload) > 0) payload = '0.00'
      for (const item in stakedBalances) {
        payload = (
          parseFloat(payload) +
          stakedBalances[item]
            .map((stakedBalance) =>
              stakedBalance.products
                .map((element) =>
                  element.assets
                    .filter((item) => networks[item.tokens[0].network.split('-')[0].toUpperCase()])
                    .map((token) => token.balanceUSD)
                )
                .flat()
                .reduce((previous, current) => previous + current, 0)
            )
            .reduce((previous, current) => previous + current, 0)
        ).toFixed(2)
        payload = (parseFloat(payload) * fiatRates[currentCurrency]).toFixed(2)
      }
    }
    if (stakedBalances && Object.keys(stakedBalances).length === 0) payload = '0.00'
    dispatch(setStakedBalanceFiat(payload))
  }

export const checkApprovalStateToWithdraw =
  (params: WithdrawApprovalStateParams) => async (dispatch: StakingDispatch) => {
    try {
      const body = {
        type: params.type,
        appId: params.appId,
        ownerAddress: params.ownerAddress,
        sellTokenAddress: params.sellTokenAddress,
        amount: toWei(params.amount, 'ether'),
        network: params.network
      }
      const result = await axios.get('/api/approval-state-withdraw', {
        params: body
      })
      const approvalTransactionState = result.data as ApprovalState
      dispatch(setApprovalTransaction(approvalTransactionState))
    } catch (error) {
      console.log(error)
    }
  }

export const sendApprovalTransactionToWithdraw =
  (params: ApprovalTransactionParams, txNotification: TransactionNotification) => async (dispatch: StakingDispatch) => {
    try {
      const gasPrice = await _getGasPrice(params.network)
      const body = {
        type: params.type,
        appId: params.appId,
        ownerAddress: params.ownerAddress,
        sellTokenAddress: params.sellTokenAddress,
        amount: toWei(params.amount, 'ether'),
        network: params.network,
        allowInfinite: params.allowInfinite,
        gasPrice
      }
      const result = await axios.get('/api/approval-transaction-withdraw', {
        params: body
      })
      const approvalTransaction = result.data as ApprovalTransaction
      await sendTransaction(approvalTransaction, txNotification)
      dispatch(checkApprovalStateToWithdraw(params))
    } catch (error) {
      txNotification.onTxError()
      console.log(error)
    }
  }

export const resetStaking = (): StakingActionTypes => {
  return { type: RESET_STAKING }
}
