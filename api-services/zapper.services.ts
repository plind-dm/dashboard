/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { config } from '../config/env.config'
import { NftBalance, TokenBalance } from '../pages/api/response.types'
import {
  DataEntity,
  Transaction,
  AppsByNetwork,
  StakingItem,
  Networks,
  ApprovalStateParams,
  ApprovalState,
  ApprovalTransactionParams,
  TransactionParams,
  StakingTransaction,
  GasPrice,
  StakedBalance,
  ApprovalTransaction,
  WithdrawTransactionParams,
  TokenPrice
} from '../types'

const TOKENS = 'tokens'
const NFT = 'nft'
const BASE_URL = 'https://api.zapper.fi/v1'
const PROTOCOLS = '/protocols'
const GAS_PRICE = '/gas-price'
const NFT_BALANCE = `${PROTOCOLS}/${NFT}/balances`
const TOKEN_BALANCE = `${PROTOCOLS}/${TOKENS}/balances`
const FIAT_RATES = `/fiat-rates`
const TRANSACTION_HISTORY = `/transactions`
const TOKEN_MARKET_DATA = `/token-market-data`
const PRICE_HISTORY = `/prices`
const ZAP_IN = `/zap-in`
const ZAP_OUT = `/zap-out`

const API_KEY = config.zapper.apiKey || `96e0cc51-a62e-42ca-acee-910ea7d2a241` //public API KEY

const isValidNetwork = (network: string): boolean => {
  return network !== Networks.SHYFT_TESTNET && network !== Networks.SHYFT
}

export const getTokenBalances = async (address: string, network = Networks.ETHEREUM): Promise<TokenBalance> => {
  if (isValidNetwork(network)) {
    try {
      const URL = `${BASE_URL}${TOKEN_BALANCE}?addresses%5B%5D=${address}&network=${network}&api_key=${API_KEY}`
      const result = await axios.get<{ [key: string]: TokenBalance }>(URL)
      return result.data[address.toLowerCase()]
    } catch (error) {
      console.log('Zapper Service -> getTokenBalances', error)
      throw error
    }
  }
  console.log('Zapper Service -> Invalid network', network)
  throw new Error('Invalid network')
}

export const getNFTBalances = async (address: string, network = Networks.ETHEREUM): Promise<NftBalance> => {
  if (isValidNetwork(network)) {
    try {
      const URL = `${BASE_URL}${NFT_BALANCE}?addresses%5B%5D=${address}&network=${network}&api_key=${API_KEY}`
      const result = await axios.get<{ [key: string]: NftBalance }>(URL)
      return result.data[address.toLowerCase()]
    } catch (error) {
      console.log('Zapper Service -> getNFTBalances', error)
      throw error
    }
  }
  console.log('Zapper Service -> Invalid network', network)
  throw new Error('Invalid network')
}

export const getFiatRates = async (): Promise<DataEntity> => {
  try {
    const URL = `${BASE_URL}${FIAT_RATES}?api_key=${API_KEY}`
    const result = await axios.get<DataEntity>(URL)
    return result.data
  } catch (error) {
    console.log('Zapper Service -> getFiatRates', error)
    throw error
  }
}

export const getTransactionHistory = async (address: string, network: string): Promise<Array<Transaction>> => {
  if (isValidNetwork(network)) {
    try {
      const URL = `${BASE_URL}${TRANSACTION_HISTORY}?addresses%5B%5D=${address}&api_key=${API_KEY}&network=${network}`
      const result = await axios.get(URL)
      return result.data.data as Array<Transaction>
    } catch (error) {
      console.log('Zapper Service -> getTransactionHistory', error)
      throw error
    }
  }
  console.log('Zapper Service -> Invalid network', network)
  throw new Error('Invalid network')
}

export const getPriceHistoryByTokenAddress = async (
  tokenAddress: string,
  network: string,
  timeFrame: string,
  currency: string
): Promise<any> => {
  try {
    const URL = `${BASE_URL}${PRICE_HISTORY}/${tokenAddress}?api_key=${API_KEY}&network=${network}&timeFrame=${timeFrame}&currency=${currency}`
    const result = await axios.get(URL)
    return result.data as Array<any>
  } catch (error) {
    console.log('Zapper Service -> getPriceHistoryByTokenAddress', error)
    throw error
  }
}

export const getSupportedApps = async (stakingType: string): Promise<Array<AppsByNetwork>> => {
  try {
    const URL = `${BASE_URL}${ZAP_IN}/${stakingType}/supported?api_key=${API_KEY}`
    const result = await axios.get(URL)
    return result.data as Array<AppsByNetwork>
  } catch (error) {
    console.log('Zapper Service -> getSupportedApps', error)
    throw error
  }
}

const _getApprovalState = async (params: ApprovalStateParams, baseUri: string): Promise<ApprovalState> => {
  try {
    const { ownerAddress, type, sellTokenAddress, amount, appId, network } = params
    const queryParams = `ownerAddress=${ownerAddress}&sellTokenAddress=${sellTokenAddress}&amount=${amount}&network=${network}`
    const URL = `${BASE_URL}${baseUri}/${type}/${appId}/approval-state?api_key=${API_KEY}&${queryParams}`
    const result = await axios.get(URL)
    return result.data as ApprovalState
  } catch (error) {
    console.log('Zapper Service -> getApprovalState', error)
    throw error
  }
}

export const getZapInApprovalState = async (params: ApprovalStateParams): Promise<ApprovalState> => {
  if (isValidNetwork(params.network)) {
    return await _getApprovalState(params, ZAP_IN)
  }
  console.log('Zapper Service -> Invalid network', params.network)
  throw new Error('Invalid network')
}

export const getZapOutApprovalState = async (params: ApprovalStateParams): Promise<ApprovalState> => {
  if (isValidNetwork(params.network)) {
    return await _getApprovalState(params, ZAP_OUT)
  }
  console.log('Zapper Service -> Invalid network', params.network)
  throw new Error('Invalid network')
}

const _getApprovalTransaction = async (
  params: ApprovalTransactionParams,
  baseUri: string
): Promise<ApprovalTransaction> => {
  try {
    const { ownerAddress, type, sellTokenAddress, amount, appId, network, gasPrice, allowInfinite } = params
    const queryParams = `ownerAddress=${ownerAddress}&sellTokenAddress=${sellTokenAddress}&amount=${amount}&network=${network}&gasPrice=${gasPrice}&allowInfinite=${allowInfinite}`
    const URL = `${BASE_URL}${baseUri}/${type}/${appId}/approval-transaction?api_key=${API_KEY}&${queryParams}`
    const result = await axios.get(URL)
    return result.data as ApprovalTransaction
  } catch (error) {
    console.log('Zapper Service -> getApprovalTransaction', error)
    throw error
  }
}

export const getZapOutApprovalTransaction = async (params: ApprovalTransactionParams): Promise<ApprovalTransaction> => {
  if (isValidNetwork(params.network)) {
    return await _getApprovalTransaction(params, ZAP_OUT)
  }
  console.log('Zapper Service -> Invalid network', params.network)
  throw new Error('Invalid network')
}

export const getZapInApprovalTransaction = async (params: ApprovalTransactionParams): Promise<ApprovalTransaction> => {
  if (isValidNetwork(params.network)) {
    return await _getApprovalTransaction(params, ZAP_IN)
  }
  console.log('Zapper Service -> Invalid network', params.network)
  throw new Error('Invalid network')
}

const getTransaction = async (
  params: TransactionParams,
  baseUri: string,
  query: string
): Promise<StakingTransaction> => {
  try {
    const { ownerAddress, type, sellAmount, appId, network, gasPrice, poolAddress, slippagePercentage } = params
    const queryParams = `ownerAddress=${ownerAddress}&sellAmount=${sellAmount}&network=${network}&gasPrice=${gasPrice}&poolAddress=${poolAddress}&slippagePercentage=${slippagePercentage}&${query}`
    const URL = `${BASE_URL}${baseUri}/${type}/${appId}/transaction?api_key=${API_KEY}&${queryParams}`
    const result = await axios.get(URL)
    return result.data as StakingTransaction
  } catch (error) {
    console.log('Zapper Service -> getTransaction', error)
    throw error
  }
}

export const getZapInTransaction = async (params: TransactionParams): Promise<StakingTransaction> => {
  if (isValidNetwork(params.network)) {
    return await getTransaction(
      params,
      ZAP_IN,
      `payoutTokenAddress=${params.payoutTokenAddress}&sellTokenAddress=${params.sellTokenAddress}`
    )
  }
  console.log('Zapper Service -> Invalid network', params.network)
  throw new Error('Invalid network')
}

export const getZapOutTransaction = async (params: WithdrawTransactionParams): Promise<StakingTransaction> => {
  if (isValidNetwork(params.network)) {
    return await getTransaction(params as TransactionParams, ZAP_OUT, `toTokenAddress=${params.toTokenAddress}`)
  }
  console.log('Zapper Service -> Invalid network', params.network)
  throw new Error('Invalid network')
}

export const getAppMarketData = async (
  appId: string,
  network: string,
  stakingType: string
): Promise<Array<StakingItem>> => {
  if (isValidNetwork(network)) {
    try {
      const URL = `${BASE_URL}${PROTOCOLS}/${appId}${TOKEN_MARKET_DATA}?api_key=${API_KEY}&network=${network}&type=${stakingType}`
      const result = await axios.get(URL)
      return result.data as Array<StakingItem>
    } catch (error) {
      console.log('Zapper Service -> getAppMarketData', error)
      throw error
    }
  }
  console.log('Zapper Service -> Invalid network', network)
  throw new Error('Invalid network')
}

export const getGasPrice = async (network: string): Promise<GasPrice> => {
  if (isValidNetwork(network)) {
    try {
      const URL = `${BASE_URL}${GAS_PRICE}?api_key=${API_KEY}&network=${network}&eip1559=true`
      const result = await axios.get(URL)
      return result.data as GasPrice
    } catch (error) {
      console.log('Zapper Service -> getGasPrice', error)
      throw error
    }
  }
  console.log('Zapper Service -> Invalid network', network)
  throw new Error('Invalid network')
}

export const getStakingBalance = async (
  appId: string,
  network: string,
  walletAddress: string
): Promise<StakedBalance> => {
  if (isValidNetwork(network)) {
    try {
      const URL = `${BASE_URL}${PROTOCOLS}/${appId}/balances?api_key=${API_KEY}&network=${network}&addresses[]=${walletAddress}&newBalances=true`
      const result = await axios.get(URL)
      return result.data[walletAddress.toLowerCase()] as StakedBalance
    } catch (error) {
      console.log('Zapper Service -> getStakingBalance', error)
      throw error
    }
  }
  console.log('Zapper Service -> Invalid network', network)
  throw new Error('Invalid network')
}

export const getPricesByToken = async (network: string): Promise<any> => {
  if (network === Networks.SHYFT_TESTNET || network === Networks.SHYFT) network = Networks.ETHEREUM
  if (isValidNetwork(network)) {
    try {
      const URL = `${BASE_URL}${PRICE_HISTORY}?api_key=${API_KEY}&network=${network}`
      const result = await axios.get(URL)
      return result.data as Array<TokenPrice>
    } catch (error) {
      console.log('Zapper Service -> getPricesByToken', error)
      throw error
    }
  }
  console.log('Zapper Service -> Invalid network', network)
  throw new Error('Invalid network')
}
