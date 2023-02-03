import styled from 'styled-components'

export interface inputNumberInterface {
  wrongValue?: boolean
  width?: number
}

export const $InputNumber = styled.input<inputNumberInterface>`
  font-family: 'Neuzeit Grotesk';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 22px;
  border: none;
  outline: none;
  max-width: ${(props) => (props.width ? props.width : 'unset')};
  background-color: transparent;
  color: ${(props) => (props.wrongValue ? props.theme.palette.red : props.theme.dark.text)};
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::placeholder {
    color: white;
  }
`
