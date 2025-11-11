import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { EditableInfoText } from "./EditableInfoText"

test("should render text content", () => {
  const mockSetIsEditing = vi.fn()
  const testText = "This is a test description"

  render(<EditableInfoText text={testText} setIsEditing={mockSetIsEditing} />)

  expect(screen.getByText(testText)).toBeInTheDocument()
})

test("should render edit button", () => {
  const mockSetIsEditing = vi.fn()

  render(<EditableInfoText text="Some text" setIsEditing={mockSetIsEditing} />)

  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})

test("should call setIsEditing with true when edit button is clicked", async () => {
  const user = userEvent.setup()
  const mockSetIsEditing = vi.fn()

  render(<EditableInfoText text="Some text" setIsEditing={mockSetIsEditing} />)

  const editButton = screen.getByRole("button", { name: /edit/i })
  await user.click(editButton)

  expect(mockSetIsEditing).toHaveBeenCalledWith(true)
  expect(mockSetIsEditing).toHaveBeenCalledTimes(1)
})

test("should render empty text correctly", () => {
  const mockSetIsEditing = vi.fn()

  render(<EditableInfoText text="" setIsEditing={mockSetIsEditing} />)

  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})
