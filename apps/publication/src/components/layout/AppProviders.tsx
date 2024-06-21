import React from "react"
import { ApolloProvider } from "@apollo/client"
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useCreateApolloClient } from "../../common/hooks/useCreateApolloClient"

const muiTheme = createMuiTheme({
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
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "#004080",
          "&:hover": {
            color: "#001b53",
          },
        },
      },
    },
  },
})

const logtoConfig: LogtoConfig = {
  endpoint: process.env.NEXT_PUBLIC_LOGTO_ENDPOINT,
  appId: process.env.NEXT_PUBLIC_LOGTO_APPID,
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
    process.env.NEXT_PUBLIC_LOGTO_API_FIRST_RESOURCE,
    process.env.NEXT_PUBLIC_LOGTO_API_SECOND_RESOURCE,
  ],
}

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { client, cacheInitializing } = useCreateApolloClient()

  if (cacheInitializing) {
    return <CircularProgress />
  }

  return (
    <LogtoProvider config={logtoConfig}>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </ApolloProvider>
    </LogtoProvider>
  )
}

export { AppProviders }
