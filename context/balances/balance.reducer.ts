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
import { BalanceStore, fiatCurrencies, graphTimeFrame, fiatCurrenciesSymbols } from './balance.reducer.types'

export const initialBalanceStore: BalanceStore = {
  currentCurrency: fiatCurrencies.USD,
  currentCurrencySymbol: fiatCurrenciesSymbols[fiatCurrencies.USD],
  fiatRates: {},
  networks: {
    ETHEREUM: true,
    POLYGON: true,
    BINANCE: true,
    SHYFT: true
  },
  graphTimeFrame: graphTimeFrame.day,
  balanceFiat: 'loading'
}

export const balanceReducer = (state: BalanceStore, action: BalanceActionTypes): BalanceStore => {
  switch (action.type) {
    case SET_BALANCE:
      return {
        ...state,
        balances: action.payload
      }
    case SET_TOTAL_BALANCE:
      return {
        ...state,
        totalBalances: action.payload
      }
    case SET_CONVERTED_BALANCE:
      return {
        ...state,
        convertedBalances: action.payload.convertedBalances,
        currentCurrency: action.payload.currentCurrency,
        currentCurrencySymbol: fiatCurrenciesSymbols[action.payload.currentCurrency]
      }
    case SET_FIAT:
      return {
        ...state,
        fiatRates: action.payload
      }
    case SET_NETWORKS_TO_SHOW:
      return {
        ...state,
        networks: action.payload
      }
    case SET_GRAPH_TIME_FRAME:
      return {
        ...state,
        graphTimeFrame: graphTimeFrame[action.payload]
      }
    case SET_BALANCE_FIAT:
      return {
        ...state,
        balanceFiat: action.payload
      }
    case RESET_BALANCE:
      return {
        ...initialBalanceStore
      }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
