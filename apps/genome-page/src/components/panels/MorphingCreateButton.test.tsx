import { vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { Either, right as Eright, left as Eleft } from "fp-ts/Either"
import { MorphingCreateButton } from "./MorphingCreateButton"

const TEST_VALUE = "test value"

test("should render create button with icon in collapsed state", () => {
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  expect(createButton).toBeInTheDocument()
  expect(screen.getByTestId("AddIcon")).toBeInTheDocument()
})

test("should expand when create button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  expect(screen.getByPlaceholderText(/add new item/i)).toBeInTheDocument()
})

test("should focus input field when expanded", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = screen.getByPlaceholderText(/add new item/i)
  expect(input).toHaveFocus()
})

test("should render confirmation button in expanded state", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  expect(
    screen.getByRole("button", { name: /save new tag/i }),
  ).toBeInTheDocument()
})

test("should update input value when typing", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)

  expect(input).toHaveValue(TEST_VALUE)
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

test("should show loading state when add operation is in progress", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => (): Promise<Either<any, any>> =>
      new Promise((resolve) => {
        setTimeout(() => resolve(Eright({})), 100)
      }),
  )

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})

test("should disable input when loading", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => (): Promise<Either<any, any>> =>
      new Promise((resolve) => {
        setTimeout(() => resolve(Eright({})), 100)
      }),
  )

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)
  await user.keyboard("{Enter}")

  expect(input).toBeDisabled()
})

test("should not collapse when blur occurs with non-empty input", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)
  await user.click(document.body)

  expect(screen.getByPlaceholderText(/add new item/i)).toBeInTheDocument()
})

test("should collapse when blur occurs with empty input", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  await user.click(document.body)

  expect(screen.getByRole("button", { name: /create/i })).toBeVisible()
})

test("should collapse and clear input when Escape key is pressed", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)
  await user.keyboard("{Escape}")

  expect(screen.getByRole("button", { name: /create/i })).toBeVisible()
})

test("should show error state when add operation fails", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => (): Promise<Either<any, any>> =>
      new Promise((resolve) => {
        setTimeout(() => resolve(Eleft(new Error("Failed"))), 50)
      }),
  )

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, TEST_VALUE)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  expect(mockOnAdd).toHaveBeenCalledWith(TEST_VALUE)

  // Wait for error state to appear (input should have error styling)
  await waitFor(() => {
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  // Wait for error to automatically clear after timeout (1000ms)
  await waitFor(
    () => {
      expect(input).toHaveAttribute("aria-invalid", "false")
    },
    { timeout: 1500 },
  )
})
