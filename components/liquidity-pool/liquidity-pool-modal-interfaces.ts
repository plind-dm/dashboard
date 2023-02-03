import { DigestedTokenAsset } from '../../pages/api/token-balances'

export interface inputSellAmountInterface {
  balanceChecker: boolean
}

export interface disabledDepositButton {
  disabled: boolean
}

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface TokenDropdownOption {
  value: string
  label: React.ReactElement
  data: DigestedTokenAsset
}
