import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@material-ui/core"
import { DeleteButton } from "./DeleteButton"

type DeleteDialogProperties = {
  open: boolean
  onClose: () => void
}

const DeleteDialog = ({ open, onClose }: DeleteDialogProperties) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h1"> Delete Content </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this content?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DeleteButton />
        <Button onClick={onClose}> Cancel </Button>
      </DialogActions>
    </Dialog>
  )
}

export { DeleteDialog }
