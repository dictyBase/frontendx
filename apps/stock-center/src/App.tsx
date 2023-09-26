import { CssBaseline } from "@material-ui/core"
import { useGraphqlClient, useApolloClientCache } from "@dictybase/data-access"
import {
  listStrainsPagination,
  listStrainsWithAnnotationPagination,
} from "@dictybase/hook-dsc"
import { ApolloProvider } from "@apollo/client"
import "@fontsource/roboto"
import { LogtoProvider, LogtoConfig } from "@logto/react"
import { ThemeProvider } from "./ThemeProvider"
import { DscApp } from "./components/DscApp"

const logtoConfig: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
}

export const App = () => {
  const client = useGraphqlClient({
    uri: import.meta.env.VITE_APP_GRAPHQL_SERVER as string,
    cache: useApolloClientCache({
      customPolicies: {
        Query: {
          fields: {
            listStrains: listStrainsPagination(),
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
