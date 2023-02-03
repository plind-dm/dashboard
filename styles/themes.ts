import { DefaultTheme } from 'styled-components'
import { paletteColors } from './colors'

export const defaultTheme: DefaultTheme = {
  light: {
    primary: paletteColors.darkPink,
    secondary: paletteColors.pink,
    text: paletteColors.black,
    background: paletteColors.white,
    blackModal: paletteColors.blackModal,
    sideBarHighlight: paletteColors.darkHighlight
  },
  dark: {
    primary: paletteColors.pink,
    secondary: paletteColors.darkPink,
    text: paletteColors.white,
    background: paletteColors.black,
    blackModal: paletteColors.blackModal,
    sideBarHighlight: paletteColors.darkHighlight
  },
  palette: paletteColors
}

export default defaultTheme
