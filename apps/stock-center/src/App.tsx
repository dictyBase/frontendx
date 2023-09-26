import { Fragment } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import { Header } from "@dictybase/header"
import { Footer } from "@dictybase/footer"
import { Navbar } from "@dictybase/navbar"
import { NotFoundError } from "@dictybase/ui-dsc"
import { navbarItems, formatNavbarData } from "./navbarItems"
import { navTheme } from "./themes"
import { ThemeProvider } from "./ThemeProvider"
import { routes } from "./routes"
import { HeaderRow } from "./components/HeaderRow"

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
    <BrowserRouter basename={import.meta.env.VITE_APP_BASENAME}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <CssBaseline />
          <div className={classes.body}>
            <Header />
            <Navbar items={formatNavbarData(navbarItems)} theme={navTheme} />
            <main className={classes.main}>
              <Container maxWidth="lg">
                <HeaderRow />
                <Routes>
                  {routes.map(({ path, component: Component = Fragment }) => {
                    const element = <Component />
                    return <Route key={path} path={path} element={element} />
                  })}
                  <Route path="*" element={<NotFoundError />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}
