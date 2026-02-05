import React, { Component } from "react"

type Properties = {
  /** Any children to render */
  children: React.ReactNode
}

type State = {
  /** If there is an error with JS code */
  hasError: boolean
}

/**
 * This is an ErrorBoundary wrapper that catches any
 * JavaScript errors and provides a fallback UI.
 * https://reactjs.org/docs/error-boundaries.html
 */

class ErrorBoundary extends Component<Properties, State> {
  constructor(properties: Properties) {
    super(properties)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  override componentDidCatch(error: Error, errorInfo: object) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo)
  }

  override render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}>
          <div>
            <img
              src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
              alt="Sad Dicty Logo"
            />
            <h2>Sorry! There was an error loading this page.</h2>
            <p>Something went wrong behind the scenes.</p>
            <p>
              If the problem persists, please email us at{" "}
              <a href="mailto:dictybase@northwestern.edu">
                dictybase@northwestern.edu
              </a>
              .
            </p>
          </div>
        </div>
      )
    }

    return children
  }
}

export { ErrorBoundary }
