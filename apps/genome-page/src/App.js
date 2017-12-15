import React, { Component } from 'react'
import { Header, Footer } from 'dicty-components-header-footer'
import { Navbar } from 'dicty-components-navbar'
import { FooterLinks } from './constants/Footer'
import { NavbarLinks } from './constants/Navbar'
import Routes from './components/Routes'

class App extends Component {
  render() {
    return (
      <div>
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
