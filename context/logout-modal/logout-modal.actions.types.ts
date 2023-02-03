export const SET_LOGOUT_MODAL_STATE = 'SET_LOGOUT_MODAL_STATE'

interface SetLogoutModalState {
  type: typeof SET_LOGOUT_MODAL_STATE
  payload: boolean
}

export type LogoutModalActionTypes = SetLogoutModalState
