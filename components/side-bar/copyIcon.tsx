import React from 'react'
import styled from 'styled-components'

interface CopyIcon {
  onHoverBgColor: string
}

interface CopyIConContainer {
  bgColor: string
}

const $CopyIconContainer = styled.svg<CopyIConContainer>`
  &:hover #bg {
    fill: ${(props) => props.bgColor};
  }
`

export const CopyIcon: React.FC<CopyIcon> = ({ onHoverBgColor = '#4D4A53', ...props }: CopyIcon) => {
  return (
    <$CopyIconContainer
      bgColor={onHoverBgColor}
      {...props}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="bg"
        d="M0 6C0 2.68629 2.68629 0 6 0H24C27.3137 0 30 2.68629 30 6V24C30 27.3137 27.3137 30 24 30H6C2.68629 30 0 27.3137 0 24V6Z"
        fill="#27242E"
      />
      <path
        d="M11.7 13.9C11.7 12.685 12.685 11.7 13.9 11.7H20.5001C21.7151 11.7 22.7001 12.685 22.7001 13.9V20.5C22.7001 21.7151 21.7151 22.7 20.5001 22.7H13.9C12.685 22.7 11.7 21.7151 11.7 20.5V13.9Z"
        fill="#FAFAFA"
      />
      <path
        d="M9.50005 7.30005C8.28502 7.30005 7.30005 8.28502 7.30005 9.50005V16.1C7.30005 17.3151 8.28502 18.3 9.50005 18.3L9.50005 9.50005H18.3001C18.3001 8.28502 17.3151 7.30005 16.1 7.30005H9.50005Z"
        fill="#FAFAFA"
      />
    </$CopyIconContainer>
  )
}
export default CopyIcon
