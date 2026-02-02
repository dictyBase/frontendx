type ErrorBoundaryProperties = {
  children: React.ReactNode
}

const mockErrorBoundaryPropertiesArray: ErrorBoundaryProperties[] = [
  {
    children: (
      <div>
        <h1>Welcome to the Application</h1>
        <p>This is a sample child component wrapped in ErrorBoundary.</p>
      </div>
    ),
  },
  {
    children: <p>Simple child content</p>,
  },
  {
    children: (
      <>
        <h2>Multiple Elements</h2>
        <p>This demonstrates multiple child elements.</p>
        <p>Additional information here.</p>
      </>
    ),
  },
]

export { mockErrorBoundaryPropertiesArray }
