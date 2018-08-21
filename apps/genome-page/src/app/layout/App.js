import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"

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
  fetchNavbarAction: Function,
  /** Action creator to fetch footer content */
  fetchFooterAction: Function,
}

export class App extends Component<Props> {
  componentDidMount() {
    const { fetchNavbarAction, fetchFooterAction } = this.props
    fetchNavbarAction()
    fetchFooterAction()
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
              <Routes />
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
            <Routes />
          </main>
        </MainBodyContainer>
        <Footer items={footer.links} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, navbar, footer }) => ({ auth, navbar, footer })

// why rename action creator?
// https://stackoverflow.com/questions/37682705/avoid-no-shadow-eslint-error-with-mapdispatchtoprops/42337137#42337137
export default withRouter(
  connect(
    mapStateToProps,
    { fetchNavbarAction: fetchNavbar, fetchFooterAction: fetchFooter },
  )(App),
)
