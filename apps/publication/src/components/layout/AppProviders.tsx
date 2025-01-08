import React from "react"
import { ApolloProvider } from "@apollo/client"
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { dictyTheme } from "@dictybase/ui-common"

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

const cacheOptions = {
  storage: storageType.INDEX,
  key: "DICTY-PUBLICATION",
}

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { cache, isInitializing } = useApolloClientCache(cacheOptions)
  const client = useGraphqlClient({
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER}/graphql`,
    cache,
  })

  if (isInitializing) {
    return <CircularProgress />
  }

  return (
    <LogtoProvider config={logtoConfig}>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={dictyTheme}>{children}</MuiThemeProvider>
      </ApolloProvider>
    </LogtoProvider>
  )
}

export { AppProviders }
