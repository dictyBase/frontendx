/* eslint-disable unicorn/no-null */
import { describe, test, expect, vi } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import type { LexicalEditor } from "lexical"
import { $getRoot, $getSelection, $isRangeSelection } from "lexical"
import { Editor } from "../Editor"
import { dictyEditorConfig } from "../editorConfig"
import { FlexLayoutNode } from "@dictybase/flex-layout-plugin"

vi.mock("../useEditorStyles", () => ({
  useEditorAreaStyles: () => ({ classes: {} }),
  useEditorPlaceholderStyles: () => ({ classes: {} }),
}))

vi.mock("@dictybase/image-plugin", async () => {
  const actual = await vi.importActual<Record<string, unknown>>(
    "@dictybase/image-plugin",
  )
  return {
    ...actual,
    ImagePlugin: () => null,
  }
})

vi.mock("@dictybase/editor-toolbar", async () => {
  const actual = await vi.importActual<Record<string, unknown>>(
    "@dictybase/editor-toolbar",
  )
  return {
    ...actual,
    DictybaseToolbar: () => null,
  }
})

const onError = () => {}

type EditorReferenceCaptureProperties = {
  onEditorReady: (editor: LexicalEditor) => void
}

const EditorReferenceCapture = ({
  onEditorReady,
}: EditorReferenceCaptureProperties) => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    onEditorReady(editor)
  }, [editor, onEditorReady])
  return null
}

describe("DefaultEditor", () => {
  test("renders with a contenteditable element", () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <Editor config={{ ...dictyEditorConfig, onError }} />
      </ThemeProvider>,
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  test("pressing Enter creates a new paragraph node", async () => {
    const user = userEvent.setup()
    let editor: LexicalEditor | undefined

    render(
      <ThemeProvider theme={createTheme()}>
        <Editor
          editable
          config={{ ...dictyEditorConfig, onError }}
          plugins={[
            <EditorReferenceCapture
              key="capture"
              onEditorReady={(_editor) => {
                editor = _editor
              }}
            />,
          ]}
        />
      </ThemeProvider>,
    )

    await waitFor(() => {
      expect(editor).toBeDefined()
    })

    const contentEditable = screen.getByRole("textbox")
    await user.click(contentEditable)

    editor!.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        selection.insertText("Hello")
      }
    })

    fireEvent.keyDown(contentEditable, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    })

    await waitFor(() => {
      let paragraphCount = 0
      editor!.getEditorState().read(() => {
        const flexLayoutNode = $getRoot().getFirstChild() as FlexLayoutNode
        paragraphCount = flexLayoutNode.getChildren().length
      })
      expect(paragraphCount).toBe(2)
    })
  })
})
