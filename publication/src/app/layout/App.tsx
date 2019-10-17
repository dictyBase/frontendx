import React, { Component } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import {
  faDownload,
  faEnvelope,
  faExternalLinkAlt,
  faExclamationCircle,
  faInfoCircle,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"

import ErrorBoundary from "../../common/components/ErrorBoundary"
import fetchNavbarAndFooter from "../actions/navbarActions"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "../../common/utils/headerItems"
import footerItems from "../../common/constants/footer"
import navItems from "../../common/constants/navbar"
import Routes from "../routes/Routes"
import { appStyles as styles, navTheme } from "./appStyles"

// define fontawesome icons used in the app
library.add(
  faDownload,
  faEnvelope,
  faExclamationCircle,
  faExternalLinkAlt,
  faInfoCircle,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
  faTwitter,
)

interface Props {
  /** Object representing auth part of state */
  auth: {
    isAuthenticated: boolean
  }
  /** Object representing navbar part of state */
  navbar: {
    links: object
  }
  /** Object representing footer part of state */
  footer: {
    links: Array<Array<object>>
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

export class App extends Component<Props, {}> {
  componentDidMount() {
    const { fetchNavbarAndFooter } = this.props
    fetchNavbarAndFooter()
  }

  render() {
    const { auth, navbar, footer, classes } = this.props

    let headerContent = headerItems
    if (auth.isAuthenticated) {
      headerContent = loggedHeaderItems
    }
    // if any errors, fall back to old link setup
    const navbarContent = !navbar.links ? navItems : navbar.links
    const footerContent = !footer.links ? footerItems : footer.links

    return (
      <div className={classes.body}>
        <Header items={headerContent}>
          {items => items.map(generateLinks)}
        </Header>
        <Navbar theme={navTheme} items={navbarContent} />
        <main className={classes.main}>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </main>
        <Footer items={footerContent} />
      </div>
    )
  }
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
    { fetchNavbarAndFooter },
  ),
  withStyles(styles),
)

export default enhance(App) as React.ComponentType
