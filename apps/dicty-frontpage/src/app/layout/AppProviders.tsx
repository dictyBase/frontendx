import React from "react"
import { ApolloProvider } from "@apollo/client"
import { ThemeProvider as ThemeProviderMUI5, Theme } from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { dictyThemeV5 } from "@dictybase/ui-common"

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

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
      <ThemeProviderMUI5 theme={dictyThemeV5}>{children}</ThemeProviderMUI5>
    </ApolloProvider>
  )
}

export { AppProviders }
