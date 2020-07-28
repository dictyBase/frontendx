import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import SnackbarContent from "@material-ui/core/SnackbarContent"

const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
  message: {
    backgroundColor: "#cc0000",
  },
})

type Props = {
  error: string
}

/** Notification snackbar-style message if user hits some type of error */

const ErrorNotification = ({ error }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SnackbarContent className={classes.message} message={error} />
      <br />
      <br />
    </div>
  )
}

export default ErrorNotification
