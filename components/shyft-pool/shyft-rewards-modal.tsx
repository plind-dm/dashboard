import Image from 'next/image'
import shyftIcon from '../../public/images/icons/shyft.svg'
import { BaseModal } from '../modal/base-modal'
import { $Button, $Divider, $H6, $InputNumber, $LargeTextBold, $MediumTextRegular, Loader } from '../uiKit'
import { $MaxButton } from '../liquidity-pool/staking-modal-styles'
import { useState } from 'react'
import { $ModalContainer, IModalProps, $Subtitle, $RowItem, $InputLabelContainer } from '.'

export const ShyftRewardsModal = ({ isOpen, onClose }: IModalProps): React.ReactElement => {
  const [rewardPercentageInput, setRewardPercentageInput] = useState<number>()
  const [showLoader, setShowLoader] = useState<boolean>(false)

  const onRewardAmountChange = (value: number): void => {
    if (value > 100) {
      value = 100
    }
    setRewardPercentageInput(value ? Number.parseFloat(value.toFixed(5)) : undefined)
  }

  const handleMaxButtonClick = (): void => {
    setRewardPercentageInput(100)
  }

  const handledConfirmClick = async (): Promise<void> => {
    setShowLoader(true)
    // if (unbondPercentageInput) {
    //   const valueToUnbond = (unbondPercentageInput * totalStaked) / 100
    //   showLoadingToast(
    //     `Unbonding ${Number(weiToShft(valueToUnbond.toString())).toFixed(2)} SHFT from SHYFT.`,
    //     '/images/icons/shyft.svg'
    //   )
    //   await ShyftService.unbond({
    //     amount: valueToUnbond,
    //     onError: () => {
    //       setShowLoader(false)
    //       Toast.dismiss()
    //       showErrorToast('Transaction was rejected')
    //     },
    //     onSuccess: (txHash: string) => {
    //       stakingDispatch(setTxHash(txHash))
    //       Toast.dismiss()
    //       showSuccessToast(`Unbonding ${Number(weiToShft(valueToUnbond.toString())).toFixed(2)} SHFT to SHYFT Pool.`)
    //       setShowLoader(false)
    //       setTimeout(() => {
    //         Toast.dismiss()
    //         stakingDispatch(setTxHash(''))
    //         onSuccess()
    //         onClose()
    //       }, 3000)
    //     }
    //   })
    // }
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} noCloseButton>
      <$ModalContainer>
        <$RowItem>
          <$H6>{'Claim'}</$H6>
          <Image src={shyftIcon} layout="fixed" height="32px" width="32px" />
        </$RowItem>
        <$Subtitle>{'Available Rewards'}</$Subtitle>
        <$RowItem>
          <$LargeTextBold>{'43.98 SHFT'}</$LargeTextBold>
          <$MediumTextRegular>{'$4,840,760.90'}</$MediumTextRegular>
        </$RowItem>
        <$Divider />
        <$Subtitle>{'Total Claim'}</$Subtitle>
        <$RowItem>
          <$InputLabelContainer>
            <$LargeTextBold>{'%'}</$LargeTextBold>
            <$InputNumber
              type="number"
              placeholder="0"
              value={rewardPercentageInput}
              onChange={({ target: { value } }) => onRewardAmountChange(+value)}
            />
          </$InputLabelContainer>
          <$MaxButton type="button" value="Max" onClick={handleMaxButtonClick} />
        </$RowItem>
        <$Divider />
        <$Subtitle>
          {
            'You can claim 100% of your SHFT token rewards after the farming program ends. You have the option to re-stake.'
          }
        </$Subtitle>
        <$Button
          onClick={() => {
            handledConfirmClick()
          }}
          disabled={rewardPercentageInput === undefined || rewardPercentageInput <= 0 || showLoader}
        >
          {showLoader && <Loader color={showLoader ? '#994D7E' : '#FAFAFA'} size={0.3} />}
          {'Confirm'}
        </$Button>
      </$ModalContainer>
    </BaseModal>
  )
}
