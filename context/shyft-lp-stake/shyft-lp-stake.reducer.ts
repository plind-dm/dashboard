import { ShyftLPStakeActionTypes, REFRESH_CONTRACT_VALUES } from './shyft-lp-stake.actions.types'
import { ShyftLPStakeStore } from './shyft-lp-stake.reducer.types'

export const initialShyftLPStakeStore: ShyftLPStakeStore = {
  refreshContractValues: false
}

export const shyftLPStakeReducer = (state: ShyftLPStakeStore, action: ShyftLPStakeActionTypes): ShyftLPStakeStore => {
  switch (action.type) {
    case REFRESH_CONTRACT_VALUES:
      return {
        ...state,
        refreshContractValues: action.payload
      }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
