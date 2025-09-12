import React from "react"
import { ApolloProvider } from "@apollo/client"
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { ThemeProvider } from "./ThemeProvider"

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
    import.meta.env.VITE_LOGTO_API_FIRST_RESOURCE,
    import.meta.env.VITE_LOGTO_API_SECOND_RESOURCE,
  ],
}

const cacheOptions = {
  storage: storageType.INDEX,
  key: "DICTY-PUBLICATION",
}

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { cache, isInitializing } = useApolloClientCache(cacheOptions)
  const client = useGraphqlClient({
    uri: `${import.meta.env.VITE_GRAPHQL_SERVER}/graphql`,
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
