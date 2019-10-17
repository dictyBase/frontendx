import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import SnackbarContent from "@material-ui/core/SnackbarContent"

const useStyles = makeStyles({
  message: {
    backgroundColor: "#cc0000",
  },
})

interface Props {
  /** The error message to display */
  error: {
    status: number
    title: string
  }
}

/** Notification snackbar-style message if user hits some type of error */

export const ErrorNotification = ({ error }: Props) => {
  const classes = useStyles()

  return (
    <div style={{ textAlign: "center" }}>
      <SnackbarContent className={classes.message} message={error.title} />
      <br />
      <br />
    </div>
  )
}

export default ErrorNotification
