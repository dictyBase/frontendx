import { Theme } from "@mui/material/styles"
import { makeStyles } from "tss-react/mui"
import IconButton from "@mui/material/IconButton"
import DialogTitle from "@mui/material/DialogTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles()((theme: Theme) => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    margin: 0,
    padding: theme.spacing(2),
    fontSize: "1.3rem",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#fff",
  },
}))

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
  const { classes } = useStyles()

  return (
    <DialogTitle className={classes.dialogTitle} id={title}>
      {title}
      <IconButton
        aria-label={title}
        className={classes.closeButton}
        onClick={handleClose}
        size="large">
        <FontAwesomeIcon icon="times" />
      </IconButton>
    </DialogTitle>
  )
}

export { DialogTitleDisplay }
