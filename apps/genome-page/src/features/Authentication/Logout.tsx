import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { logoutUser } from "./authActions"

type Props = {
  /** Logs the user out */
  logoutUser: Function
}

/**
 * Allows the user to logout
 */
export class Logout extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.logoutUser()
  }

  render() {
    return <Redirect to="/" />
  }
}

export default connect(null, { logoutUser })(Logout)
