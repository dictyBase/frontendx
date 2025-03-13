import React from "react"
import { ApolloProvider } from "@apollo/client"
import { MuiThemeProvider } from "@material-ui/core/styles"
import {
  ThemeProvider as MUI5ThemeProvider,
  createTheme,
} from "@mui/material/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { dictyTheme } from "@dictybase/ui-common"

const bodyFontFamily = "'Inter Variable', sans-serif"
const headerFontFamily = "'Poppins', sans-serif"

const dictyThemeMUI5 = createTheme({
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
    },
    h5: {
      fontSize: "0.83em",
    },
    h6: {
      fontSize: "0.67em",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
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
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none",
          color: "#004080",
        },
      },
    },
  },
})

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { cache, isInitializing } = useApolloClientCache({
    storage: storageType.INDEX,
    key: "DICTY-FRONTPAGE",
  })
  const client = useGraphqlClient({
    cache,
    uri: `${import.meta.env.VITE_APP_GRAPHQL_SERVER}/graphql`,
  })
  if (isInitializing) {
    return <CircularProgress />
  }
  return (
    <ApolloProvider client={client}>
      <MUI5ThemeProvider theme={dictyThemeMUI5}>
        <MuiThemeProvider theme={dictyTheme}>{children}</MuiThemeProvider>
      </MUI5ThemeProvider>
    </ApolloProvider>
  )
}

export { AppProviders }
export { dictyTheme as appTheme } from "@dictybase/ui-common"
