import { Component } from "react"
import { connect } from "react-redux"
import { oAuthLogin } from "./authActions"

type Props = {
  /** Function that handles the oAuth login process */
  oAuthLogin: Function
}

/** Sign in handler for the oAuth process */

class OauthSignHandler extends Component<Props> {
  onMessage = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    if (!event.data.provider) {
      return
    }
    this.props.oAuthLogin(event.data)
  }
  componentDidMount() {
    window.addEventListener("message", this.onMessage, false)
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.onMessage)
  }
  render() {
    return null
  }
}

export default connect(
  null,
  { oAuthLogin },
)(OauthSignHandler)
