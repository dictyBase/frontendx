import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import { useFooter, useNavbar } from "dicty-hooks"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import ErrorBoundary from "common/components/ErrorBoundary"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "common/utils/headerItems"
import Routes from "app/routes/Routes"

const useStyles = makeStyles({
  main: {
    margin: "0 10px 25px 10px",
  },
  body: {
    margin: "auto",
    height: "100%",
    width: "100%",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    lineHeight: 1.42857,
    color: "#333",
    backgroundColor: "#fff",
    boxSizing: "content-box",
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto",
  },
})

const navTheme = {
  primary: "#004080",
  secondary: "#0059b3",
}

type HeaderItem = {
  isRouter?: boolean
  text: string
  icon: IconProp
  url: string
}

/**
 * App is responsible for the main layout of the entire application.
 */

export const App = ({ auth }: any) => {
  const classes = useStyles()
  const { navbarData } = useNavbar()
  const { footerData } = useFooter()

  const headerContent = auth.isAuthenticated ? loggedHeaderItems : headerItems

  return (
    <div className={classes.body}>
      <Header items={headerContent}>
        {(items: Array<HeaderItem>) => items.map(generateLinks)}
      </Header>
      <Navbar items={navbarData} theme={navTheme} />
      <main className={classes.main}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </main>
      <Footer items={footerData} />
    </div>
  )
}

const mapStateToProps = ({ auth }: any) => ({ auth })

export default withRouter(connect(mapStateToProps, null)(App))
