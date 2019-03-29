import React from "react"
import { withStyles } from "@material-ui/core/styles"
import SnackbarContent from "@material-ui/core/SnackbarContent"

const styles = () => ({
  message: {
    backgroundColor: "#cc0000",
  },
})

interface Props {
  /** The error message to display */
  error: object
  /** Material-UI styling */
  classes: {
    message: string
  }
}

/** Notification snackbar-style message if user hits some type of error */

export const ErrorNotification = (props: Props) => {
  const { classes, error } = props

  return (
    <div style={{ textAlign: "center" }}>
      <SnackbarContent className={classes.message} message={error} />
      <br />
      <br />
    </div>
  )
}

export default withStyles(styles)(ErrorNotification)
