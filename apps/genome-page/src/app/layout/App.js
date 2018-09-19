import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"

import ErrorBoundary from "common/components/ErrorBoundary"
import fetchNavbar from "app/actions/navbarActions"
import fetchFooter from "app/actions/footerActions"
import footerItems from "common/constants/Footer"
import navbarItems from "common/constants/Navbar"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "common/utils/headerItems"
import Routes from "app/routes/Routes"
import MainBodyContainer from "styles/MainBodyContainer"

type Props = {
  /** Object representing auth part of state */
  auth: Object,
  /** Object representing navbar part of state */
  navbar: Object,
  /** Object representing footer part of state */
  footer: Object,
  /** Action creator to fetch navbar content */
  fetchNavbar: Function,
  /** Action creator to fetch footer content */
  fetchFooter: Function,
}

export class App extends Component<Props> {
  componentDidMount() {
    const { fetchNavbar, fetchFooter } = this.props
    fetchNavbar()
    fetchFooter()
  }

  render() {
    const { auth, navbar, footer } = this.props

    // if any errors, fall back to old link setup
    if (navbar.error || !navbar.links || footer.error || !footer.links) {
      return (
        <div>
          {auth.isAuthenticated ? (
            <Header items={loggedHeaderItems}>
              {items => items.map(generateLinks)}
            </Header>
          ) : (
            <Header items={headerItems}>
              {items => items.map(generateLinks)}
            </Header>
          )}
          <Navbar items={navbarItems} />
          <MainBodyContainer>
            <main>
              <ErrorBoundary>
                <Routes />
              </ErrorBoundary>
            </main>
          </MainBodyContainer>
          <Footer items={footerItems} />
        </div>
      )
    }

    return (
      <div>
        {auth.isAuthenticated ? (
          <Header items={loggedHeaderItems}>
            {items => items.map(generateLinks)}
          </Header>
        ) : (
          <Header items={headerItems}>
            {items => items.map(generateLinks)}
          </Header>
        )}
        <Navbar items={navbar.links} />
        <MainBodyContainer>
          <main>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </main>
        </MainBodyContainer>
        <Footer items={footer.links} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, navbar, footer }) => ({ auth, navbar, footer })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchNavbar, fetchFooter },
  )(App),
)
