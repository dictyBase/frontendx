import React, { Component } from 'react'
import { Header, Footer } from 'dicty-components-header-footer'
import { Navbar } from 'dicty-components-navbar'
import { FooterLinks } from 'common/constants/Footer'
import { NavbarLinks } from 'common/constants/Navbar'
import Routes from 'Routes'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header 
          downloads="/downloads"
          info="/information"
          cite="/citation"
        />
        <Navbar items={ NavbarLinks } />
        <Routes />
        <Footer items={ FooterLinks } />
      </div>
    );
  }
}

export default App;
