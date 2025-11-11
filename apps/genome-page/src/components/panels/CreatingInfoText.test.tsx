import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right } from "fp-ts/TaskEither"
import { CreatingInfoText } from "./CreatingInfoText"

const TEST_ID = "DDB_G0123456"
const mockCreate = vi.fn()

vi.mock("common/hooks/useAuthorizedCreateGeneGeneralInfo", () => ({
  useAuthorizedCreateGeneGeneralInfo: () => mockCreate,
}))

test("should render empty text field", () => {
  mockCreate.mockReturnValue(() => right({}))
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  const textField = screen.getByRole("textbox")
  expect(textField).toBeInTheDocument()
  expect(textField).toHaveValue("")
})

test("should autofocus text field when rendered", () => {
  mockCreate.mockReturnValue(() => right({}))
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  const textField = screen.getByRole("textbox")
  expect(textField).toHaveFocus()
})

test("should render save and cancel buttons", () => {
  mockCreate.mockReturnValue(() => right({}))
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should disable save button when text is empty", () => {
  mockCreate.mockReturnValue(() => right({}))
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  const saveButton = screen.getByRole("button", { name: /save/i })
  expect(saveButton).toBeDisabled()
})

test("should enable save button when text is entered", async () => {
  const user = userEvent.setup()
  mockCreate.mockReturnValue(() => right({}))
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  const textField = screen.getByRole("textbox")
  await user.type(textField, "New description")

  const saveButton = screen.getByRole("button", { name: /save/i })
  expect(saveButton).not.toBeDisabled()
})

test("should update text when typing", async () => {
  const user = userEvent.setup()
  mockCreate.mockReturnValue(() => right({}))
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  const textField = screen.getByRole("textbox")
  await user.type(textField, "New description")

  expect(textField).toHaveValue("New description")
})

test("should call setIsCreating with false when cancel is clicked", async () => {
  const user = userEvent.setup()
  mockCreate.mockReturnValue(() => right({}))
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  const textField = screen.getByRole("textbox")
  await user.type(textField, "New description")

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockSetIsCreating).toHaveBeenCalledWith(false)
})

test("should not call create when cancel is clicked", async () => {
  const user = userEvent.setup()
  const mockCreateFunction = vi.fn(() => right({}))
  mockCreate.mockReturnValue(mockCreateFunction)
  const mockSetIsCreating = vi.fn()

  render(<CreatingInfoText id={TEST_ID} setIsCreating={mockSetIsCreating} />)

  const textField = screen.getByRole("textbox")
  await user.type(textField, "New description")

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockCreateFunction).not.toHaveBeenCalled()
})
