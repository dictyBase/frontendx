import React, { Component } from "react"
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
import Routes from "app/routes/Routes"
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

export class App extends Component<Props> {
  componentDidMount() {
    const { fetchNavbarAndFooter } = this.props

    fetchNavbarAndFooter()
  }

  render() {
    const { auth, navbar, footer, classes } = this.props

    // if any errors, fall back to old link setup
    if (navbar.error || !navbar.links || footer.error || !footer.links) {
      return <AppErrorFallback />
    }

    return (
      <div className={classes.body}>
        {auth.isAuthenticated ? (
          <Header items={loggedHeaderItems}>
            {items => items.map(generateLinks)}
          </Header>
        ) : (
          <Header items={headerItems}>
            {items => items.map(generateLinks)}
          </Header>
        )}
        <Navbar theme={navTheme} items={navbar.links} />

        <main className={classes.main}>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </main>

        <Footer items={footer.links} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, navbar, footer }) => ({ auth, navbar, footer })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchNavbarAndFooter },
  )(withStyles(styles)(App)),
)
