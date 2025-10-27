import { FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { Option, match as Omatch } from "fp-ts/Option"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const ConfirmDeleteDialog: FunctionComponent<{
  open: boolean
  selectedValue: Option<string>
  onClose: () => void
}> = ({ open, selectedValue, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      {pipe(
        selectedValue,
        Omatch(
          () => "Error",
          (value) => `Delete ${value}?`,
        ),
        (title) => (
          <Typography variant="h2">{title}</Typography>
        ),
      )}
    </DialogTitle>
    <DialogActions>
      <Button color="error"> Delete </Button>
      <Button color="inherit" onClick={onClose}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
)

export { ConfirmDeleteDialog }
