import { CustomDispatch } from '@caramelpoint/contuxt'
import { TokenHistory, TokenPrice } from '../../types'
import { TokenActionTypes } from './token.actions.types'

export interface TokenStore {
  currentToken: TokenHistory
  prices: Array<TokenPrice>
}

export type TokenDispatch = CustomDispatch<TokenActionTypes, TokenStore>
