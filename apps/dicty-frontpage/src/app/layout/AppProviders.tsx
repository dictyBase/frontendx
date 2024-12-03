import React from "react"
import { ApolloProvider } from "@apollo/client"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
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
      <MuiThemeProvider theme={dictyTheme}>{children}</MuiThemeProvider>
    </ApolloProvider>
  )
}

export { dictyTheme as appTheme, AppProviders }
