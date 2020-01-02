import React, { Component } from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import { Login as LoginContainer } from "dicty-components-login"
import OauthSignHandler from "./OauthSignHandler"
import oauthConfig from "../../common/utils/oauthConfig"
import ErrorNotification from "./ErrorNotification"

// list of buttons to display
const buttons = ["orcid", "google", "linkedin"]

// custom theme for styling the buttons
const theme = {
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 3,
        color: "white",
        width: "80%",
        justifyContent: "start",
        minHeight: "55px",
        marginBottom: "5px",
      },
    },
  },
}

interface Config {
  authorizationEndpoint: string
  clientId: string
  scopes: Array<string>
  scopeDelimiter: string
  requiredUrlParams: Array<string>
  optionalUrlParams: Array<string>
  redirectUrl: string
  popupOptions: {
    width: string
    height: string
  }
}

interface Props {
  /** Object passed by React-Router */
  location: {
    state: {
      error: {
        status: number
        title: string
      }
    }
  }
  /** Auth part of state */
  auth: {
    error: {
      status: number
      title: string
    }
  }
}

/**
 * Component that displays all of the social login buttons with click handlers for each one
 */
class Login extends Component<Props, {}> {
  handleClick = (name: string) => {
    const config: Config = (oauthConfig as any)[name]
    let url = `${config.authorizationEndpoint}?client_id=${config.clientId}`
    url += `&scope=${config.scopes.join(config.scopeDelimiter)}`
    if (config.requiredUrlParams) {
      config.requiredUrlParams.forEach((element: string) => {
        url += `&${element[0]}=${element[1]}`
      })
    }
    if (config.optionalUrlParams) {
      config.optionalUrlParams.forEach((element: string) => {
        url += `&${element[0]}=${element[1]}`
      })
    }
    url += `&redirect_uri=${config.redirectUrl}`
    window.open(
      url,
      name,
      `width=${config.popupOptions.width},
                    height=${config.popupOptions.height}`,
    )
  }
  render() {
    const { auth } = this.props
    const { state = {} } = this.props.location
    const { error }: any = state
    return (
      <Grid container justify="center">
        <Grid item>
          <div style={{ textAlign: "center" }}>
            <h1>Log in</h1>
          </div>
          {error && <ErrorNotification error={error} />}
          {auth.error && <ErrorNotification error={auth.error} />}
          <Grid container justify="center">
            <Grid item xs={2} />
            <Grid item xs={10} style={{ marginBottom: "20px" }}>
              <LoginContainer
                buttons={buttons}
                theme={theme}
                onClick={this.handleClick}
              />
              <OauthSignHandler />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ auth }: Props) => ({ auth })

export { Login }
export default connect(mapStateToProps)(Login)
