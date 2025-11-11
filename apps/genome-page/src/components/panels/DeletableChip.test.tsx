import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right } from "fp-ts/TaskEither"
import { DeletableChip } from "./DeletableChip"

const TEST_LABEL = "test-label"
const CANCEL_ICON_SELECTOR = '[data-testid="CancelIcon"]'
const DELETE_CONFIRMATION_TEXT = `Delete ${TEST_LABEL}?`

test("should render chip with label in normal state", () => {
  const mockHandleDelete = vi.fn(() => right({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  expect(screen.getByText(TEST_LABEL)).toBeInTheDocument()
})

test("should show confirmation state when delete icon is clicked", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => right({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const chip = screen.getByText(TEST_LABEL)
  const deleteButton = chip.parentElement?.querySelector(CANCEL_ICON_SELECTOR)

  if (deleteButton) {
    await user.click(deleteButton)
  }

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
  })
})

test("should render confirm and cancel buttons in confirmation state", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => right({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const chip = screen.getByText(TEST_LABEL)
  const deleteButton = chip.parentElement?.querySelector(CANCEL_ICON_SELECTOR)

  if (deleteButton) {
    await user.click(deleteButton)
  }

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
  const mockHandleDelete = vi.fn(() => right({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const chip = screen.getByText(TEST_LABEL)
  const deleteButton = chip.parentElement?.querySelector(CANCEL_ICON_SELECTOR)

  if (deleteButton) {
    await user.click(deleteButton)
  }

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /cancel delete/i }),
    ).toBeInTheDocument()
  })
})

test("should call handleDelete when confirm button is clicked", async () => {
  const user = userEvent.setup()
  const mockHandleDelete = vi.fn(() => right({}))

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const chip = screen.getByText(TEST_LABEL)
  const deleteButton = chip.parentElement?.querySelector(CANCEL_ICON_SELECTOR)

  if (deleteButton) {
    await user.click(deleteButton)
  }

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
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(right({})), 100)
      }) as any,
  )

  render(<DeletableChip label={TEST_LABEL} handleDelete={mockHandleDelete} />)

  const chip = screen.getByText(TEST_LABEL)
  const deleteButton = chip.parentElement?.querySelector(CANCEL_ICON_SELECTOR)

  if (deleteButton) {
    await user.click(deleteButton)
  }

  await waitFor(() => {
    expect(screen.getByText(DELETE_CONFIRMATION_TEXT)).toBeInTheDocument()
  })

  const confirmButton = screen.getByRole("button", { name: /confirm delete/i })
  await user.click(confirmButton)

  await waitFor(() => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})
