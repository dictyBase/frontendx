import { test, expect, vi, beforeEach, afterEach } from "vitest"
import { render, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import type { LexicalEditor } from "lexical"
import {
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  ParagraphNode,
} from "lexical"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { DownloadLinkNode, $createDownloadLinkNode } from "../DownloadLinkNode"

type TestEditorProperties = {
  onSetup?: () => void
  onEditorReady?: (editor: LexicalEditor) => void
}

const TestEditor = ({ onSetup, onEditorReady }: TestEditorProperties) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (onSetup) {
      editor.update(onSetup)
    }
    if (onEditorReady) {
      onEditorReady(editor)
    }
  }, [editor, onSetup, onEditorReady])

  return (
    <div
      ref={(reference) => {
        if (reference) {
          editor.setRootElement(reference)
        }
      }}
      contentEditable
      suppressContentEditableWarning
    />
  )
}

const testUrl = "https://example.com/file.pdf"
const testFilename = "document.pdf"
const oldFilename = "old.pdf"
const newFilename = "new.pdf"
const editorConfig = {
  namespace: "test",
  nodes: [DownloadLinkNode],
}

const createMockBlob = () =>
  new Blob(["test content"], { type: "application/pdf" })

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    blob: () => Promise.resolve(createMockBlob()),
  })
  global.URL.createObjectURL = vi.fn(() => "blob:mock-url")
  global.URL.revokeObjectURL = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
})

test("createDOM adds download attribute to rendered anchor", async () => {
  const { container } = render(
    <LexicalTestComposer config={editorConfig}>
      <TestEditor
        onSetup={() => {
          const root = $getRoot()
          const paragraph = $createParagraphNode()
          const linkNode = $createDownloadLinkNode(testUrl, {
            download: testFilename,
          })
          const textNode = $createTextNode("Download")

          linkNode.append(textNode)
          paragraph.append(linkNode)
          root.append(paragraph)
        }}
      />
    </LexicalTestComposer>,
  )

  await waitFor(() => {
    const anchor = container.querySelector("a")
    expect(anchor).toBeDefined()
    expect(anchor?.getAttribute("download")).toBe(testFilename)
    expect(anchor?.href).toBe(testUrl)
  })
})

test("createDOM does not add download attribute when not provided", async () => {
  const { container } = render(
    <LexicalTestComposer config={editorConfig}>
      <TestEditor
        onSetup={() => {
          const root = $getRoot()
          const paragraph = $createParagraphNode()
          const linkNode = $createDownloadLinkNode(testUrl, {})
          const textNode = $createTextNode("Link")

          linkNode.append(textNode)
          paragraph.append(linkNode)
          root.append(paragraph)
        }}
      />
    </LexicalTestComposer>,
  )

  await waitFor(() => {
    const anchor = container.querySelector("a")
    expect(anchor).toBeDefined()
    expect(anchor?.hasAttribute("download")).toBe(false)
  })
})

test("downloadFromAPI is called on click", async () => {
  const user = userEvent.setup()

  const { container } = render(
    <LexicalTestComposer config={editorConfig}>
      <TestEditor
        onSetup={() => {
          const root = $getRoot()
          const paragraph = $createParagraphNode()
          const linkNode = $createDownloadLinkNode(testUrl, {
            download: testFilename,
          })
          const textNode = $createTextNode("Download")

          linkNode.append(textNode)
          paragraph.append(linkNode)
          root.append(paragraph)
        }}
      />
    </LexicalTestComposer>,
  )

  await waitFor(() => {
    const anchor = container.querySelector("a")
    expect(anchor).toBeDefined()
  })

  const anchor = container.querySelector("a")
  await user.click(anchor!)

  expect(global.fetch).toHaveBeenCalledWith(testUrl)
  expect(global.URL.createObjectURL).toHaveBeenCalled()
  expect(global.URL.revokeObjectURL).toHaveBeenCalled()
})

test("updateDOM updates download attribute", async () => {
  let editorInstance: LexicalEditor | undefined

  const { container } = render(
    <LexicalTestComposer config={editorConfig}>
      <TestEditor
        onEditorReady={(editor) => {
          editorInstance = editor
        }}
        onSetup={() => {
          const root = $getRoot()
          const paragraph = $createParagraphNode()
          const linkNode = $createDownloadLinkNode(testUrl, {
            download: oldFilename,
          })
          const textNode = $createTextNode("Download")

          linkNode.append(textNode)
          paragraph.append(linkNode)
          root.append(paragraph)
        }}
      />
    </LexicalTestComposer>,
  )

  await waitFor(() => {
    const anchor = container.querySelector("a")
    expect(anchor?.getAttribute("download")).toBe(oldFilename)
  })

  if (editorInstance) {
    editorInstance.update(() => {
      const root = $getRoot()
      const children = root.getChildren()
      // Get the second paragraph (first one is empty)
      const paragraph = children[1] as ParagraphNode
      const linkNode = paragraph.getFirstChild() as DownloadLinkNode
      linkNode.setDownload(newFilename)
    })
  }

  await waitFor(() => {
    const anchor = container.querySelector("a")
    expect(anchor?.getAttribute("download")).toBe(newFilename)
  })
})

test("updateDOM removes download attribute when set to null", async () => {
  let editorInstance: LexicalEditor | undefined

  const { container } = render(
    <LexicalTestComposer config={editorConfig}>
      <TestEditor
        onEditorReady={(editor) => {
          editorInstance = editor
        }}
        onSetup={() => {
          const root = $getRoot()
          const paragraph = $createParagraphNode()
          const linkNode = $createDownloadLinkNode(testUrl, {
            download: testFilename,
          })
          const textNode = $createTextNode("Download")

          linkNode.append(textNode)
          paragraph.append(linkNode)
          root.append(paragraph)
        }}
      />
    </LexicalTestComposer>,
  )

  await waitFor(() => {
    const anchor = container.querySelector("a")
    expect(anchor?.getAttribute("download")).toBe(testFilename)
  })

  if (editorInstance) {
    editorInstance.update(() => {
      const root = $getRoot()
      const children = root.getChildren()
      // Get the second paragraph (first one is empty)
      const paragraph = children[1] as ParagraphNode
      const linkNode = paragraph.getFirstChild() as DownloadLinkNode
      const writable = linkNode.getWritable()
      // eslint-disable-next-line unicorn/no-null
      writable.__download = null
    })
  }

  await waitFor(() => {
    const anchor = container.querySelector("a")
    expect(anchor?.hasAttribute("download")).toBe(false)
  })
})
