import React from "react"
import Alert from "@mui/lab/Alert"
import IconButton from "@mui/material/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"


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
        sx={{
          marginLeft: "5px",
          "&:hover": {
            backgroundColor: "transparent",
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        size="small"
        title="Copy ID to clipboard"
        aria-label="copy icon">
        <FontAwesomeIcon icon={faCopy} size="xs" />
      </IconButton>
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5px",
      }}>
        {snackbarOpen && (
          <Alert severity="success">ID successfully copied to clipboard</Alert>
        )}
      </div>
    </>
  )
}

export { DetailsHeaderCopyIcon }
