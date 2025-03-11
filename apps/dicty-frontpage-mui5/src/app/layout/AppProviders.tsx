import React from "react"
import { ApolloProvider } from "@apollo/client"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { ThemeProvider as MUI5ThemeProvider } from "@mui/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { dictyTheme } from "@dictybase/ui-common"

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
      <MUI5ThemeProvider theme={dictyTheme}>
        <MuiThemeProvider theme={dictyTheme}>{children}</MuiThemeProvider>
      </MUI5ThemeProvider>
    </ApolloProvider>
  )
}

export { AppProviders }
export { dictyTheme as appTheme } from "@dictybase/ui-common"
