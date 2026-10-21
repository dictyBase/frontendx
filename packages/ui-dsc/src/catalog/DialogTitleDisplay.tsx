import IconButton from "@mui/material/IconButton"
import DialogTitle from "@mui/material/DialogTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type DialogTitleDisplayProperties = {
  /** Title to display at top of dialog */
  title: string
  /** Function to call when close button is clicked */
  handleClose: () => void
}

/**
 * DialogTitleDisplay is the title of a dialog box.
 */

const DialogTitleDisplay = ({
  title,
  handleClose,
}: DialogTitleDisplayProperties) => (
  <DialogTitle
    sx={(theme) => ({
      backgroundColor: theme.palette.secondary.main,
      padding: 3,
      fontSize: "1.3rem",
    })}
    id={title}>
    {title}
    <IconButton
      aria-label={title}
      sx={{
        position: "absolute",
        right: 1,
        top: 1,
      }}
      onClick={handleClose}
      size="large">
      <FontAwesomeIcon icon="times" />
    </IconButton>
  </DialogTitle>
)

export { DialogTitleDisplay }
