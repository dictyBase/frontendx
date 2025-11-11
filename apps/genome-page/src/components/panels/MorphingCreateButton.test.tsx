import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right } from "fp-ts/TaskEither"
import { MorphingCreateButton } from "./MorphingCreateButton"

test("should render create button with icon in collapsed state", () => {
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  expect(createButton).toBeInTheDocument()
  expect(screen.getByTestId("AddIcon")).toBeInTheDocument()
})

test("should expand when create button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  await waitFor(() => {
    expect(screen.getByPlaceholderText(/add new item/i)).toBeInTheDocument()
  })
})

test("should focus input field when expanded", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  await waitFor(() => {
    const input = screen.getByPlaceholderText(/add new item/i)
    expect(input).toHaveFocus()
  })
})

test("should render confirmation button in expanded state", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: /save new tag/i }),
    ).toBeInTheDocument()
  })
})

test("should update input value when typing", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, "test value")

  expect(input).toHaveValue("test value")
})

test("should call onAdd with trimmed value when Enter key is pressed", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, "  test value  ")
  await user.keyboard("{Enter}")

  await waitFor(() => {
    expect(mockOnAdd).toHaveBeenCalledWith("test value")
  })
})

test("should call onAdd when confirmation button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, "test value")

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  await waitFor(() => {
    expect(mockOnAdd).toHaveBeenCalledWith("test value")
  })
})

test("should show loading state when add operation is in progress", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(right({})), 100)
      }) as any,
  )

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, "test value")

  const saveButton = screen.getByRole("button", { name: /save new tag/i })
  await user.click(saveButton)

  await waitFor(() => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })
})

test("should disable input when loading", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(right({})), 100)
      }) as any,
  )

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, "test value")
  await user.keyboard("{Enter}")

  await waitFor(() => {
    expect(input).toBeDisabled()
  })
})

test("should not collapse when blur occurs with non-empty input", async () => {
  const user = userEvent.setup()
  const mockOnAdd = vi.fn(() => right({}))

  render(<MorphingCreateButton onAdd={mockOnAdd} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const input = await screen.findByPlaceholderText(/add new item/i)
  await user.type(input, "test value")
  await user.click(document.body)

  expect(screen.getByPlaceholderText(/add new item/i)).toBeInTheDocument()
})
