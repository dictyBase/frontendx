import * as React from "react"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"

/**
 * Loading screen during the login process
 */

const AuthLoader = () => (
  <Grid container justify="center">
    <Grid item xs={12}>
      <div style={{ textAlign: "center" }}>
        <h1>Logging in...</h1>
        <br />
        <CircularProgress size={70} />
      </div>
    </Grid>
  </Grid>
)

export default AuthLoader
