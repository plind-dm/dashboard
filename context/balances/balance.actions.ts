import {
  BalanceActionTypes,
  SET_BALANCE,
  SET_CONVERTED_BALANCE,
  SET_FIAT,
  SET_TOTAL_BALANCE,
  SET_NETWORKS_TO_SHOW,
  SET_GRAPH_TIME_FRAME,
  SET_BALANCE_FIAT,
  RESET_BALANCE
} from './balance.actions.types'
import {
  BalanceDispatch,
  BalanceStore,
  fiatCurrencies,
  fiatCurrencies as FiatCurrencies,
  FiatRates,
  TotalBalances,
  NetworksState,
  graphTimeFrame
} from './balance.reducer.types'
import axios from 'axios'
import { DigestedTokenAsset, DigestedTokenBalance } from '../../pages/api/token-balances'

export const setBalance = (balances: DigestedTokenBalance[]): BalanceActionTypes => {
  return { type: SET_BALANCE, payload: balances }
}
export const setTotalBalances = (totalBalances: TotalBalances): BalanceActionTypes => {
  return { type: SET_TOTAL_BALANCE, payload: totalBalances }
}

export const setConvertedBalance = (
  convertedBalances: DigestedTokenBalance[],
  currency: FiatCurrencies
): BalanceActionTypes => {
  return { type: SET_CONVERTED_BALANCE, payload: { convertedBalances, currentCurrency: currency } }
}

export const setFiat = (fiatState: FiatRates): BalanceActionTypes => {
  return { type: SET_FIAT, payload: fiatState }
}

const calcTotalBalances = (balances: DigestedTokenBalance[], state: BalanceStore): TotalBalances => {
  const totalBalances = (() =>
    balances.reduce(
      (previous: TotalBalances, current: DigestedTokenBalance): TotalBalances => {
        return state.networks[current.networkName.toUpperCase()]
          ? {
              totalBalance: previous.totalBalance + current.totalBalance,
              assetBalance: previous.assetBalance + current.assetBalance,
              debtBalance: previous.debtBalance + current.debtBalance
            }
          : {
              totalBalance: previous.totalBalance,
              assetBalance: previous.assetBalance,
              debtBalance: previous.debtBalance
            }
      },
      { totalBalance: 0, assetBalance: 0, debtBalance: 0 }
    ))()
  totalBalances.totalBalance.toFixed(2)
  totalBalances.assetBalance.toFixed(2)
  totalBalances.debtBalance.toFixed(2)
  return totalBalances
}

export const getFiat = () => async (dispatch: BalanceDispatch) => {
  try {
    const result = await axios.get('/api/fiat')
    dispatch(setFiat(result.data as FiatRates))
  } catch (error) {
    console.log(error)
  }
}

const convertTokens = (tokens: DigestedTokenAsset[], convertedRate: number): DigestedTokenAsset[] => {
  const convertedTokens: DigestedTokenAsset[] = []
  tokens.forEach((token) => {
    const convertedToken = { ...token }
    convertedToken.balanceFiat = token.balanceFiat * convertedRate
    convertedToken.cryptoPrice = token.cryptoPrice * convertedRate
    convertedTokens.push(convertedToken)
  })
  return convertedTokens
}

const convertBalance = (balances: DigestedTokenBalance[], convertedRate: number): DigestedTokenBalance[] => {
  const convertedBalances: DigestedTokenBalance[] = []
  balances.forEach((balance) => {
    const convertedBalance = { ...balance }
    convertedBalance.totalBalance = balance.totalBalance * convertedRate
    convertedBalance.assetBalance = balance.assetBalance * convertedRate
    convertedBalance.debtBalance = balance.debtBalance * convertedRate
    if (convertedBalance.products) convertedBalance.products = convertTokens(convertedBalance.products, convertedRate)
    convertedBalances.push(convertedBalance)
  })
  return convertedBalances
}

export const changeCurrency = (currency: FiatCurrencies) => async (dispatch: BalanceDispatch, state: BalanceStore) => {
  try {
    let conversionRate
    if (state.fiatRates && state.currentCurrency) {
      conversionRate = state.fiatRates[currency]
    } else {
      conversionRate = 1 //Default in case fiatRates is not fetch yet
    }
    if (state.balances) {
      const convertedBalances = convertBalance(state.balances, conversionRate)
      dispatch(setConvertedBalance(convertedBalances, currency))
      dispatch(setTotalBalances(calcTotalBalances(convertedBalances, state)))
    }
  } catch (error) {
    console.log(error)
  }
}

export const setNetworksToShow = (payload: NetworksState): BalanceActionTypes => {
  return { type: SET_NETWORKS_TO_SHOW, payload: payload }
}

export const setBalanceFiat = (payload: string): BalanceActionTypes => {
  return { type: SET_BALANCE_FIAT, payload }
}

export const getBalance = (address: string) => async (dispatch: BalanceDispatch, state: BalanceStore) => {
  try {
    const result = await axios.get<DigestedTokenBalance[]>('/api/token-balances', {
      params: { address, destinationFiat: 'dollar' }
    })
    dispatch(setBalance(result.data))
    const convertedBalances = convertBalance(result.data, 1)
    dispatch(setConvertedBalance(convertedBalances, fiatCurrencies.USD))
    dispatch(setTotalBalances(calcTotalBalances(convertedBalances, state)))
  } catch (error) {
    console.log(error)
  }
}

export const setChangedBalances = (totalBalances: DigestedTokenBalance[], state: BalanceStore): BalanceActionTypes => {
  return { type: SET_TOTAL_BALANCE, payload: calcTotalBalances(totalBalances, state) }
}

export const setGraphTimeFrame = (nextTimeFrame: graphTimeFrame): BalanceActionTypes => {
  return { type: SET_GRAPH_TIME_FRAME, payload: nextTimeFrame }
}

export const getBalanceFiat =
  (
    DigestedTokenBalance: DigestedTokenBalance[],
    fiatRates: FiatRates,
    currentCurrency: fiatCurrencies,
    networks: NetworksState
  ) =>
  (dispatch: BalanceDispatch) => {
    let value = '0.00'
    value = DigestedTokenBalance.filter((token) => networks[token.networkName.toUpperCase()])
      .map((token) => token.totalBalance)
      .reduce((previous, current) => previous + current, 0)
      .toFixed(2)
    value = (parseFloat(value) * fiatRates[currentCurrency]).toFixed(2)
    dispatch(setBalanceFiat(value))
  }

export const resetBalance = (): BalanceActionTypes => {
  return { type: RESET_BALANCE }
}
