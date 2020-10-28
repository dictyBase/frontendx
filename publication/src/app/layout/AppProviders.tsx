import React from "react"
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import useApolloClient from "common/hooks/useApolloClient"

const muiTheme = createMuiTheme({
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
          "&:hover": {
            color: "#001b53",
          },
        },
      },
    },
  },
})

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const client = useApolloClient()

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={muiTheme}>
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
          {children}
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export default AppProviders
