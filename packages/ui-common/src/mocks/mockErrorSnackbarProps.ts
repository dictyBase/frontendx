type ErrorSnackbarProperties = {
  open: boolean
  message: string
  handleClose: () => void
}

const mockErrorSnackbarPropsArray: ErrorSnackbarProperties[] = [
  {
    open: true,
    message: "An error occurred while saving your changes.",
    handleClose: () => {},
  },
  {
    open: false,
    message: "Error message",
    handleClose: () => {},
  },
  {
    open: true,
    message: "Network error. Please check your connection.",
    handleClose: () => {},
  },
]

export { mockErrorSnackbarPropsArray }
