import styled from 'styled-components'
import { $Text } from './text-theme'

interface IHighLightText {
  color: string
}

export const $HighLightText = styled($Text)<IHighLightText>`
  font-weight: 700;
  color: ${(props) => props.color};
`
