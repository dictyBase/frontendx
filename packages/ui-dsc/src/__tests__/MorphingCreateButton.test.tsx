import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { Either, left as Eleft } from "fp-ts/Either"
import { MorphingCreateButton } from "../catalog/MorphingCreateButton"
import {
  StrainUpdateErrorType,
  UpdateStrainError,
} from "../catalog/useAuthorizedUpdateStrain"

const TEST_VALUE = "test value"

test("should render create button with icon in collapsed state", () => {
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  expect(createButton).toBeInTheDocument()
  expect(screen.getByTestId("AddIcon")).toBeInTheDocument()
})

test("should expand and focus input when create button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = screen.getByPlaceholderText(/add new item/i)
  expect(input).toBeInTheDocument()
  expect(input).toHaveFocus()
})

test("should call onAdd with trimmed value when Enter key is pressed", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, `  ${TEST_VALUE}  `)
  await user.keyboard("{Enter}")

  expect(mockOnAdd).toHaveBeenCalledWith(TEST_VALUE)
})

test("should call onAdd when confirmation button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  expect(mockOnAdd).toHaveBeenCalledWith(TEST_VALUE)
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

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  const alert = await screen.findByText(errorMessage)
  expect(alert).toBeInTheDocument()
  expect(input).toHaveAttribute("aria-invalid", "true")
})
