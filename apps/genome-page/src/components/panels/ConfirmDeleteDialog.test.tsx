import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { some, none } from "fp-ts/Option"
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog"

test("should not render when open is false", () => {
  const mockOnClose = vi.fn()
  const selectedValue = some("test-item")

  render(
    <ConfirmDeleteDialog
      open={false}
      selectedValue={selectedValue}
      onClose={mockOnClose}
    />,
  )

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
})

test("should render dialog when open is true", () => {
  const mockOnClose = vi.fn()
  const selectedValue = some("test-item")

  render(
    <ConfirmDeleteDialog
      open
      selectedValue={selectedValue}
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByRole("dialog")).toBeInTheDocument()
})

test("should display correct title when selectedValue is Some", () => {
  const mockOnClose = vi.fn()
  const selectedValue = some("test-item")

  render(
    <ConfirmDeleteDialog
      open
      selectedValue={selectedValue}
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByText("Delete test-item?")).toBeInTheDocument()
})

test("should display error title when selectedValue is None", () => {
  const mockOnClose = vi.fn()
  const selectedValue = none

  render(
    <ConfirmDeleteDialog
      open
      selectedValue={selectedValue}
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByText("Error")).toBeInTheDocument()
})

test("should render delete and cancel buttons", () => {
  const mockOnClose = vi.fn()
  const selectedValue = some("test-item")

  render(
    <ConfirmDeleteDialog
      open
      selectedValue={selectedValue}
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should call onClose when cancel button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnClose = vi.fn()
  const selectedValue = some("test-item")

  render(
    <ConfirmDeleteDialog
      open
      selectedValue={selectedValue}
      onClose={mockOnClose}
    />,
  )

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockOnClose).toHaveBeenCalledTimes(1)
})
