import { CssBaseline, CircularProgress } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import {
  listStrainsPagination,
  listPlasmidsPagination,
  listStrainsWithAnnotationPagination,
} from "@dictybase/hook-dsc"
import { ErrorBoundary } from "@dictybase/ui-common"
import { ApolloProvider } from "@apollo/client"
import "@fontsource/roboto"
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/react"
import { ThemeProvider } from "./ThemeProvider"
import { DscApp } from "./components/DscApp"
import { decodeUriComponentOrDefault } from "./decodeUriComponentOrDefault"

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
  storage: storageType.INDEX,
  key: "DICTY-STOCKCENTER",
  customPolicies: {
    Query: {
      fields: {
        listStrains: listStrainsPagination(),
        listPlasmids: listPlasmidsPagination(),
        listStrainsWithAnnotation: listStrainsWithAnnotationPagination(),
      },
    },
    Strain: {
      // Certain fields that contain the strain label may contain URI encoded components (a % followed by two hexadecimal digits).
      fields: {
        label: {
          read: decodeUriComponentOrDefault,
        },
        summary: {
          read: decodeUriComponentOrDefault,
        },
        genes: {
          read: (genes: Array<{ name: string }>) =>
            pipe(
              genes,
              Amap((gene) => ({
                ...gene,
                name: decodeUriComponentOrDefault(gene.name),
              })),
            ),
        },
        genotypes: {
          read: (genotypes: Array<string>) =>
            pipe(genotypes, Amap(decodeUriComponentOrDefault)),
        },
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
          <ErrorBoundary>
            <DscApp />
          </ErrorBoundary>
        </ThemeProvider>
      </LogtoProvider>
    </ApolloProvider>
  )
}
