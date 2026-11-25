import { vi, test, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { Either, right as Eright, left as Eleft } from "fp-ts/Either"
import { MorphingButton } from "../catalog/MorphingButton"
import {
  StrainUpdateErrorType,
  UpdateStrainError,
} from "../catalog/useAuthorizedUpdateStrain"

const PLACEHOLDER_TEXT = "add new item"
const TEST_INPUT = "test value"

test("should render plus icon button in collapsed state", () => {
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  expect(addButton).toBeInTheDocument()
  expect(screen.getByTestId("AddIcon")).toBeInTheDocument()
})

test("should expand and focus input when plus button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  await waitFor(() => {
    const input = screen.getByPlaceholderText(/add new item/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveFocus()
  })
})

test("should call onAdd with trimmed value when Enter key is pressed", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, "  test value  ")
  await user.keyboard("{Enter}")

  await waitFor(() => {
    expect(mockOnAdd).toHaveBeenCalledWith(TEST_INPUT)
  })
})

test("should call onAdd when confirmation button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, TEST_INPUT)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  await waitFor(() => {
    expect(mockOnAdd).toHaveBeenCalledWith(TEST_INPUT)
  })
})

test("should collapse and clear input when Escape key is pressed", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, TEST_INPUT)
  await user.keyboard("{Escape}")

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /add new tag/i })).toBeVisible()
  })
})

test("should show error alert when add operation fails", async () => {
  const user = userEvent.setup()
  const errorMessage = "Could not update strain data"
  const mockOnAdd = vi.fn(
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

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, TEST_INPUT)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  const alert = await screen.findByText(errorMessage)
  expect(alert).toBeInTheDocument()
  expect(input).toHaveAttribute("aria-invalid", "true")
})

test("should show loading state while add operation is pending", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => (): Promise<Either<UpdateStrainError, unknown>> =>
      new Promise((resolve) => {
        setTimeout(() => resolve(Eright({})), 100)
      }),
  )

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, TEST_INPUT)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  await waitFor(() => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})
