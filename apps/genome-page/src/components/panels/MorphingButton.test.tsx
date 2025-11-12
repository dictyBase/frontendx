import { vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { Either, right as Eright } from "fp-ts/Either"
import { MorphingButton } from "./MorphingButton"

const PLACEHOLDER_TEXT = "add new item"

const testInput = "test value"

test("should render plus icon button in collapsed state", () => {
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  expect(addButton).toBeInTheDocument()
  expect(screen.getByTestId("AddIcon")).toBeInTheDocument()
})

test("should expand when plus button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  await waitFor(() => {
    expect(screen.getByPlaceholderText(/add new item/i)).toBeInTheDocument()
  })
})

test("should focus input field when expanded", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  await waitFor(() => {
    const input = screen.getByPlaceholderText(/add new item/i)
    expect(input).toHaveFocus()
  })
})

test("should render confirmation button in expanded state", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: /save new tag/i }),
    ).toBeInTheDocument()
  })
})

test("should update input value when typing", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, testInput)

  expect(input).toHaveValue(testInput)
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
    expect(mockOnAdd).toHaveBeenCalledWith(testInput)
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
  await user.type(input, testInput)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  await waitFor(() => {
    expect(mockOnAdd).toHaveBeenCalledWith(testInput)
  })
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

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, testInput)

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  await waitFor(() => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
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

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, testInput)
  await user.keyboard("{Enter}")

  await waitFor(() => {
    expect(input).toBeDisabled()
  })
})

test("should not collapse when blur occurs with non-empty input", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => TEright({}))

  render(<MorphingButton onAdd={mockOnAdd} />)

  const addButton = screen.getByRole("button", { name: /add new tag/i })
  await user.click(addButton)

  const input = await screen.findByPlaceholderText(
    new RegExp(PLACEHOLDER_TEXT, "i"),
  )
  await user.type(input, testInput)
  await user.click(document.body)

  expect(screen.getByPlaceholderText(/add new item/i)).toBeInTheDocument()
})
