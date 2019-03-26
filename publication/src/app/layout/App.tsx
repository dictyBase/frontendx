import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import Routes from "../routes/Routes"

const App = () => (
  <div>
    <Header />
    <Navbar />
    <Router>
      <Routes />
    </Router>
    <Footer />
  </div>
)

export default App
