import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
        Delete Content
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
