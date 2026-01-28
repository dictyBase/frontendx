import {
  Snackbar,
  IconButton,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material"
import { makeStyles } from "tss-react/mui"
import CloseIcon from "@mui/icons-material/Close"

type ErrorSnackbarProperties = {
  open: boolean
  message: string
  handleClose: () => void
}

const useStyles = makeStyles()({
  root: {
    minWidth: "20rem",
  },
})

const ErrorSnackbar = ({
  open,
  message,
  handleClose,
}: ErrorSnackbarProperties) => {
  const {
    classes: { root },
  } = useStyles()
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      action={
        <IconButton size="small" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }>
      <Alert severity="error" onClose={handleClose} className={root}>
        <AlertTitle>
          <Typography variant="h2"> Error </Typography>
        </AlertTitle>
        <Typography variant="h3">{message}</Typography>
      </Alert>
    </Snackbar>
  )
}

export { ErrorSnackbar }
