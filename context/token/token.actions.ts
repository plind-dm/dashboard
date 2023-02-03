import { TokenActionTypes, SET_CURRENT_TOKEN, SET_TOKEN_PRICES } from './token.actions.types'
import { TokenDispatch } from './token.reducer.types'
import axios from 'axios'
import { TokenHistory, TokenPrice } from '../../types'
interface TokenHistoryParams {
  address: string
  network: string
  timeFrame: string
  currency: string
}

export const setTokenPrices = (token: Array<TokenPrice>): TokenActionTypes => {
  return { type: SET_TOKEN_PRICES, payload: token }
}

export const setCurrentToken = (token: TokenHistory): TokenActionTypes => {
  return { type: SET_CURRENT_TOKEN, payload: token }
}

export const getTokenHistory = (params: TokenHistoryParams) => async (dispatch: TokenDispatch) => {
  try {
    const { address, network, timeFrame, currency } = params
    const result = await axios.get('/api/price-history', {
      params: { address, network, timeFrame, currency }
    })
    const tokenData = result.data as TokenHistory
    dispatch(setCurrentToken(tokenData))
  } catch (error) {
    console.log(error)
  }
}

export const getTokensPrice = (network: string) => async (dispatch: TokenDispatch) => {
  try {
    const result = await axios.get('/api/prices', {
      params: { network }
    })
    const tokenPrices = result.data as Array<TokenPrice>
    dispatch(setTokenPrices(tokenPrices))
  } catch (error) {
    console.log(error)
  }
}
