import { TokenHistory, TokenPrice } from '../../types'

export const SET_CURRENT_TOKEN = 'SET_CURRENT_TOKEN'
export const SET_TOKEN_PRICES = 'SET_TOKEN_PRICES'
interface SetCurrentToken {
  type: typeof SET_CURRENT_TOKEN
  payload: TokenHistory
}
interface SetTokenPrices {
  type: typeof SET_TOKEN_PRICES
  payload: Array<TokenPrice>
}

export type TokenActionTypes = SetCurrentToken | SetTokenPrices
