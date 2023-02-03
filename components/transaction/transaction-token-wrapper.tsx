import styled from 'styled-components'
import { ITokenWrapperProps } from './transaction-types'

const $TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    border-radius: 100px;
  }
`

export const TokenWrapper = ({ children }: ITokenWrapperProps): React.ReactElement => {
  return <$TokenWrapper>{children}</$TokenWrapper>
}
