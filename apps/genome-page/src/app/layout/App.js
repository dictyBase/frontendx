import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import { FooterLinks } from "common/constants/footer"
import { NavbarLinks } from "common/constants/navbar"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "common/utils/headerItems"
import Routes from "Routes"
import MainBodyContainer from "styles/MainBodyContainer"
import type { MapStateToProps } from "react-redux"

export const App = props => {
  return (
    <div className="wrapper">
      {props.auth.isAuthenticated ? (
        <Header items={loggedHeaderItems}>
          {items => items.map(generateLinks)}
        </Header>
      ) : (
        <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
      )}
      <Navbar items={NavbarLinks} />
      <MainBodyContainer>
        <main>
          <Routes />
        </main>
      </MainBodyContainer>
      <Footer items={FooterLinks} />
    </div>
  )
}

const mapStateToProps: MapStateToProps<*, *, *> = ({ auth }) => ({ auth })

export default withRouter(connect(mapStateToProps)(App))
