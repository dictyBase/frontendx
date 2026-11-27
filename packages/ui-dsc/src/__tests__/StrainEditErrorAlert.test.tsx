import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { StrainEditErrorAlert } from "../catalog/StrainEditErrorAlert"

const TEST_MESSAGE = "Test error message"

test("should render alert with message when open is true", () => {
  const mockHandleClose = vi.fn()

  render(
    <StrainEditErrorAlert
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
    <StrainEditErrorAlert
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
    <StrainEditErrorAlert
      open
      message={TEST_MESSAGE}
      handleClose={mockHandleClose}
    />,
  )

  const closeButton = screen.getByRole("button", { name: /close/i })
  await user.click(closeButton)

  expect(mockHandleClose).toHaveBeenCalledTimes(1)
})
