import { ShyftLPStakeActionTypes, REFRESH_CONTRACT_VALUES } from './shyft-lp-stake.actions.types'

export const dispatchRefreshContractValues = (): ShyftLPStakeActionTypes => {
  return { type: REFRESH_CONTRACT_VALUES, payload: true }
}

export const resetContractValues = (): ShyftLPStakeActionTypes => {
  return { type: REFRESH_CONTRACT_VALUES, payload: false }
}
