type OtherErrorProperties = {
  message?: string
}

const mockOtherErrorProps: OtherErrorProperties = {
  message: "An unexpected error occurred. Please try again later.",
}

const mockOtherErrorPropsNoMessage: OtherErrorProperties = {}

const mockOtherErrorPropsAuthError: OtherErrorProperties = {
  message: "Authentication failed. Please log in again.",
}

export {
  mockOtherErrorProps,
  mockOtherErrorPropsNoMessage,
  mockOtherErrorPropsAuthError,
}
