import { ShyftStakeActionTypes, REFRESH_CONTRACT_VALUES } from './shyft-stake.actions.types'
import { ShyftStakeStore } from './shyft-stake.reducer.types'

export const initialShyftStakeStore: ShyftStakeStore = {
  refreshContractValues: false
}

export const shyftStakeReducer = (state: ShyftStakeStore, action: ShyftStakeActionTypes): ShyftStakeStore => {
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
