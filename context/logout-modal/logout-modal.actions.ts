import { LogoutModalActionTypes, SET_LOGOUT_MODAL_STATE } from './logout-modal.actions.types'

export const setLogoutModalState = (isOpen: boolean): LogoutModalActionTypes => {
  return { type: SET_LOGOUT_MODAL_STATE, payload: isOpen }
}
