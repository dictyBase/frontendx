import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "@dictybase/navbar"
import ErrorBoundary from "../errors/ErrorBoundary"
import { headerItems, HeaderLinks } from "./HeaderItems"
import { footerLinks, convertFooterData } from "../../common/utils/footerItems"
import { navTheme, headerTheme, footerTheme } from "../../common/utils/themes"

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
  const classes = useStyles()
  // const headerContent = isAuthenticated ? loggedHeaderItems : headerItems
  const headerContent = headerItems

  return (
    <div className={classes.body}>
      <Header items={headerContent} render={HeaderLinks} theme={headerTheme} />
      <Navbar theme={navTheme} />
      <main className={classes.main}>
        <Container>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Container>
      </main>
      <Footer links={convertFooterData(footerLinks.data)} theme={footerTheme} />
    </div>
  )
}

export { App }
