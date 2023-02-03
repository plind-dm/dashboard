// styled.d.ts
import 'styled-components'
interface IPalette {
  primary: string
  secondary: string
  text: string
  background: string
  blackModal: string
  sideBarHighlight: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    light: IPalette
    dark: IPalette
    palette: any
  }
}
