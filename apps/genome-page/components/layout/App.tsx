import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import { useFetch } from "dicty-hooks"
import { ErrorBoundary } from "components/errors/ErrorBoundary"
import { headerItems, HeaderLinks } from "common/utils/headerItems"
import {
  footerLinks,
  footerURL,
  convertFooterData,
  FooterItems,
} from "common/utils/footerItems"
import {
  navbarItems,
  NavbarItems,
  navbarURL,
  formatNavbarData,
} from "common/utils/navbarItems"
import { navTheme, headerTheme, footerTheme } from "common/utils/themes"

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

const App = ({ children }: { children: React.ReactNode }) => {
  const navbar = useFetch<NavbarItems>(navbarURL, navbarItems)
  const footer = useFetch<FooterItems>(footerURL, footerLinks)
  const classes = useStyles()
  // const headerContent = isAuthenticated ? loggedHeaderItems : headerItems
  const headerContent = headerItems

  return (
    <div className={classes.body}>
      <Header items={headerContent} render={HeaderLinks} theme={headerTheme} />
      <Navbar items={formatNavbarData(navbar.data)} theme={navTheme} />
      <main className={classes.main}>
        <Container maxWidth="xl">
          <ErrorBoundary>{children}</ErrorBoundary>
        </Container>
      </main>
      {footer.data?.data && (
        <Footer
          links={convertFooterData(footer.data.data)}
          theme={footerTheme}
        />
      )}
    </div>
  )
}

export { App }
