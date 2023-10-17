import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"

interface Props {
  location: {
    search: string
    pathname: string
  }
  match: {
    params: {
      provider: string
    }
  }
}

declare var process: {
  env: {
    REACT_APP_BASENAME: string
  }
}

// helper function to set redirect URL with basename if included
const redirectUrlGenerator = (basename: string) => {
  let url
  if (basename === "" || basename === "/") {
    url = `${window.location.origin}`
  } else if (basename.charAt(0) === "/") {
    url = `${window.location.origin}${basename}`
  } else {
    url = `${window.location.origin}/${basename}`
  }
  return url
}

/**
 * Callback that transfers the user to the login system
 */

export default class OauthCallback extends Component<Props> {
  componentDidMount() {
    window.opener.postMessage(
      {
        query: this.props.location.search,
        provider: this.props.match.params.provider,
        url: `${redirectUrlGenerator(process.env.REACT_APP_BASENAME)}${
          this.props.location.pathname
        }`,
      },
      window.location,
    )
    window.close()
  }
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <h1>Transferring to login system ........</h1>
        </Grid>
      </Grid>
    )
  }
}
