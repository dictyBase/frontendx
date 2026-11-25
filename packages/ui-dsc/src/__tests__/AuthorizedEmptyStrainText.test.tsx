import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { AuthorizedEmptyStrainText } from "../catalog/AuthorizedEmptyStrainText"

const PLACEHOLDER_TEXT = "Enter text"

vi.mock("../catalog/CreatableStrainText", () => ({
  CreatableStrainText: ({
    setIsCreating,
  }: {
    setIsCreating: (value: boolean) => void
  }) => (
    <button type="button" onClick={() => setIsCreating(true)}>
      Create
    </button>
  ),
}))

vi.mock("../catalog/CreatingStrainText", () => ({
  CreatingStrainText: ({
    setIsCreating,
  }: {
    setIsCreating: (value: boolean) => void
  }) => (
    <div>
      <input placeholder={PLACEHOLDER_TEXT} />
      <button type="button" onClick={() => setIsCreating(false)}>
        Save
      </button>
      <button type="button" onClick={() => setIsCreating(false)}>
        Cancel
      </button>
    </div>
  ),
}))

test("should render CreatableStrainText in initial state", () => {
  render(<AuthorizedEmptyStrainText id="DBS0236123" field="plasmid" />)

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
})

test("should switch to CreatingStrainText when create is clicked and back on cancel", async () => {
  const user = userEvent.setup()

  render(<AuthorizedEmptyStrainText id="DBS0236123" field="plasmid" />)

  await user.click(screen.getByRole("button", { name: /create/i }))

  expect(screen.getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()

  await user.click(screen.getByRole("button", { name: /cancel/i }))

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
})
