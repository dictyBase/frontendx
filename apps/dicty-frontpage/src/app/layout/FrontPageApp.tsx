import { RouterProvider } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { HeaderWithAuth } from "auth"
import { NavbarWithAuth } from "./NavbarWithAuth"
import { FooterWithAuth } from "./FooterWithAuth"
import { ErrorBoundary } from "../../common/components/errors/ErrorBoundary"
import { frontpageRouter } from "../../routes"

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

/**
 * App is responsible for the main layout of the entire application.
 */

const FrontPageApp = () => {
  const classes = useStyles()

  return (
    <div className={classes.body}>
      <HeaderWithAuth clientRouter={frontpageRouter} />
      <NavbarWithAuth />
      <main className={classes.main}>
        <Container maxWidth="xl">
          <ErrorBoundary>
            <RouterProvider router={frontpageRouter} />
          </ErrorBoundary>
        </Container>
      </main>
      <FooterWithAuth />
    </div>
  )
}

export { FrontPageApp }
