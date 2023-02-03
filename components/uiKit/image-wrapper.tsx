import styled from 'styled-components'

interface IImageWrapper {
  height: string
  width: string
}

export const $ImageWrapper = styled.div<IImageWrapper>`
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`
