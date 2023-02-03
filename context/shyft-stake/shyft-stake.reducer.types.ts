import { CustomDispatch } from '@caramelpoint/contuxt'
import { ShyftStakeActionTypes } from './shyft-stake.actions.types'

export interface ShyftStakeStore {
  refreshContractValues: boolean
}

export type ShyftStakeDispatch = CustomDispatch<ShyftStakeActionTypes, ShyftStakeStore>
