import React from "react"
import { ApolloProvider } from "@apollo/client"
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import CircularProgress from "@material-ui/core/CircularProgress"
import { dictyTheme } from "@dictybase/ui-common"
import { ThemeProvider } from "./ThemeProvider"

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
  key: "DICTY-GENEPAGE",
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
        <ThemeProvider>{children}</ThemeProvider>
      </ApolloProvider>
    </LogtoProvider>
  )
}

export { AppProviders }
