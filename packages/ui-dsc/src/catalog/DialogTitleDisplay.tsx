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
}: DialogTitleDisplayProperties) => {
  return (
    <DialogTitle
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        margin: 0,
        padding: theme.spacing(2),
        fontSize: "2rem",
      })}
      id={title}>
      {title}
      <IconButton
        aria-label={title}
        sx={(theme) => ({
          position: "absolute",
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: "#fff",
        })}
        onClick={handleClose}>
        <FontAwesomeIcon icon="times" />
      </IconButton>
    </DialogTitle>
  )
}

export { DialogTitleDisplay }
