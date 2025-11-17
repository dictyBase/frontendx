import { FunctionComponent } from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

type SummaryPageErrorAlertProperties = {
  open: boolean
  message: string
  handleClose: () => void
}

const SummaryPageErrorAlert: FunctionComponent<
  SummaryPageErrorAlertProperties
> = ({ open, message, handleClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
)

export { SummaryPageErrorAlert }
