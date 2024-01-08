import { RouterProvider } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Navbar } from "@dictybase/navbar"
import { HeaderWithAuth } from "auth"
import { useFetch } from "dicty-hooks"
import { FooterWithAuth } from "./FooterWithAuth"
import { ErrorBoundary } from "../../common/components/errors/ErrorBoundary"
import {
  navbarItems,
  NavbarItems,
  navbarURL,
  formatNavbarData,
} from "../../common/utils/navbarItems"
import { navTheme } from "../../common/utils/themes"
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
  const navbar = useFetch<NavbarItems>(navbarURL, navbarItems)
  const classes = useStyles()

  return (
    <div className={classes.body}>
      <HeaderWithAuth clientRouter={frontpageRouter} />
      <Navbar items={formatNavbarData(navbar.data)} theme={navTheme} />
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
