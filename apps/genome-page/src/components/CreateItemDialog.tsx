import { FunctionComponent } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const CreateItemDialog: FunctionComponent<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <Typography variant="h2">Create</Typography>
    </DialogTitle>
    <DialogContent>
      <TextField />
    </DialogContent>
    <DialogActions>
      <Button color="success"> Create </Button>
      <Button color="inherit" onClick={onClose}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
)

export { CreateItemDialog }
