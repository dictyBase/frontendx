import { vi, test, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { Either, left as Eleft } from "fp-ts/Either"
import { DeletableChip } from "../catalog/DeletableChip"
import {
  StrainUpdateErrorType,
  UpdateStrainError,
} from "../catalog/useAuthorizedUpdateStrain"

const TEST_LABEL = "test-label"
const DELETE_CONFIRMATION_TEXT = `Delete ${TEST_LABEL}?`

test("should render chip with label in normal state", () => {
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  expect(screen.getByText(TEST_LABEL)).toBeInTheDocument()
})

test("should render chip as link when href is provided", () => {
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(
    <DeletableChip
      label="sadA"
      href="/gene/sadA"
      handleDelete={mockHandleDelete}
    />,
  )

  const link = screen.getByRole("link", { name: "sadA" })
  expect(link).toHaveAttribute("href", "/gene/sadA")
})

test("should show confirmation state when delete icon is clicked", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /confirm delete/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /cancel delete/i }),
    ).toBeInTheDocument()
  })
})

test("should call handleDelete when confirm button is clicked", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  const confirmButton = await screen.findByRole("button", {
    name: /confirm delete/i,
  })
  await user.click(confirmButton)

  await waitFor(() => {
    expect(mockHandleDelete).toHaveBeenCalledWith(TEST_LABEL)
  })
})

test("should return to normal state without deleting when cancel button is clicked", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  const cancelButton = await screen.findByRole("button", {
    name: /cancel delete/i,
  })
  await user.click(cancelButton)

  expect(mockHandleDelete).not.toHaveBeenCalled()
})

test("should show error alert when delete operation fails", async () => {
  const user = userEvent.setup()
  const errorMessage = "Could not delete item"
  const mockHandleDelete = vi.fn(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => (): Promise<Either<UpdateStrainError, unknown>> =>
      new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(
              Eleft({
                errorType: StrainUpdateErrorType.UPDATE,
                message: errorMessage,
              }),
            ),
          30,
        )
      }),
  )

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  const confirmButton = await screen.findByRole("button", {
    name: /confirm delete/i,
  })
  await user.click(confirmButton)

  const alert = await screen.findByText(errorMessage)
  expect(alert).toBeInTheDocument()
})
