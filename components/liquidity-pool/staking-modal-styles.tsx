import { $H5, $LargeTextBold, $NormalTextBold, $NormalTextRegular } from '../uiKit'
import { Devices } from '../../styles/constants/devices'
import { inputSellAmountInterface, disabledDepositButton } from './liquidity-pool-modal-interfaces'
import Select from 'react-select'
import styled from 'styled-components'

export const $NormalTextRegularGrey = styled($NormalTextRegular)`
  color: ${(props) => props.theme.palette.greyV4};
`
export const $NormalTextBoldGrey = styled($NormalTextBold)`
  color: ${(props) => props.theme.palette.greyV4};
`
export const $Title = styled($H5)`
  margin-bottom: 8px;
`
export const $ErrorText = styled($NormalTextRegular)`
  color: #f87171;
`

export const $ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const $ColumItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const $RowItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`

export const $InputSellAmount = styled.input<inputSellAmountInterface>`
  margin-top: 10px;
  border: none;
  outline: none;
  font-family: 'Neuzeit Grotesk';
  font-size: 1.25rem;
  font-weight: 700;
  text-align: right;
  background-color: transparent;
  color: ${(props) => (props.balanceChecker ? '#f87171' : 'white')};
  width: 30%;
  @media ${Devices.laptop} {
    text-align: right;
    left: 62%;
    margin-top: 7px;
    outline: none;
    width: unset;
    border: none;
    justify-content: flex-end;
    align-items: flex-end;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::placeholder {
    color: white;
  }
`

export const $BalanceText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8px;
`

export const $ContainerPoolAmount = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
export const $InputPoolAmount = styled.input`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 32px;
  width: 60%;
  border: none;
  text-align: right;
  background-color: transparent;
  &::placeholder {
    color: white;
  }
  @media ${Devices.laptop} {
    width: unset;
    text-align: right;
    border: none;
    justify-content: flex-end;
    align-items: flex-end;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const $PoolAllocation = styled.div`
  row-gap: 8px;
  margin: 8px 0px;
  display: flex;
  flex-direction: column;
`

export const $InputRewards = styled.input`
  font-family: 'Neuzeit Grotesk';
  font-size: 16px;
  font-weight: 700;
  border: none;
  text-align: right;
  background-color: transparent;
  &::placeholder {
    color: white;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const $Wrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`

export const $PollAllocationToken = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const $ImageWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  > span {
    border-radius: 100px;
  }
`

export const $DepositButton = styled.button<disabledDepositButton>`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => (props.disabled ? props.theme.palette.palidWhite : props.theme.palette.pink)};
  color: white;
  height: 48px;
  border: none;
  border-radius: 8px;
  text-align: center;
  column-gap: 12px;
  @media ${Devices.laptop} {
    height: 55px;
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.palette.hoverPink};
  }
  &:active {
    background-color: ${(props) => props.theme.palette.pressedPink};
  }
  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    color: ${(props) => props.theme.palette.greyV4}40;
    background-color: ${(props) => props.theme.palette.palidWhite};
  }
  transition: all 0.3s;
`

export const $BalanceFiat = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: grey;
  @media ${Devices.laptop} {
    font-size: 1rem;
    font-weight: 400;
    color: grey;
  }
`

export const $BalanceCrypto = styled.p`
  color: grey;
  font-size: 1rem;
  font-weight: 400;
  margin-right: 1px;
  @media ${Devices.laptop} {
    color: grey;
    font-size: 1rem;
    font-weight: 400;
  }
`

export const $BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  row-gap: 10px;
  margin-top: 8px;
  @media ${Devices.laptop} {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    row-gap: 10px;
  }
`
export const $DepositButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const $TokenNetworkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  width: 100%;
  @media ${Devices.mobileM} {
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: unset;
  }
`

export const $CircleImage = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
`

export const $MaxButton = styled.input`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  border-radius: 8px;
  background-color: transparent;
  margin: 0;
  padding: 6px 14px;
  border: 1px solid ${(props) => props.theme.palette.paleGrey};
  color: ${(props) => props.theme.palette.greyV4};
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.palette.hover};
  }
  @media ${Devices.mobileM} {
    margin: 0 10px;
  }
`

export const $TokenSelectionDropdown = styled(Select)`
  .react-select__indicator {
    margin: 0;
    padding: 0;
  }
  .react-select__indicator-separator {
    opacity: 0;
  }
  .react-select__control {
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: transparent;
  }
  .react-select__control--is-focused {
    outline: none;
    border: none;
    box-shadow: none;
  }
  .react-select__menu {
    background-color: ${(props) => props.theme.palette.defaultGrey};
    min-width: 150px;
  }
  .react-select__placeholder {
    color: white;
  }
  .react-select__single-value {
    color: white;
  }
  .react-select__option--is-focused {
    background-color: ${(props) => props.theme.palette.darkHighlight};
  }
  .react-select__value-container {
    display: flex;
    align-items: center;
    vertical-align: center;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
  }
  .react-select__option {
    &:active {
      background-color: ${(props) => props.theme.palette.greyV4};
    }
  }
  .react-select__option--is-selected {
    background-color: ${(props) => props.theme.palette.greyV4};
  }
`

export const $DropdownTokenContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const $EllipsisText = styled($LargeTextBold)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 75%;
  @media ${Devices.mobileM} {
    width: unset;
  }
`
