import { CssBaseline, CircularProgress } from "@material-ui/core"
import { useGraphqlClient, useApolloClientCache } from "@dictybase/data-access"
import {
  listStrainsPagination,
  listPlasmidsPagination,
  listStrainsWithAnnotationPagination,
} from "@dictybase/hook-dsc"
import { ApolloProvider } from "@apollo/client"
import "@fontsource/roboto"
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import { ThemeProvider } from "./ThemeProvider"
import { DscApp } from "./components/DscApp"

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

const cacheOptions = {
  customPolicies: {
    Query: {
      fields: {
        listStrains: listStrainsPagination(),
        listPlasmids: listPlasmidsPagination(),
        listStrainsWithAnnotation: listStrainsWithAnnotationPagination(),
      },
    },
  },
}

export const App = () => {
  const { cache, isInitializing } = useApolloClientCache(cacheOptions)
  const client = useGraphqlClient({
    uri: `${import.meta.env.VITE_APP_GRAPHQL_SERVER}/graphql`,
    cache,
  })
  if (isInitializing) {
    return <CircularProgress />
  }
  return (
    <ApolloProvider client={client}>
      <LogtoProvider config={logtoConfig}>
        <ThemeProvider>
          <CssBaseline />
          <DscApp />
        </ThemeProvider>
      </LogtoProvider>
    </ApolloProvider>
  )
}
