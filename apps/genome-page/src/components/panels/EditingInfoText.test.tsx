import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right } from "fp-ts/TaskEither"
import { EditingInfoText } from "./EditingInfoText"

const TEST_ID = "DDB_G0123456"
const INITIAL_TEXT = "Initial description"
const mockUpdate = vi.fn()

vi.mock("common/hooks/useAuthorizedUpdateGeneGeneralInfo", () => ({
  useAuthorizedUpdateGeneGeneralInfo: () => mockUpdate,
}))

test("should render text field with initial text", () => {
  mockUpdate.mockReturnValue(() => right({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  expect(textField).toBeInTheDocument()
})

test("should autofocus text field when rendered", () => {
  mockUpdate.mockReturnValue(() => right({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  expect(textField).toHaveFocus()
})

test("should render save and cancel buttons", () => {
  mockUpdate.mockReturnValue(() => right({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should update text when typing", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(() => right({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  await user.clear(textField)
  await user.type(textField, "Updated description")

  expect(textField).toHaveValue("Updated description")
})

test("should disable save button when text is empty", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(() => right({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  await user.clear(textField)

  const saveButton = screen.getByRole("button", { name: /save/i })
  expect(saveButton).toBeDisabled()
})

test("should not call update when save is clicked without text changes", async () => {
  const user = userEvent.setup()
  const mockUpdateFunction = vi.fn(() => right({}))
  mockUpdate.mockReturnValue(mockUpdateFunction)
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const saveButton = screen.getByRole("button", { name: /save/i })
  await user.click(saveButton)

  expect(mockUpdateFunction).not.toHaveBeenCalled()
  expect(mockSetIsEditing).toHaveBeenCalledWith(false)
})

test("should call setIsEditing with false when cancel is clicked", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(() => right({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  await user.clear(textField)
  await user.type(textField, "Updated description")

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockSetIsEditing).toHaveBeenCalledWith(false)
})

test("should not call update when cancel is clicked", async () => {
  const user = userEvent.setup()
  const mockUpdateFunction = vi.fn(() => right({}))
  mockUpdate.mockReturnValue(mockUpdateFunction)
  const mockSetIsEditing = vi.fn()

  render(
    <EditingInfoText
      id={TEST_ID}
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  await user.clear(textField)
  await user.type(textField, "Updated description")

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockUpdateFunction).not.toHaveBeenCalled()
})
