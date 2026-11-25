import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { AuthorizedStrainText } from "../catalog/AuthorizedStrainText"

const TEST_TEXT = "aarA null mutant"

vi.mock("../catalog/EditableStrainText", () => ({
  EditableStrainText: ({
    text,
    setIsEditing,
  }: {
    text: string
    setIsEditing: (value: boolean) => void
  }) => (
    <div>
      <div>{text}</div>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </div>
  ),
}))

vi.mock("../catalog/EditingStrainText", () => ({
  EditingStrainText: ({
    initialText,
    setIsEditing,
  }: {
    initialText: string
    setIsEditing: (value: boolean) => void
  }) => (
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

test("should render EditableStrainText in initial state", () => {
  render(
    <AuthorizedStrainText id="DBS0236123" field="summary" text={TEST_TEXT} />,
  )

  expect(screen.getByText(TEST_TEXT)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})

test("should switch to EditingStrainText when edit is clicked and return on cancel", async () => {
  const user = userEvent.setup()

  render(
    <AuthorizedStrainText id="DBS0236123" field="summary" text={TEST_TEXT} />,
  )

  await user.click(screen.getByRole("button", { name: /edit/i }))

  expect(screen.getByDisplayValue(TEST_TEXT)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()

  await user.click(screen.getByRole("button", { name: /cancel/i }))

  expect(screen.getByText(TEST_TEXT)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
})
