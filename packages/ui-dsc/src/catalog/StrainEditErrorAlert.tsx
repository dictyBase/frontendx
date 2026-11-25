import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

type StrainEditErrorAlertProperties = {
  /** Whether the error snackbar is open */
  open: boolean
  /** Error message to display */
  message: string
  /** Callback to close the snackbar */
  handleClose: () => void
}

/**
 * Displays a dismissible error snackbar alert when a strain update fails.
 *
 * @param properties - Properties controlling open state, message, and close handler.
 * @returns The rendered Snackbar Alert component.
 */
const StrainEditErrorAlert = ({
  open,
  message,
  handleClose,
}: StrainEditErrorAlertProperties) => (
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

export { StrainEditErrorAlert, type StrainEditErrorAlertProperties }
