import { ApolloProvider } from "@apollo/client"
import {
  MuiThemeProvider,
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles"
import { ThemeProvider as MUI5ThemeProvider } from "@mui/material/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { dictyTheme as dictyThemeMUI5 } from "@dictybase/ui-common-mui5"
import { dictyTheme as dictyThemeMUI4 } from "@dictybase/ui-common"

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: "dicty-mui-jss",
})

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
      <StylesProvider generateClassName={generateClassName}>
        <MUI5ThemeProvider theme={dictyThemeMUI5}>
          <MuiThemeProvider theme={dictyThemeMUI4}>{children}</MuiThemeProvider>
        </MUI5ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  )
}

export { AppProviders }
