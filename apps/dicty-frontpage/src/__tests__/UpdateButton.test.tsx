import { test, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { userEvent } from "@testing-library/user-event"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { UpdateButton } from "../common/components/UpdateButton"

// Mock the hooks
const mockAuthorizedUpdateContent = vi.fn()
const mockGetEditorState = vi.fn()
const mockToJSON = vi.fn()

vi.mock("../common/hooks/useAuthorizedUpdateContent", () => ({
  useAuthorizedUpdateContent: () => mockAuthorizedUpdateContent,
}))

vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [
    {
      getEditorState: mockGetEditorState,
    },
  ],
}))

const initialConfig = {
  namespace: "test",
  theme: {},
  onError: () => {},
}

beforeEach(() => {
  vi.clearAllMocks()
})

test("UpdateButton calls handleUpdate when clicked and canSave is true", async () => {
  const user = userEvent.setup()
  const mockEditorState = JSON.stringify({ test: "content" })

  mockGetEditorState.mockReturnValue({
    toJSON: mockToJSON,
  })
  mockToJSON.mockReturnValue({ test: "content" })
  mockAuthorizedUpdateContent.mockResolvedValue(undefined)

  render(
    <MockedProvider>
      <LexicalComposer initialConfig={initialConfig}>
        <UpdateButton contentId="test-id" canSave />
      </LexicalComposer>
    </MockedProvider>,
  )

  const updateButton = screen.getByRole("button", { name: "Save" })
  expect(updateButton).not.toBeDisabled()

  await user.click(updateButton)

  expect(mockAuthorizedUpdateContent).toHaveBeenCalledWith(mockEditorState)
})

test("UpdateButton is disabled when canSave is false", () => {
  render(
    <MockedProvider>
      <LexicalComposer initialConfig={initialConfig}>
        <UpdateButton contentId="test-id" canSave={false} />
      </LexicalComposer>
    </MockedProvider>,
  )

  const updateButton = screen.getByRole("button", { name: "Save" })
  expect(updateButton).toBeDisabled()
})

test("UpdateButton handles update function errors gracefully", async () => {
  const user = userEvent.setup()
  const error = new Error("Update failed")

  mockGetEditorState.mockReturnValue({
    toJSON: mockToJSON,
  })
  mockToJSON.mockReturnValue({ test: "content" })
  mockAuthorizedUpdateContent.mockRejectedValue(error)

  render(
    <MockedProvider>
      <LexicalComposer initialConfig={initialConfig}>
        <UpdateButton contentId="test-id" canSave />
      </LexicalComposer>
    </MockedProvider>,
  )

  const updateButton = screen.getByRole("button", { name: "Save" })
  await user.click(updateButton)

  expect(mockAuthorizedUpdateContent).toHaveBeenCalledOnce()
})
