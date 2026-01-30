type ErrorDisplayProperties = {
  title?: string
  message?: string
  details?: string
  supportEmail?: string
  handleNavigateHome: () => void
  handleReload: () => void
}

const mockErrorDisplayPropsArray: ErrorDisplayProperties[] = [
  {
    title: "Sorry, something went wrong.",
    message: "We encountered an error while processing your request.",
    details:
      "The server encountered an internal error and was unable to complete your request.",
    supportEmail: "dictybase@northwestern.edu",
    handleNavigateHome: () => {},
    handleReload: () => {},
  },
  {
    title: "Database Connection Error",
    message: "Unable to connect to the database.",
    details:
      "The application could not establish a connection to the database server. Please try again later.",
    supportEmail: "support@example.com",
    handleNavigateHome: () => {},
    handleReload: () => {},
  },
  {
    handleNavigateHome: () => {},
    handleReload: () => {},
  },
]

export { mockErrorDisplayPropsArray }
