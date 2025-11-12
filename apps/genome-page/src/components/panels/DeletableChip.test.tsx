import { vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { Either, right as Eright } from "fp-ts/Either"
import { DeletableChip } from "./DeletableChip"

const TEST_LABEL = "test-label"
const DELETE_CONFIRMATION_TEXT = `Delete ${TEST_LABEL}?`

test("should render chip with label in normal state", () => {
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  expect(screen.getByText(TEST_LABEL)).toBeInTheDocument()
})

test("should show confirmation state when delete icon is clicked", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
  })
})

test("should render confirm and cancel buttons in confirmation state", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: /confirm delete/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /cancel delete/i }),
    ).toBeInTheDocument()
  })
})

test("should render cancel button in confirmation state", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => TEright({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
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

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
  })

  const confirmButton = screen.getByRole("button", { name: /confirm delete/i })
  await user.click(confirmButton)

  await waitFor(() => {
    expect(mockHandleDelete).toHaveBeenCalledWith(TEST_LABEL)
  })
})

test("should show loading state when delete is in progress", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => (): Promise<Either<any, any>> =>
      new Promise((resolve) => {
        setTimeout(() => resolve(Eright({})), 100)
      }),
  )

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const deleteButton = screen.getByTestId("CancelIcon")
  await user.click(deleteButton)

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
  })

  const confirmButton = screen.getByRole("button", { name: /confirm delete/i })
  await user.click(confirmButton)

  await waitFor(() => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})
