import React from "react"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  copyIcon: {
    marginLeft: "5px",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  id: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5px",
  },
}))

type DetailsHeaderCopyIconProperties = {
  /** Stock ID */
  id: string
}

/**
 * DetailsHeaderCopyIcon is the copy to clipboard icon in the header of every
 * stock details page.
 */

const DetailsHeaderCopyIcon = ({ id }: DetailsHeaderCopyIconProperties) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const classes = useStyles()

  const handleClick = () => {
    // eslint-disable-next-line compat/compat
    navigator.clipboard.writeText(id)
    setSnackbarOpen(true)
    // have snackbar automatically close after 2.5 seconds
    window.setTimeout(() => {
      setSnackbarOpen(false)
    }, 2500)
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        className={classes.copyIcon}
        size="small"
        title="Copy ID to clipboard"
        aria-label="copy icon">
        <FontAwesomeIcon icon="copy" size="xs" />
      </IconButton>
      <div className={classes.id}>
        {snackbarOpen && (
          <Alert severity="success">ID successfully copied to clipboard</Alert>
        )}
      </div>
    </>
  )
}

export { DetailsHeaderCopyIcon }
