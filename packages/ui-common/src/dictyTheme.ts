import { createTheme, ThemeOptions } from "@material-ui/core"
import {
  createTheme as createThemeV5,
  ThemeOptions as ThemeOptionsV5,
} from "@mui/material"
import { grey } from "@mui/material/colors"
import "@fontsource/poppins"
import "@fontsource-variable/inter"

const bodyFontFamily = "'Inter Variable', sans-serif"
const headerFontFamily = "'Poppins', sans-serif"

const DICTY_PRIMARY = "#004080"

const NORDIC_POLAR_NIGHT = "#2e3440"
const NORDIC_SNOW_PALE = "#f7fafc"
const NORDIC_SNOW_LIGHT = "#eceff4"
const NORDIC_SNOW_MID = "#e5e9f0"
const HEADING_FONT_SIZES = {
  h1: "2.00em",
  h2: "1.50em",
  h3: "1.17em",
  h4: "1.00em",
  h5: "0.83em",
  h6: "0.67em",
}

const dictyThemeOptions = {
  // use color tool for palette -- https://material.io/resources/color/
  palette: {
    primary: {
      main: DICTY_PRIMARY,
      light: "#476ab0",
      dark: "#001b53",
      contrastText: "#fff",
    },
    secondary: {
      main: "#008080",
      light: "#4cb0af",
      dark: "#005354",
    },
    error: {
      main: "#b2102f",
      light: "#ea4f58",
      dark: "#7b0008",
    },
  },
  typography: {
    fontFamily: bodyFontFamily,
    button: {
      textTransform: "none",
      fontFamily: headerFontFamily,
    },
    body1: {
      fontFamily: bodyFontFamily,
    },
    body2: {
      fontFamily: bodyFontFamily,
    },
    subtitle1: {
      fontFamily: bodyFontFamily,
      color: grey[500],
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: bodyFontFamily,
    },
    h1: {
      fontSize: HEADING_FONT_SIZES.h1,
      fontFamily: headerFontFamily,
    },
    h2: {
      fontSize: HEADING_FONT_SIZES.h2,
      fontFamily: headerFontFamily,
    },
    h3: {
      fontSize: HEADING_FONT_SIZES.h3,
      fontFamily: headerFontFamily,
    },
    h4: {
      fontSize: HEADING_FONT_SIZES.h4,
      fontFamily: headerFontFamily,
    },
    h5: {
      fontSize: HEADING_FONT_SIZES.h5,
      fontFamily: headerFontFamily,
    },
    h6: {
      fontSize: HEADING_FONT_SIZES.h6,
      fontFamily: headerFontFamily,
    },
  },
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#cce6ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
      },
    },
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: DICTY_PRIMARY,
        },
      },
    },
  },
}
const dictyThemeOptionsV5: ThemeOptionsV5 = {
  // use color tool for palette -- https://material.io/resources/color/
  palette: {
    primary: {
      main: DICTY_PRIMARY,
      light: "#476ab0",
      dark: "#001b53",
      contrastText: "#fff",
    },
    secondary: {
      main: "#008080",
      light: "#4cb0af",
      dark: "#005354",
    },
    error: {
      main: "#b2102f",
      light: "#ea4f58",
      dark: "#7b0008",
    },
  },
  typography: {
    fontFamily: bodyFontFamily,
    button: {
      textTransform: "none",
      fontFamily: headerFontFamily,
    },
    body1: {
      fontFamily: bodyFontFamily,
    },
    body2: {
      fontFamily: bodyFontFamily,
    },
    subtitle1: {
      fontFamily: bodyFontFamily,
      color: grey[900],
      fontSize: "1.1rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: bodyFontFamily,
    },
    h1: {
      fontSize: HEADING_FONT_SIZES.h1,
      fontFamily: headerFontFamily,
    },
    h2: {
      fontSize: HEADING_FONT_SIZES.h2,
      fontFamily: headerFontFamily,
    },
    h3: {
      fontSize: HEADING_FONT_SIZES.h3,
      fontFamily: headerFontFamily,
    },
    h4: {
      fontSize: HEADING_FONT_SIZES.h4,
      fontFamily: headerFontFamily,
    },
    h5: {
      fontSize: HEADING_FONT_SIZES.h5,
      fontFamily: headerFontFamily,
    },
    h6: {
      fontSize: HEADING_FONT_SIZES.h6,
      fontFamily: headerFontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none",
          // color: "#004080",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: "160px",
          textTransform: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#cce6ff",
          color: "#000",
        },
        indicator: {
          backgroundColor: "#858780",
        },
      },
    },
  },
}

const nordicThemeOptionsV5: ThemeOptionsV5 = {
  palette: {
    mode: "light",
    primary: {
      main: NORDIC_SNOW_LIGHT,
      light: NORDIC_SNOW_PALE,
      dark: NORDIC_SNOW_MID,
      contrastText: NORDIC_POLAR_NIGHT,
    },
    secondary: {
      main: NORDIC_SNOW_MID,
      light: NORDIC_SNOW_LIGHT,
      dark: "#d8dee9",
      contrastText: NORDIC_POLAR_NIGHT,
    },
    error: {
      main: "#bf616a",
      light: "#d08770",
      dark: "#8b3a42",
      contrastText: NORDIC_SNOW_LIGHT,
    },
    warning: {
      main: "#d08770",
      light: "#e0a882",
      dark: "#9a5c45",
      contrastText: NORDIC_POLAR_NIGHT,
    },
    success: {
      main: "#a3be8c",
      light: "#b8d0a5",
      dark: "#728f5e",
      contrastText: NORDIC_POLAR_NIGHT,
    },
    info: {
      main: "#88c0d0",
      light: "#a8d4e0",
      dark: "#5a8fa0",
      contrastText: NORDIC_POLAR_NIGHT,
    },
    tertiary: {
      main: "#5e81ac",
      light: "#ccd9e6",
      dark: "#3b5070",
      contrastText: NORDIC_SNOW_LIGHT,
    },
    background: {
      default: NORDIC_SNOW_LIGHT,
      paper: NORDIC_SNOW_MID,
    },
    text: {
      primary: NORDIC_POLAR_NIGHT,
      secondary: "#4c566a",
    },
    action: { selected: NORDIC_POLAR_NIGHT },
  },
  typography: {
    fontFamily: bodyFontFamily,
    button: {
      textTransform: "none",
      fontFamily: headerFontFamily,
      fontWeight: 600,
    },
    body1: { fontFamily: bodyFontFamily },
    body2: { fontFamily: bodyFontFamily },
    subtitle1: {
      fontFamily: bodyFontFamily,
      color: "#4c566a",
      fontSize: "1.1rem",
      fontWeight: 500,
    },
    subtitle2: { fontFamily: bodyFontFamily },
    h1: { fontSize: HEADING_FONT_SIZES.h1, fontFamily: headerFontFamily },
    h2: { fontSize: HEADING_FONT_SIZES.h2, fontFamily: headerFontFamily },
    h3: { fontSize: HEADING_FONT_SIZES.h3, fontFamily: headerFontFamily },
    h4: { fontSize: HEADING_FONT_SIZES.h4, fontFamily: headerFontFamily },
    h5: { fontSize: HEADING_FONT_SIZES.h5, fontFamily: headerFontFamily },
    h6: { fontSize: HEADING_FONT_SIZES.h6, fontFamily: headerFontFamily },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: { textDecoration: "none" },
      },
    },
    // MuiButtonBase: { defaultProps: { color: "secondary" } },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          borderColor: theme.palette.primary.contrastText,
          "&:hover": {
            borderColor: theme.palette.tertiary.dark,
            backgroundColor: theme.palette.tertiary.light,
          },
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: "160px",
          textTransform: "none",
        },
        selected: {
          color: NORDIC_POLAR_NIGHT,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: "#d8dee9",
          color: NORDIC_POLAR_NIGHT,
        }),
        indicator: {
          backgroundColor: "#5e81ac",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({ backgroundColor: theme.palette.common.white }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-checked": {
            color: theme.palette.action.selected,
          },
        }),
      },
    },
  },
}

const dictyThemeV4 = createTheme(dictyThemeOptions as ThemeOptions)
const dictyThemeV5 = createThemeV5(dictyThemeOptionsV5)
const nordicThemeV5 = createThemeV5(nordicThemeOptionsV5)

export { dictyThemeV4, dictyThemeV5, dictyThemeOptions, nordicThemeV5 }
