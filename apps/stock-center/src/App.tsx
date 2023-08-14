import { Fragment } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import { useGraphqlClient, useApolloClientCache } from "@dictybase/data-access"
import { listStrainsPagination } from "@dictybase/hook-dsc"
import { ApolloProvider } from "@apollo/client"
import { Header } from "@dictybase/header"
import { Footer } from "@dictybase/footer"
import { ThemeProvider } from "./ThemeProvider"
import { routes } from "./routes"

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
    uri: import.meta.env.REACT_APP_GRAPHQL_SERVER as string,
    cache: useApolloClientCache({
      customPolicies: {
        Query: {
          fields: {
            listStrains: listStrainsPagination(),
          },
        },
      },
    }),
  })
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <CssBaseline />
          <div className={classes.body}>
            <Header />
            <main className={classes.main}>
              <Container maxWidth="lg">
                <Routes>
                  <Route path="/" element={<Navigate to="/strains" />} />
                  {routes.map(({ path, component: Component = Fragment }) => {
                    const element = <Component />
                    return <Route key={path} path={path} element={element} />
                  })}
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
