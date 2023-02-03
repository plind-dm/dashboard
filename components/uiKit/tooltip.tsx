import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { $NormalTextRegular } from '../uiKit'

const TooltipBox = styled.div`
  position: absolute;
  background: ${(props) => props.theme.palette.black};
  border-radius: 6px;
  padding: 8px 16px;
  left: -27px;
  text-align: center;
  bottom: 45px;
  width: 86px;
  right: 0;
`
const Triangle = styled.div`
  display: block;
  position: absolute;
  border: 8px solid transparent;
  bottom: -16px;
  right: 50%;
  &::after {
    display: block;
    content: '';
    position: absolute;
    border: 7px solid transparent;
    border-top-color: ${(props) => props.theme.palette.black};
    top: -8px;
    left: 0px;
  }
`

export const Tooltip = ({ text, show }: { text: string; show: boolean }): ReactElement => {
  return show ? (
    <TooltipBox>
      <Triangle />
      <$NormalTextRegular>{text}</$NormalTextRegular>
    </TooltipBox>
  ) : (
    <></>
  )
}
