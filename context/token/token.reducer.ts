import { TokenActionTypes, SET_CURRENT_TOKEN, SET_TOKEN_PRICES } from './token.actions.types'
import { TokenStore } from './token.reducer.types'
import { TokenHistory, TokenPrice } from '../../types'

export const initialTokenStore: TokenStore = {
  currentToken: {} as TokenHistory,
  prices: [] as Array<TokenPrice>
}

export const tokenReducer = (state: TokenStore, action: TokenActionTypes): TokenStore => {
  switch (action.type) {
    case SET_TOKEN_PRICES:
      return {
        ...state,
        prices: action.payload
      }
    case SET_CURRENT_TOKEN:
      return {
        ...state,
        currentToken: action.payload
      }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
