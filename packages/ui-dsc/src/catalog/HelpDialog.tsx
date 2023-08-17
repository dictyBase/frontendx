import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import { DialogTitleDisplay } from "./DialogTitleDisplay"
import { HelpDialogContent } from "./HelpDialogContent"

type HelpDialogProperties = {
  /** A boolean value that indicates whether the help dialog is open or not */
  helpDialogOpen: boolean
  /** A function that can be used to update the value of the helpDialogOpen property. */
  setHelpDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}
/**
 * HelpDialog is the dialog box that appears when the user clicks
 * the help icon in the catalog app bar.
 */

const HelpDialog = ({
  helpDialogOpen,
  setHelpDialogOpen,
}: HelpDialogProperties) => {
  const handleClose = () => {
    setHelpDialogOpen(false)
  }

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      aria-labelledby="help-dialog-title"
      open={helpDialogOpen}>
      <DialogTitleDisplay title="Catalog Page Help" handleClose={handleClose} />
      <HelpDialogContent />
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="default">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { HelpDialog }
