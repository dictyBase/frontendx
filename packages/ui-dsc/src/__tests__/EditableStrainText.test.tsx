import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { EditableStrainText } from "../catalog/EditableStrainText"

test("should render text content and edit button", () => {
  const mockSetIsEditing = vi.fn()
  const testText = "This is a test summary"

  render(<EditableStrainText text={testText} setIsEditing={mockSetIsEditing} />)

  expect(screen.getByText(testText)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})

test("should render custom displayValue when provided", () => {
  const mockSetIsEditing = vi.fn()

  render(
    <EditableStrainText
      text="DBS0350762"
      displayValue={<a href="/strains/DBS0350762">AX2</a>}
      setIsEditing={mockSetIsEditing}
    />,
  )

  expect(screen.getByRole("link", { name: "AX2" })).toHaveAttribute(
    "href",
    "/strains/DBS0350762",
  )
})

test("should call setIsEditing with true when edit button is clicked", async () => {
  const user = userEvent.setup()
  const mockSetIsEditing = vi.fn()

  render(
    <EditableStrainText text="Some text" setIsEditing={mockSetIsEditing} />,
  )

  const editButton = screen.getByRole("button", { name: /edit/i })
  await user.click(editButton)

  expect(mockSetIsEditing).toHaveBeenCalledWith(true)
  expect(mockSetIsEditing).toHaveBeenCalledTimes(1)
})
