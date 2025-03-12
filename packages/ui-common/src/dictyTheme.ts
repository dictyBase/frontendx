/* eslint-disable sonarjs/no-duplicate-string */
import { createTheme, ThemeOptions } from "@material-ui/core"
import "@fontsource/poppins"
import "@fontsource-variable/inter"

const dictyThemeOptions: ThemeOptions = {
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
    fontFamily: "'Inter Variable', sans-serif",
    button: {
      textTransform: "none",
      fontFamily: "'Poppins', sans-serif",
    },
    body1: {
      fontFamily: "'Inter Variable', sans-serif",
    },
    body2: {
      fontFamily: "'Inter Variable', sans-serif",
    },
    h1: {
      fontSize: "2.00em",
      fontFamily: "'Poppins', sans-serif",
    },
    h2: {
      fontSize: "1.50em",
      fontFamily: "'Poppins', sans-serif",
    },
    h3: {
      fontSize: "1.17em",
      fontFamily: "'Poppins', sans-serif",
    },
    h4: {
      fontSize: "1.00em",
    },
    h5: {
      fontSize: "0.83em",
    },
    h6: {
      fontSize: "0.67em",
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

const dictyTheme = createTheme(dictyThemeOptions)

export { dictyTheme, dictyThemeOptions }
