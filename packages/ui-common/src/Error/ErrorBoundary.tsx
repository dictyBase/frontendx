import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles, Theme } from "@material-ui/core/styles"

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

type Properties = {
  /** Material-UI styling */
  classes: {
    gridContainer: string
    paper: string
  }
  /** Any children to render */
  children: React.ReactNode
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

class _ErrorBoundary extends Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  override componentDidCatch(error: Error, errorInfo: object) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo)
  }

  override render() {
    const { hasError } = this.state
    const { children, classes } = this.props

    if (hasError) {
      return (
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="center">
          <Grid item xs={6} className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://storage.dictybase.dev/editor/assets/2024-06-10/bd362d90-6a23-44a3-a5b4-fbaaaa5117bd"
                alt="Sad Dicty Logo"
              />
              <h2>Sorry! There was an error loading this page.</h2>
              <p>Something went wrong behind the scenes.</p>
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

    return children
  }
}

const ErrorBoundary = withStyles(styles)(_ErrorBoundary)

export { ErrorBoundary }
