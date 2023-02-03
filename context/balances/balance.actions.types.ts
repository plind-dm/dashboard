import { TotalBalances } from '.'
import { DigestedTokenBalance } from '../../pages/api/token-balances'
import { fiatCurrencies, FiatRates, NetworksState, graphTimeFrame } from './balance.reducer.types'

export const SET_FIAT = 'SET_FIAT'
export const SET_CONVERTED_BALANCE = 'SET_CONVERTED_BALANCE'
export const SET_BALANCE = 'SET_BALANCE'
export const SET_TOTAL_BALANCE = 'SET_TOTAL_BALANCE'
export const SET_NETWORKS_TO_SHOW = 'SET_NETWORKS_TO_SHOW'
export const SET_GRAPH_TIME_FRAME = 'SET_GRAPH_TIME_FRAME'
export const SET_BALANCE_FIAT = 'SET_BALANCE_FIAT'
export const RESET_BALANCE = 'RESET_BALANCE'

interface SetFiat {
  type: typeof SET_FIAT
  payload: FiatRates
}

interface SetBalance {
  type: typeof SET_BALANCE
  payload: DigestedTokenBalance[]
}
interface SetTotalBalance {
  type: typeof SET_TOTAL_BALANCE
  payload: TotalBalances
}
interface SetConvertedBalance {
  type: typeof SET_CONVERTED_BALANCE
  payload: { currentCurrency: fiatCurrencies; convertedBalances: DigestedTokenBalance[] }
}

interface SetNetworksToShow {
  type: typeof SET_NETWORKS_TO_SHOW
  payload: NetworksState
}

interface SetGraphTimeFrame {
  type: typeof SET_GRAPH_TIME_FRAME
  payload: graphTimeFrame
}

interface SetBalanceFiat {
  type: typeof SET_BALANCE_FIAT
  payload: string
}

interface ResetBalance {
  type: typeof RESET_BALANCE
}

export type BalanceActionTypes =
  | SetFiat
  | SetBalance
  | SetConvertedBalance
  | SetTotalBalance
  | SetNetworksToShow
  | SetGraphTimeFrame
  | SetBalanceFiat
  | ResetBalance
