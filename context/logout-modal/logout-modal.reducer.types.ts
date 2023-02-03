import { CustomDispatch } from '@caramelpoint/contuxt'
import { LogoutModalActionTypes } from './logout-modal.actions.types'

export interface LogoutModalStore {
  isOpen: boolean
}

export type LogoutModalDispatch = CustomDispatch<LogoutModalActionTypes, LogoutModalStore>
