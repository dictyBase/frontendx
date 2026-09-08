import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { AuthorizedInfoText } from "./AuthorizedInfoText"

const TEST_DESCRIPTION = "Test description"

vi.mock("./EditableInfoText", () => ({
  EditableInfoText: ({ text, setIsEditing }: any) => (
    <div>
      <div>{text}</div>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </div>
  ),
}))

vi.mock("./EditingInfoText", () => ({
  EditingInfoText: ({ initialText, setIsEditing }: any) => (
    <div>
      <input defaultValue={initialText} />
      <button type="button" onClick={() => setIsEditing(false)}>
        Save
      </button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </div>
  ),
}))

test("should render EditableInfoText in initial state", () => {
  render(<AuthorizedInfoText id="DDB_G0123456" text={TEST_DESCRIPTION} />)

  expect(screen.getByText(TEST_DESCRIPTION)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})

test("should switch to EditingInfoText when edit is clicked", async () => {
  const user = userEvent.setup()

  render(<AuthorizedInfoText id="DDB_G0123456" text={TEST_DESCRIPTION} />)

  const editButton = screen.getByRole("button", { name: /edit/i })
  await user.click(editButton)

  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
  expect(screen.getByDisplayValue(TEST_DESCRIPTION)).toBeInTheDocument()
})

test("should switch back to EditableInfoText when save is clicked", async () => {
  const user = userEvent.setup()

  render(<AuthorizedInfoText id="DDB_G0123456" text={TEST_DESCRIPTION} />)

  const editButton = screen.getByRole("button", { name: /edit/i })
  await user.click(editButton)

  const saveButton = screen.getByRole("button", { name: /save/i })
  await user.click(saveButton)

  expect(screen.getByText(TEST_DESCRIPTION)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})

test("should switch back to EditableInfoText when cancel is clicked", async () => {
  const user = userEvent.setup()

  render(<AuthorizedInfoText id="DDB_G0123456" text={TEST_DESCRIPTION} />)

  const editButton = screen.getByRole("button", { name: /edit/i })
  await user.click(editButton)

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(screen.getByText(TEST_DESCRIPTION)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})
