/* eslint-disable unicorn/prevent-abbreviations */
import "@mui/material/DialogTitle"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"]
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"]
  }
  interface PaletteColor {
    darker?: string
  }
  interface SimplePaletteColorOptions {
    darker?: string
  }
}

declare module "@mui/material/DialogTitle" {
  interface ButtonPropsColorOverrides {
    tertiary: true
  }
}
