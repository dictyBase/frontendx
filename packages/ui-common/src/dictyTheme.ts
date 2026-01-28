import { createTheme, DeprecatedThemeOptions, adaptV4Theme } from "@mui/material";
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

const dictyTheme = createTheme(adaptV4Theme(dictyThemeOptions as DeprecatedThemeOptions))

export { dictyTheme, dictyThemeOptions }
