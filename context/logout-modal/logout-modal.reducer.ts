import { LogoutModalActionTypes, SET_LOGOUT_MODAL_STATE } from './logout-modal.actions.types'
import { LogoutModalStore } from './logout-modal.reducer.types'

export const initialModalLogoutStore: LogoutModalStore = {
  isOpen: false
}

export const logoutModalReducer = (state: LogoutModalStore, action: LogoutModalActionTypes): LogoutModalStore => {
  switch (action.type) {
    case SET_LOGOUT_MODAL_STATE:
      return {
        ...state,
        isOpen: action.payload
      }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
