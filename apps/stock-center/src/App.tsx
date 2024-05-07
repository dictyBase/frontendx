import { CssBaseline } from "@material-ui/core"
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

export const App = () => {
  const client = useGraphqlClient({
    uri: `${import.meta.env.VITE_APP_GRAPHQL_SERVER}/graphql`,
    cache: useApolloClientCache({
      customPolicies: {
        Query: {
          fields: {
            listStrains: listStrainsPagination(),
            listPlasmids: listPlasmidsPagination(),
            listStrainsWithAnnotation: listStrainsWithAnnotationPagination(),
          },
        },
      },
    }),
  })
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
