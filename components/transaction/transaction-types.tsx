import { ReactNode } from 'react'
import { Transaction } from '../../types'
import { NetworksLogo } from '../../types'
import { Networks } from '../../types'
import dummyImage from '../../public/images/test/dummy-image.svg'

export interface TransactionProps {
  transaction: Transaction
  onClick: VoidFunction
  isFirst: boolean
  isLast: boolean
}

export interface ICardProps {
  children: ReactNode
  onClick: VoidFunction
  isFirst: boolean
  isLast: boolean
}

export interface ITokenWrapperProps {
  children: ReactNode
}

export interface IGasFeeProps {
  children: ReactNode
}

export interface IAccountWrapperProps {
  children: ReactNode
}

export interface ITransactionDetailsProps {
  children: ReactNode
}

export interface IArrowAndTransactionTypeWrapperProps {
  children: ReactNode
}

export const networkLogo = (transaction: Transaction): string => {
  switch (transaction.network) {
    case Networks.ETHEREUM:
      return NetworksLogo.ETHEREUM
    case Networks['BINANCE-SMART-CHAIN']:
      return NetworksLogo.BINANCE
    case Networks.POLYGON:
      return NetworksLogo.POLYGON
    case Networks.SHYFT:
      return NetworksLogo.SHYFT
    case Networks.SHYFT_TESTNET:
      return NetworksLogo.SHYFT_TESTNET
    default:
      return dummyImage
  }
}
