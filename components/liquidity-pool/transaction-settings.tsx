import styled from 'styled-components'
import Image from 'next/image'
import Select from 'react-select'
import informationIcon from '../../public/images/info-icon.svg'
import ReactTooltip from 'react-tooltip'
import { $NormalTextBold, SwitchComponent } from '../uiKit'
import { setAllowInfinite, setSlippageTolerance, useStakingDispatch, useStakingState } from '../../context/staking'
import { showExponentialNumber } from '../../utils/price-utils'
import { $NormalTextRegularGrey } from './staking-modal-styles'

const $TransactionSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const $SettingElement = styled.div`
  display: flex;
  margin: 8px 0;
  justify-content: space-between;
  column-gap: 15px;
`
export const $Tolerance = styled(Select)`
  .react-select__indicator-separator {
    opacity: 0;
  }
  .react-select__control,
  .react-select__control--is-focused {
    border: none;
    width: 82px;
    height: 36px;
    border-radius: 8px;
    outline: none;
    background-color: ${(props) => props.theme.palette.defaultGrey};
  }
  .react-select__menu {
    padding: 5px;
    background-color: ${(props) => props.theme.palette.defaultGrey};
    width: auto;
    right: 0;
  }
  .react-select__menu-list {
    display: flex;
    column-gap: 8px;
  }
  .react-select__placeholder {
    color: white;
  }
  .react-select__single-value {
    color: white;
  }
  .react-select__option {
    border: 1px solid ${(props) => props.theme.palette.paleGrey};
    border-radius: 8px;
    &:active {
      background-color: transparent;
    }
  }
  .react-select__option--is-selected {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.palette.pink};
    & > span {
      color: ${(props) => props.theme.palette.pink};
    }
  }
  .react-select__option--is-focused {
    background-color: transparent;
  }
  .react-select__indicator,
  .react-select__dropdown-indicator {
    padding: 0 5px 0 0;
  }
`

const $InformationIconContainer = styled.div`
  position: relative;
`

const $SettingsTittle = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`
const $ToleranceOption = styled.span`
  padding: 8px;
  color: ${(props) => props.theme.palette.white};
`
interface AmountValue {
  poolAmount?: number
  convertedAmount?: number
}

const SLIPPAGE_TOLERANCE_2 = '2%'
const SLIPPAGE_TOLERANCE_3 = '3%'
const SLIPPAGE_TOLERANCE_5 = '5%'

export const TransactionSettings = ({ poolAmount, convertedAmount }: AmountValue): React.ReactElement => {
  const stakingDispatch = useStakingDispatch()
  const { allowInfinite, slippageTolerance } = useStakingState()
  const tolerance = [
    { value: SLIPPAGE_TOLERANCE_2, label: <$ToleranceOption>2%</$ToleranceOption> },
    { value: SLIPPAGE_TOLERANCE_3, label: <$ToleranceOption>3%</$ToleranceOption> },
    { value: SLIPPAGE_TOLERANCE_5, label: <$ToleranceOption>5%</$ToleranceOption> }
  ]

  const onSwitchChange = (): void => {
    stakingDispatch(setAllowInfinite(!allowInfinite))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectionChange = (option: any): void => {
    switch (option.value) {
      case SLIPPAGE_TOLERANCE_2:
        stakingDispatch(setSlippageTolerance(0.02))
        break
      case SLIPPAGE_TOLERANCE_3:
        stakingDispatch(setSlippageTolerance(0.03))
        break
      case SLIPPAGE_TOLERANCE_5:
        stakingDispatch(setSlippageTolerance(0.05))
        break
    }
  }
  return (
    <$TransactionSettings>
      <$NormalTextRegularGrey>{'Transaction settings'}</$NormalTextRegularGrey>
      <$SettingElement>
        <ReactTooltip id="SlippageTolerance" type="dark" effect="float" place="top">
          {'This is maximum percentage you are willing to lose due to unfavorable price changes.'}
        </ReactTooltip>
        <$SettingsTittle>
          <$NormalTextBold>{'Slippage Tolerance'}</$NormalTextBold>
          <$InformationIconContainer>
            <Image
              src={informationIcon}
              height="18px"
              width="18px"
              layout="fixed"
              data-tip
              data-for="SlippageTolerance"
            />
          </$InformationIconContainer>
        </$SettingsTittle>
        <$SettingsTittle>
          <$Tolerance
            options={tolerance}
            defaultValue={tolerance[0]}
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={onSelectionChange}
          />
        </$SettingsTittle>
      </$SettingElement>
      <$SettingElement>
        <$SettingsTittle>
          <$NormalTextBold>{'Minimum Received'}</$NormalTextBold>
        </$SettingsTittle>
        <$SettingsTittle>
          {poolAmount && ` ${showExponentialNumber(poolAmount - poolAmount * slippageTolerance, 3)}`}
          {convertedAmount && ` ${showExponentialNumber(convertedAmount - convertedAmount * slippageTolerance, 3)}`}
        </$SettingsTittle>
      </$SettingElement>
      <$SettingElement>
        <$SettingsTittle>
          <$NormalTextBold>{'Infinite Allowance'}</$NormalTextBold>
          {allowInfinite ? (
            <ReactTooltip id="InfiniteAllowanceTrue" type="dark" effect="float" place="top">
              {'Be aware of the risks of giving infinite approval to a smart contract address.'}
            </ReactTooltip>
          ) : (
            <ReactTooltip id="InfiniteAllowanceFalse" type="dark" effect="float" place="top">
              {
                'Only the exact amount is allowed to be transferred. you will need to re-approve for a subsequent transaction.'
              }
            </ReactTooltip>
          )}
          <$InformationIconContainer>
            <Image
              src={informationIcon}
              height="18px"
              width="18px"
              layout="fixed"
              data-tip
              data-for={allowInfinite ? 'InfiniteAllowanceTrue' : 'InfiniteAllowanceFalse'}
            />
          </$InformationIconContainer>
        </$SettingsTittle>
        <$SettingsTittle>
          <SwitchComponent onChange={onSwitchChange} checked={allowInfinite} />
        </$SettingsTittle>
      </$SettingElement>
    </$TransactionSettings>
  )
}
