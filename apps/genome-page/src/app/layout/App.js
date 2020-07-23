import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"

import ErrorBoundary from "common/components/ErrorBoundary"
import fetchNavbarAndFooter from "app/actions/navbarActions"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "common/utils/headerItems"
import footerItems from "common/constants/Footer"
import Routes from "app/routes/Routes"
import withDataFetching from "common/components/withDataFetching"
import AppErrorFallback from "./AppErrorFallback"
import { appStyles as styles, navTheme } from "./appStyles"

type Props = {
  /** Object representing auth part of state */
  auth: Object,
  /** Object representing navbar part of state */
  navbar: Object,
  /** Object representing footer part of state */
  footer: Object,
  /** Action that fetches both navbar and footer content */
  fetchNavbarAndFooter: Function,
}

/**
 * This is the main App component.
 * It is responsible for the main layout of the entire application.
 */

export const App = (props: Props) => {
  const { auth, navbar, footer, classes } = props

  let footerLinks = footerItems

  if (footer.links) {
    footerLinks = footer.links
  }

  return (
    <div className={classes.body}>
      {auth.isAuthenticated ? (
        <Header items={loggedHeaderItems}>
          {(items) => items.map(generateLinks)}
        </Header>
      ) : (
        <Header items={headerItems}>
          {(items) => items.map(generateLinks)}
        </Header>
      )}
      <Navbar theme={navTheme} items={navbar.links} />

      <main className={classes.main}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </main>

      <Footer items={footerLinks} />
    </div>
  )
}

const mapStateToProps: MapStateToProps<*, *, *> = ({
  auth,
  navbar,
  footer,
}) => ({ auth, navbar, footer })

const enhance = compose(
  withRouter,
  connect(mapStateToProps, null),
  withStyles(styles),
  withDataFetching(
    fetchNavbarAndFooter,
    "navbar",
    AppErrorFallback,
    AppErrorFallback,
  ),
)

export default enhance(App)
