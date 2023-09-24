import { RouterProvider } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import { useGraphqlClient, useApolloClientCache } from "@dictybase/data-access"
import {
  listStrainsPagination,
  listStrainsWithAnnotationPagination,
} from "@dictybase/hook-dsc"
import { ApolloProvider } from "@apollo/client"
import "@fontsource/roboto"
import { Footer } from "@dictybase/footer"
import { Navbar } from "dicty-components-navbar"
import { navbarItems, formatNavbarData } from "./navbarItems"
import { navTheme } from "./themes"
import { ThemeProvider } from "./ThemeProvider"
import { dscRouter } from "./routes"
import { LogtoProvider, LogtoConfig } from "@logto/react"
import { HeaderWithAuth } from "./components/auth/HeaderWithAuth"
import { LoadingDisplay } from "@dictybase/ui-dsc"

const logtoConf: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  body: {
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#fff",
    "& h1, h2, h3, h4, h5, h6": {
      fontWeight: 500,
      lineHeight: 1.1,
    },
    "& h4, h5, h6": {
      marginTop: theme.spacing(1.2),
      marginBottom: theme.spacing(1.2),
    },
  },
}))

export const App = () => {
  const classes = useStyles()
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
      <LogtoProvider config={logtoConf}>
        <ThemeProvider>
          <CssBaseline />
          <div className={classes.body}>
            <HeaderWithAuth />
            <Navbar items={formatNavbarData(navbarItems)} theme={navTheme} />
            <main className={classes.main}>
              <Container maxWidth="lg">
                <RouterProvider
                  router={dscRouter}
                  fallbackElement={<LoadingDisplay rows={6} />}
                />
              </Container>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </LogtoProvider>
    </ApolloProvider>
  )
}
