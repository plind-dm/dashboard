import { ShyftStakeActionTypes, REFRESH_CONTRACT_VALUES } from './shyft-stake.actions.types'

export const dispatchRefreshContractValues = (): ShyftStakeActionTypes => {
  return { type: REFRESH_CONTRACT_VALUES, payload: true }
}

export const resetContractValues = (): ShyftStakeActionTypes => {
  return { type: REFRESH_CONTRACT_VALUES, payload: false }
}
