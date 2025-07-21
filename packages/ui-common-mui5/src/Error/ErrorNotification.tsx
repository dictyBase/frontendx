import { Theme } from "@mui/material/styles"
import makeStyles from "@mui/styles/makeStyles"
import Box from "@mui/material/Box"
import SnackbarContent from "@mui/material/SnackbarContent"

const useStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
}))

type Properties = {
  /** The error message to display */
  error: string
}

/** Notification snackbar-style message if user hits some type of error */

const ErrorNotification = ({ error }: Properties) => {
  const classes = useStyles()

  return (
    <Box mb={2} display="flex" justifyContent="center">
      <SnackbarContent className={classes.snackbar} message={error} />
    </Box>
  )
}

export { ErrorNotification }
