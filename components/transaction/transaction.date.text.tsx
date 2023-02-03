import { ReactNode } from 'react'
import styled from 'styled-components'
import { $LargeTextBold } from '../uiKit'

interface ITransactionDateTextProps {
  children: ReactNode
}

const $TransactionDateText = styled($LargeTextBold)`
  margin-bottom: 8px;
`

export const TransactionDateText = ({ children }: ITransactionDateTextProps): React.ReactElement => {
  return <$TransactionDateText>{children}</$TransactionDateText>
}
