import styled from 'styled-components'
import { ITransactionDetailsProps } from './transaction-types'

const $TransactionDetails = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`

export const TransactionDetails = ({ children }: ITransactionDetailsProps): React.ReactElement => {
  return <$TransactionDetails>{children}</$TransactionDetails>
}
