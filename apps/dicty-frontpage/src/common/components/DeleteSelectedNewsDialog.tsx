import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core"

type DeleteDialogProperties = {
  open: boolean
  onClose: () => void
}

const DeleteSelectedNewsDialog = ({
  open,
  onClose,
}: DeleteDialogProperties) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Content</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this content?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}> Cancel </Button>
    </DialogActions>
  </Dialog>
)

export { DeleteSelectedNewsDialog }
