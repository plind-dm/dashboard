import { BaseModal } from './base-modal'
import { $H5, $Text } from '../uiKit'
import styled from 'styled-components'

const $MobileWarningModal = styled.div`
  #content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
  }
`

const $ExplanationText = styled($Text)`
  color: ${(props) => props.theme.palette.greyV4};
  text-align: center;
`

const $GotItButton = styled.button`
  padding: 14px 26px;
  background-color: ${(props) => props.theme.palette.pink};
  border: none;
  color: ${(props) => props.theme.palette.white};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
`

interface MobileWarningModalProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileWarningModal = ({ isOpen, onClose }: MobileWarningModalProps): React.ReactElement => {
  return (
    <$MobileWarningModal>
      <BaseModal isOpen={isOpen} onClose={onClose} noCloseButton>
        <$H5>Hey you!</$H5>
        <$ExplanationText>
          For a better experience, we suggest to use our desktop version to deposit/withdraw liquidity on any pool.
        </$ExplanationText>
        <$GotItButton type="button" onClick={onClose}>
          Ok, got it!
        </$GotItButton>
      </BaseModal>
    </$MobileWarningModal>
  )
}
