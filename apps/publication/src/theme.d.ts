import type {} from "@mui/material/styles"

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
}
