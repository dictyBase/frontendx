import React from "react"
import { ApolloProvider } from "@apollo/client"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import { CssBaseline } from "@material-ui/core"
import { useGraphqlClient } from "@dictybase/data-access"

const logtoConfig: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
  scopes: [
    UserScope.Profile,
    UserScope.Email,
    UserScope.Phone,
    UserScope.CustomData,
    UserScope.Identities,
    "write:content",
    "edit:content",
    "delete:content",
    "roles",
  ],
  resources: [
    import.meta.env.VITE_APP_LOGTO_API_FIRST_RESOURCE,
    import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
  ],
}

const appTheme = createTheme({
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
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "2.00em",
    },
    h2: {
      fontSize: "1.50em",
    },
    h3: {
      fontSize: "1.17em",
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
})

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const client = useGraphqlClient({
    uri: `${import.meta.env.VITE_APP_GRAPHQL_SERVER}/graphql`,
  })

  return (
    <ApolloProvider client={client}>
      <LogtoProvider config={logtoConfig}>
        <MuiThemeProvider theme={appTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </LogtoProvider>
    </ApolloProvider>
  )
}

export { appTheme, AppProviders }
