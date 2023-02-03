import { CustomDispatch } from '@caramelpoint/contuxt'
import { ShyftLPStakeActionTypes } from './shyft-lp-stake.actions.types'

export interface ShyftLPStakeStore {
  refreshContractValues: boolean
}

export type ShyftLPStakeDispatch = CustomDispatch<ShyftLPStakeActionTypes, ShyftLPStakeStore>
