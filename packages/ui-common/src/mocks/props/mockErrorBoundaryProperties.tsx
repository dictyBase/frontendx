type ErrorBoundaryProperties = {
  children: React.ReactNode
}

const ErrorCausingComponent = () => {
  throw new Error("ErrorBoundary test")
}

const mockErrorBoundaryPropertiesArray: ErrorBoundaryProperties[] = [
  {
    children: <ErrorCausingComponent />,
  },
]

export { mockErrorBoundaryPropertiesArray }
