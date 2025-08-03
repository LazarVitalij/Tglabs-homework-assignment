import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    text: string
    background: string
    primary: string
    secondary: string
    accent: string
  }
}
