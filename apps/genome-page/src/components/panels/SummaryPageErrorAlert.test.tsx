import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { SummaryPageErrorAlert } from "./SummaryPageErrorAlert"

const TEST_MESSAGE = "Test error message"

test("should render alert with message when open is true", () => {
  const mockHandleClose = vi.fn()

  render(
    <SummaryPageErrorAlert
      open
      message={TEST_MESSAGE}
      handleClose={mockHandleClose}
    />,
  )

  expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument()
})

test("should not render alert when open is false", () => {
  const mockHandleClose = vi.fn()

  render(
    <SummaryPageErrorAlert
      open={false}
      message={TEST_MESSAGE}
      handleClose={mockHandleClose}
    />,
  )

  expect(screen.queryByText(TEST_MESSAGE)).not.toBeInTheDocument()
})

test("should call handleClose when close button is clicked", async () => {
  const user = userEvent.setup()
  const mockHandleClose = vi.fn()

  render(
    <SummaryPageErrorAlert
      open
      message={TEST_MESSAGE}
      handleClose={mockHandleClose}
    />,
  )

  const closeButton = screen.getByRole("button", { name: /close/i })
  await user.click(closeButton)

  expect(mockHandleClose).toHaveBeenCalledTimes(1)
})

test("should render different error messages", () => {
  const mockHandleClose = vi.fn()
  const customMessage = "Custom error occurred"

  render(
    <SummaryPageErrorAlert
      open
      message={customMessage}
      handleClose={mockHandleClose}
    />,
  )

  expect(screen.getByText(customMessage)).toBeInTheDocument()
})
