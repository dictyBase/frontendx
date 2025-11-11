import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { AuthorizedEmptyInfoText } from "./AuthorizedEmptyInfoText"

const PLACEHOLDER_TEXT = "Enter text"

vi.mock("./CreatableInfoText", () => ({
  CreatableInfoText: ({ setIsCreating }: any) => (
    <button type="button" onClick={() => setIsCreating(true)}>
      Create
    </button>
  ),
}))

vi.mock("./CreatingInfoText", () => ({
  CreatingInfoText: ({ setIsCreating }: any) => (
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

test("should render CreatableInfoText in initial state", () => {
  render(<AuthorizedEmptyInfoText id="DDB_G0123456" />)

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
})

test("should switch to CreatingInfoText when create is clicked", async () => {
  const user = userEvent.setup()

  render(<AuthorizedEmptyInfoText id="DDB_G0123456" />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  expect(screen.getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should switch back to CreatableInfoText when save is clicked", async () => {
  const user = userEvent.setup()

  render(<AuthorizedEmptyInfoText id="DDB_G0123456" />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const saveButton = screen.getByRole("button", { name: /save/i })
  await user.click(saveButton)

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
  expect(
    screen.queryByPlaceholderText(PLACEHOLDER_TEXT),
  ).not.toBeInTheDocument()
})

test("should switch back to CreatableInfoText when cancel is clicked", async () => {
  const user = userEvent.setup()

  render(<AuthorizedEmptyInfoText id="DDB_G0123456" />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
  expect(
    screen.queryByPlaceholderText(PLACEHOLDER_TEXT),
  ).not.toBeInTheDocument()
})
