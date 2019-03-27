import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"

import ErrorBoundary from "../../common/components/ErrorBoundary"
import fetchNavbarAndFooter from "../actions/navbarActions"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "../../common/utils/headerItems"
import footerItems from "../../common/constants/footer"
import Routes from "../routes/Routes"
import withDataFetching from "../../common/components/withDataFetching"
import AppErrorFallback from "./AppErrorFallback"
import { appStyles as styles, navTheme } from "./appStyles"

interface Props {
  /** Object representing auth part of state */
  auth: {
    isAuthenticated: boolean
  }
  /** Object representing navbar part of state */
  navbar: {
    links: Object
  }
  /** Object representing footer part of state */
  footer: {
    links: Object
  }
  /** Action that fetches both navbar and footer content */
  fetchNavbarAndFooter: Function
  /** Material-UI styling */
  classes: {
    main: string
    body: string
  }
}

/**
 * This is the main App component.
 * It is responsible for the main layout of the entire application.
 */

export const App = (props: Props) => {
  const { auth, navbar, footer, classes } = props

  let footerLinks = footerItems

  if (footer.links) {
    // @ts-ignore
    footerLinks = footer.links
  }

  return (
    <div className={classes.body}>
      {auth.isAuthenticated ? (
        <Header items={loggedHeaderItems}>
          {items => items.map(generateLinks)}
        </Header>
      ) : (
        <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
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

const mapStateToProps = ({ auth, navbar, footer }: Props) => ({
  auth,
  navbar,
  footer,
})

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
  withStyles(styles),
  withDataFetching(
    fetchNavbarAndFooter,
    "navbar",
    // @ts-ignore
    AppErrorFallback,
    AppErrorFallback,
  ),
)

export default enhance(App)
