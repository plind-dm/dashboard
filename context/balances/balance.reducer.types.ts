import { CustomDispatch } from '@caramelpoint/contuxt'
import { DigestedTokenBalance } from '../../pages/api/token-balances'
import { BalanceActionTypes } from './balance.actions.types'
export interface NetworksState {
  [key: string]: boolean
}

export enum fiatCurrencies {
  USD = 'USD',
  EUR = 'EUR',
  CAD = 'CAD',
  GBP = 'GBP'
}

export enum fiatCurrenciesSymbols {
  USD = '$',
  EUR = '€',
  CAD = 'C$',
  GBP = '£'
}

export enum graphTimeFrame {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year'
}

export interface TotalBalances {
  totalBalance: number
  assetBalance: number
  debtBalance: number
}

export interface BalanceStore {
  currentCurrency: fiatCurrencies
  currentCurrencySymbol: fiatCurrenciesSymbols
  balances?: Array<DigestedTokenBalance>
  totalBalances?: TotalBalances
  fiatRates?: FiatRates
  convertedBalances?: Array<DigestedTokenBalance>
  networks: NetworksState
  graphTimeFrame: graphTimeFrame
  balanceFiat: string
}

export interface FiatRates {
  [key: string]: number
}

export type BalanceDispatch = CustomDispatch<BalanceActionTypes, BalanceStore>
