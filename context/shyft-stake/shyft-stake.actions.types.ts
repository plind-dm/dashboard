export const REFRESH_CONTRACT_VALUES = 'REFRESH_CONTRACT_VALUES'

interface RefreshContractValues {
  type: typeof REFRESH_CONTRACT_VALUES
  payload: boolean
}

export type ShyftStakeActionTypes = RefreshContractValues
