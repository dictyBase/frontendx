import React from "react"
import { ApolloProvider } from "@apollo/client"
import { ThemeProvider as ThemeProviderMUI5, Theme, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import StylesProvider from '@mui/styles/StylesProvider';
import createGenerateClassName from '@mui/styles/createGenerateClassName';
import CircularProgress from "@mui/material/CircularProgress"
import {
  useGraphqlClient,
  useApolloClientCache,
  storageType,
} from "@dictybase/data-access"
import { dictyThemeV4, dictyThemeV5 } from "@dictybase/ui-common"


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
    (<ApolloProvider client={client}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProviderMUI5 theme={dictyThemeV5}>
          <ThemeProvider theme={dictyThemeV4}>
            {children}
          </ThemeProvider>
        </ThemeProviderMUI5>
      </StylesProvider>
    </ApolloProvider>)
  );
}

export { AppProviders }
