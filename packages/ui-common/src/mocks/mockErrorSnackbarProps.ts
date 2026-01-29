type ErrorSnackbarProperties = {
  open: boolean
  message: string
  handleClose: () => void
}

const mockErrorSnackbarProps: ErrorSnackbarProperties = {
  open: true,
  message: "An error occurred while saving your changes.",
  handleClose: () => {},
}

const mockErrorSnackbarPropsClosed: ErrorSnackbarProperties = {
  open: false,
  message: "Error message",
  handleClose: () => {},
}

const mockErrorSnackbarPropsNetworkError: ErrorSnackbarProperties = {
  open: true,
  message: "Network error. Please check your connection.",
  handleClose: () => {},
}

export {
  mockErrorSnackbarProps,
  mockErrorSnackbarPropsClosed,
  mockErrorSnackbarPropsNetworkError,
}
