import "@mui/material/styles"
import "@mui/material/Button"
import "@mui/material/IconButton"
import "@mui/material/SvgIcon"
import "@mui/material/Typography"
import "@mui/material/Chip"
import "@mui/material/Badge"
import "@mui/material/CircularProgress"

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"]
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"]
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    tertiary: true
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    tertiary: true
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    tertiary: true
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    tertiary: true
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    tertiary: true
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    tertiary: true
  }
}
