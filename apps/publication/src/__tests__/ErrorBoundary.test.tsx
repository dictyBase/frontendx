import { useEffect } from "react"
import { render, screen } from "@testing-library/react"
import ErrorBoundary from "../components/errors/ErrorBoundary"

const ErrorComponent = () => {
  useEffect(() => {
    throw new Error("My error")
  }, [])
  return <></>
}

const OkComponent = () => <h1>OK.</h1>

test("should render error component", () => {
  render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>,
  )

  expect(
    screen.getByText("Sorry! There was an error loading this page."),
  ).toBeInTheDocument()
})

test("should render non-error component", () => {
  render(
    <ErrorBoundary>
      <OkComponent />
    </ErrorBoundary>,
  )

  expect(screen.getByText("OK.")).toBeInTheDocument()
})
