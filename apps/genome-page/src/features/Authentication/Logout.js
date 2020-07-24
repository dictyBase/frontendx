import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import React, { Component } from "react"
import { logoutUser } from "./authActions"

/**
 * Allows the user to logout
 */

export class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser()
  }

  render() {
    return <Redirect to="/" />
  }
}

export default connect(null, { logoutUser })(Logout)
