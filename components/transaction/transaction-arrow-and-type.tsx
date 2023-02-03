import styled from 'styled-components'
import { IArrowAndTransactionTypeWrapperProps } from './transaction-types'

const $ArrowAndTransactionTypeWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ArrowAndTransactionTypeWrapper = ({
  children
}: IArrowAndTransactionTypeWrapperProps): React.ReactElement => {
  return <$ArrowAndTransactionTypeWrapper>{children}</$ArrowAndTransactionTypeWrapper>
}
