import React, { Component } from 'react'
import { Header, Footer } from 'dicty-components-header-footer'
import { Navbar } from 'dicty-components-navbar'
import { FooterLinks } from './constants/Footer'
import { NavbarLinks } from './constants/Navbar'
import GoPageDisplay from './images/go-page-display.png'

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
        <img style={{maxWidth: '100%'}} src={GoPageDisplay} alt="Go Page Mockup"/>
        <Footer items={ FooterLinks } />
      </div>
    );
  }
}

export default App;
