import { render, screen } from "@testing-library/react"
import { ErrorNotification } from "../components/errors/ErrorNotification"

test("should display provided error message", () => {
  render(<ErrorNotification error="not a marine biologist" />)
  expect(screen.getByText(/not a marine biologist/)).toBeInTheDocument()
})
