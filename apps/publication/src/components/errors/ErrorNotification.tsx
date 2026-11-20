import React from "react"
import { Theme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import SnackbarContent from "@mui/material/SnackbarContent"

type Properties = {
  /** The error message to display */
  error: string
}

/** Notification snackbar-style message if user hits some type of error */

const ErrorNotification = ({ error }: Properties) => (
  <Box mb={2} display="flex" justifyContent="center">
    <SnackbarContent
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.error.main,
        color: theme.palette.getContrastText(theme.palette.error.main),
      })}
      message={error}
    />
  </Box>
)

export { ErrorNotification }
