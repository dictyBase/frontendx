import React from "react"
import { withStyles } from "@material-ui/core/styles"
import SnackbarContent from "@material-ui/core/SnackbarContent"

const styles = (theme) => ({
  message: {
    backgroundColor: "#cc0000",
  },
})

/** Notification snackbar-style message if user hits some type of error */

const ErrorNotification = ({ classes, error }) => (
  <center>
    <SnackbarContent className={classes.message} message={error} />
    <br />
    <br />
  </center>
)

export default withStyles(styles)(ErrorNotification)
