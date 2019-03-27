import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"

import sadDicty from "../assets/sad-dicty.png"

const styles = (theme: Theme) => ({
  gridContainer: {
    marginTop: "33px",
  },
  paper: {
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    borderRadius: "15px",
    marginBottom: "10px",
    maxHeight: "500px",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      height: "350px",
    },
  },
})

/**
 * This is an ErrorBoundary wrapper that catches any JavaScript errors and provides a fallback UI.
 */

class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null }

  componentDidCatch(error: Error | null, errorInfo: object) {
    // catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { errorInfo, error } = this.state
    const { children, classes } = this.props as {
      children: React.ReactNode
      classes: {
        gridContainer: string
        paper: string
      }
    }

    if (errorInfo) {
      // error path
      return (
        <Grid className={classes.gridContainer} container justify="center">
          <Grid item xs={6} className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              <img src={sadDicty} alt="Sad Dicty Logo" />
              <h2>Sorry! There was an error loading this page.</h2>
              <p>Something went wrong behind the scenes.</p>
              {/*
                // @ts-ignore */}
              <em>{error && error.toString()}</em>
              <p>
                If the problem persists, please email us at{" "}
                <a href="mailto:dictybase@northwestern.edu">
                  dictybase@northwestern.edu
                </a>
                .
              </p>
            </div>
          </Grid>
        </Grid>
      )
    }
    // normally, just render children
    return children
  }
}

export default withStyles(styles)(ErrorBoundary)
