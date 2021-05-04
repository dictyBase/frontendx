import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles, Theme } from "@material-ui/core/styles"
import sadDicty from "common/assets/sad-dicty.png"

const styles = (theme: Theme) => ({
  gridContainer: {
    marginTop: theme.spacing(4),
  },
  paper: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    backgroundColor: "#eff8fb",
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    maxHeight: "500px",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      height: "350px",
    },
  },
})

type Props = {
  /** Material-UI styling */
  classes: {
    gridContainer: string
    paper: string
  }
  /** Any children to render */
  children: any
}

type State = {
  /** If there is an error with JS code */
  hasError: boolean
}

/**
 * This is an ErrorBoundary wrapper that catches any
 * JavaScript errors and provides a fallback UI.
 * https://reactjs.org/docs/error-boundaries.html
 */

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: object) {
    console.error(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children, classes } = this.props

    if (hasError) {
      return (
        <Grid className={classes.gridContainer} container justify="center">
          <Grid item xs={6} className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              <img src={sadDicty} alt="Sad Dicty Logo" />
              <Typography variant="h2">
                Sorry! There was an error loading this page.
              </Typography>
              <Typography>Something went wrong behind the scenes.</Typography>
              <Typography>
                If the problem persists, please email us at{" "}
                <a href="mailto:dictybase@northwestern.edu">
                  dictybase@northwestern.edu
                </a>
                .
              </Typography>
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
