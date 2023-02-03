import { BigNumber } from '@ethersproject/bignumber'

export interface UnBondingDetail {
  unbondingId: number
  address: string
  remainingAmount: BigNumber
  unstakeEnabledTimestamp: number
  arrayPosition: number
}
