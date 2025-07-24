import React from "react"
import { ApolloProvider } from "@apollo/client"
import {
  ThemeProvider as ThemeProviderMUI5,
  createTheme as createThemeV5,
  ThemeOptions as ThemeOptionsMUI5,
} from "@mui/material/styles"
import {
  MuiThemeProvider as MuiThemeProviderMUI4,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { dictyTheme, dictyThemeOptions } from "@dictybase/ui-common"

const dictyThemeMUI5 = createThemeV5(dictyThemeOptions as ThemeOptionsMUI5)

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: "dictybase",
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
        <ThemeProviderMUI5 theme={dictyThemeMUI5}>
          <MuiThemeProviderMUI4 theme={dictyTheme}>
            {children}
          </MuiThemeProviderMUI4>
        </ThemeProviderMUI5>
      </StylesProvider>
    </ApolloProvider>
  )
}

export { AppProviders }
export { dictyTheme as appTheme } from "@dictybase/ui-common"
