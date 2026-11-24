import { test, expect, vi } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import type { EditorState } from "lexical"
import type { ContentBySlugQuery } from "dicty-graphql-schema"
import { EditView } from "../components/EditView"

type EditorMockProperties = {
  initialState: string
  handleChange: (editorState: EditorState) => void
}

const mockAutoSave = vi.fn()

vi.mock("../hooks/useAutoSave", () => ({
  useAutoSave: () => [
    mockAutoSave,
    { waiting: false, loading: false, error: undefined, data: undefined },
  ],
}))

// The real Editor remounts whenever initialState changes, so the initialState
// it receives is what decides whether focus/selection survive.
vi.mock("@dictybase/editor", () => ({
  Editor: ({ initialState, handleChange }: EditorMockProperties) => (
    <>
      <div data-testid="editor">{initialState}</div>
      <button type="button" onClick={() => handleChange({} as EditorState)}>
        type
      </button>
    </>
  ),
}))

type ContentData = NonNullable<ContentBySlugQuery["contentBySlug"]>

const buildData = (id: string, content: string) =>
  ({
    id,
    content,
    updated_at: "2026-11-24T00:00:00Z",
    updated_by: { email: "editor@dictybase.org" },
  }) as ContentData

test("keeps the editor state when saved content comes back after an edit", async () => {
  const { rerender } = render(<EditView data={buildData("1", "original")} />)
  await userEvent.click(screen.getByRole("button", { name: "type" }))

  rerender(<EditView data={buildData("1", "saved by autosave")} />)

  expect(mockAutoSave).toHaveBeenCalledOnce()
  expect(screen.getByTestId("editor")).toHaveTextContent("original")
})

test("uses refreshed server content when nothing has been edited yet", () => {
  const { rerender } = render(<EditView data={buildData("1", "cached")} />)

  rerender(<EditView data={buildData("1", "fresh from network")} />)

  expect(screen.getByTestId("editor")).toHaveTextContent("fresh from network")
})

test("loads the new document when switching to different content", async () => {
  const { rerender } = render(<EditView data={buildData("1", "first page")} />)
  await userEvent.click(screen.getByRole("button", { name: "type" }))

  rerender(<EditView data={buildData("2", "second page")} />)

  expect(screen.getByTestId("editor")).toHaveTextContent("second page")
})
