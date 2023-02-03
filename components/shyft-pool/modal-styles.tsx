import styled from 'styled-components'
import { $NormalTextRegular } from '../uiKit'

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const $ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 363px;
`
export const $RowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const $ColumnItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const $Subtitle = styled($NormalTextRegular)`
  color: ${(props) => props.theme.palette.greyV4};
`
export const $ErrorText = styled($NormalTextRegular)`
  color: ${(props) => props.theme.palette.red};
`

export const $InputLabelContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`
