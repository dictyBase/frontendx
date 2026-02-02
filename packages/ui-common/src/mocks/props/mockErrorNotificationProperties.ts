type ErrorNotificationProperties = {
  error: string
}

const mockErrorNotificationPropertiesArray: ErrorNotificationProperties[] = [
  {
    error: "An error occurred while processing your request.",
  },
  {
    error: "Failed to save changes. Please try again.",
  },
  {
    error: "Network connection error. Please check your internet connection.",
  },
]

export { mockErrorNotificationPropertiesArray }
