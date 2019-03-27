import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"

import ErrorBoundary from "../../common/components/ErrorBoundary"
import footerItems from "../../common/constants/footer"
import navbarItems from "../../common/constants/navbar"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "../../common/utils/headerItems"
import Routes from "../routes/Routes"
import { appStyles as styles, navTheme } from "./appStyles"

interface Props {
  /** Object representing auth part of state */
  auth: {
    isAuthenticated: boolean
  }
  /** Material-UI styling */
  classes: {
    main: string
    body: string
  }
}

/**
 * If there's an error fetching navbar and/or footer data,
 * this component is rendered with the static link data.
 */

const AppErrorFallback = (props: Props) => {
  const { auth, classes } = props

  return (
    <div className={classes.body}>
      {auth.isAuthenticated ? (
        <Header items={loggedHeaderItems}>
          {items => items.map(generateLinks)}
        </Header>
      ) : (
        <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
      )}
      <Navbar theme={navTheme} items={navbarItems} />

      <main className={classes.main}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </main>

      <Footer items={footerItems} />
    </div>
  )
}

const mapStateToProps = ({ auth }: Props) => ({ auth })

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
  // @ts-ignore
  withStyles(styles),
)

export default enhance(AppErrorFallback)
