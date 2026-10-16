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

const dictyThemeOptions = {
  // use color tool for palette -- https://material.io/resources/color/
  palette: {
    primary: {
      main: "#004080",
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
      fontSize: "2.00em",
      fontFamily: headerFontFamily,
    },
    h2: {
      fontSize: "1.50em",
      fontFamily: headerFontFamily,
    },
    h3: {
      fontSize: "1.17em",
      fontFamily: headerFontFamily,
    },
    h4: {
      fontSize: "1.00em",
      fontFamily: headerFontFamily,
    },
    h5: {
      fontSize: "0.83em",
      fontFamily: headerFontFamily,
    },
    h6: {
      fontSize: "0.67em",
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
          color: "#004080",
        },
      },
    },
  },
}
const dictyThemeOptionsV5: ThemeOptionsV5 = {
  // use color tool for palette -- https://material.io/resources/color/
  palette: {
    primary: {
      main: "#004080",
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
      fontSize: "2.00em",
      fontFamily: headerFontFamily,
    },
    h2: {
      fontSize: "1.50em",
      fontFamily: headerFontFamily,
    },
    h3: {
      fontSize: "1.17em",
      fontFamily: headerFontFamily,
    },
    h4: {
      fontSize: "1.00em",
      fontFamily: headerFontFamily,
    },
    h5: {
      fontSize: "0.83em",
      fontFamily: headerFontFamily,
    },
    h6: {
      fontSize: "0.67em",
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
      main: "#eceff4",
      light: "#ffffff",
      dark: "#e5e9f0",
      contrastText: "#2e3440",
    },
    secondary: {
      main: "#e5e9f0",
      light: "#eceff4",
      dark: "#d8dee9",
      contrastText: "#2e3440",
    },
    error: {
      main: "#bf616a",
      light: "#d08770",
      dark: "#8b3a42",
      contrastText: "#eceff4",
    },
    warning: {
      main: "#d08770",
      light: "#e0a882",
      dark: "#9a5c45",
      contrastText: "#2e3440",
    },
    success: {
      main: "#a3be8c",
      light: "#b8d0a5",
      dark: "#728f5e",
      contrastText: "#2e3440",
    },
    info: {
      main: "#88c0d0",
      light: "#a8d4e0",
      dark: "#5a8fa0",
      contrastText: "#2e3440",
    },
    tertiary: {
      main: "#5e81ac",
      light: "#ccd9e6",
      dark: "#3b5070",
      contrastText: "#eceff4",
    },
    background: {
      default: "#eceff4",
      paper: "#e5e9f0",
    },
    text: {
      primary: "#2e3440",
      secondary: "#4c566a",
    },
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
    h1: { fontSize: "2.00em", fontFamily: headerFontFamily },
    h2: { fontSize: "1.50em", fontFamily: headerFontFamily },
    h3: { fontSize: "1.17em", fontFamily: headerFontFamily },
    h4: { fontSize: "1.00em", fontFamily: headerFontFamily },
    h5: { fontSize: "0.83em", fontFamily: headerFontFamily },
    h6: { fontSize: "0.67em", fontFamily: headerFontFamily },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: { textDecoration: "none" },
      },
    },
    MuiButtonBase: { defaultProps: { color: "secondary" } },
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
          backgroundColor: "#d8dee9",
          color: "#2e3440",
        },
        indicator: {
          backgroundColor: "#5e81ac",
        },
      },
    },
  },
}

const dictyThemeV4 = createTheme(dictyThemeOptions as ThemeOptions)
const dictyThemeV5 = createThemeV5(dictyThemeOptionsV5)
const nordicThemeV5 = createThemeV5(nordicThemeOptionsV5)

export { dictyThemeV4, dictyThemeV5, dictyThemeOptions, nordicThemeV5 }
