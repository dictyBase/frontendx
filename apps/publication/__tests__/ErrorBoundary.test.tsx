import React from "react"
import { render, screen } from "@testing-library/react"
import ErrorBoundary from "../components/errors/ErrorBoundary"

const ErrComponent = () => {
  React.useEffect(() => {
    throw new Error("My error")
  }, [])
  return <></>
}

const OkComponent = () => <h1>OK.</h1>

describe("components/errors/ErrorBoundary", () => {
  it("should render error component", () => {
    render(
      <ErrorBoundary>
        <ErrComponent />
      </ErrorBoundary>,
    )

    expect(
      screen.getByText("Sorry! There was an error loading this page."),
    ).toBeInTheDocument()
  })

  it("should render non-error component", () => {
    render(
      <ErrorBoundary>
        <OkComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByText("OK.")).toBeInTheDocument()
  })
})
