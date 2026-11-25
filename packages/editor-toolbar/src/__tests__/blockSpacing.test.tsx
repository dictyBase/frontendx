import { test, expect } from "vitest"
import { render, act } from "@testing-library/react"
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  INSERT_PARAGRAPH_COMMAND,
  type LexicalEditor,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { none as Onone, some as Osome } from "fp-ts/Option"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { BlockSpacingPlugin } from "../components/BlockSpacingPlugin"
import {
  $getBlockSpacing,
  $setBlockSpacing,
  SpacingProperty,
  getSpacingDeclarations,
} from "../utils/blockSpacing"

const TEXT = "Dicty Stock Center"

const captured: { editor?: LexicalEditor } = {}

const CaptureEditor = () => {
  const [editor] = useLexicalComposerContext()
  captured.editor = editor
  return <></>
}

const renderEditor = () => {
  render(
    <LexicalTestComposer config={{ nodes: [HeadingNode, QuoteNode] }}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <BlockSpacingPlugin />
      <CaptureEditor />
    </LexicalTestComposer>,
  )
  return captured.editor as LexicalEditor
}

const setupParagraph = async (editor: LexicalEditor, text: string) => {
  let key = ""
  await act(async () => {
    editor.update(
      () => {
        const paragraph = $createParagraphNode().append($createTextNode(text))
        $getRoot().clear().append(paragraph)
        $setBlockSpacing(paragraph, SpacingProperty.LINE_HEIGHT, Osome(1.5))
        $setBlockSpacing(paragraph, SpacingProperty.SPACE_AFTER, Osome(0))
        key = paragraph.getKey()
        paragraph.selectEnd()
      },
      { discrete: true },
    )
  })
  return key
}

test("getSpacingDeclarations maps unset values to removals", () => {
  expect(
    getSpacingDeclarations({
      [SpacingProperty.LINE_HEIGHT]: Osome(1.15),
      [SpacingProperty.SPACE_BEFORE]: Onone,
      [SpacingProperty.SPACE_AFTER]: Osome(0),
    }),
  ).toEqual([
    { cssProperty: "line-height", value: "1.15" },
    { cssProperty: "margin-top", value: "" },
    { cssProperty: "margin-bottom", value: "0px" },
  ])
})

test("renders block spacing as inline styles on the paragraph", async () => {
  const editor = renderEditor()
  const key = await setupParagraph(editor, TEXT)
  const element = editor.getElementByKey(key) as HTMLElement
  expect(element.style.lineHeight).toBe("1.5")
  expect(element.style.marginBottom).toBe("0px")
  expect(element.style.marginTop).toBe("")
})

test("removes inline styles when spacing is reset", async () => {
  const editor = renderEditor()
  const key = await setupParagraph(editor, TEXT)
  await act(async () => {
    editor.update(
      () => {
        const paragraph = $getRoot().getFirstChildOrThrow()
        $setBlockSpacing(paragraph, SpacingProperty.LINE_HEIGHT, Onone)
        $setBlockSpacing(paragraph, SpacingProperty.SPACE_AFTER, Onone)
      },
      { discrete: true },
    )
  })
  const element = editor.getElementByKey(key) as HTMLElement
  expect(element.style.lineHeight).toBe("")
  expect(element.style.marginBottom).toBe("")
})

test("serializes spacing into the editor JSON and restores it", async () => {
  const editor = renderEditor()
  await setupParagraph(editor, TEXT)
  const json = JSON.stringify(editor.getEditorState().toJSON())
  expect(json).toContain('"lineHeight":1.5')
  const restored = editor.parseEditorState(json)
  const spacing = restored.read(() =>
    $getBlockSpacing($getRoot().getFirstChildOrThrow()),
  )
  expect(spacing[SpacingProperty.LINE_HEIGHT]).toEqual(Osome(1.5))
  expect(spacing[SpacingProperty.SPACE_AFTER]).toEqual(Osome(0))
  expect(spacing[SpacingProperty.SPACE_BEFORE]).toEqual(Onone)
})

test("a paragraph created with Enter keeps the spacing of its source", async () => {
  const editor = renderEditor()
  await setupParagraph(editor, TEXT)
  await act(async () => {
    editor.update(
      () => {
        editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined)
      },
      { discrete: true },
    )
  })
  const spacings = editor.getEditorState().read(() =>
    $getRoot()
      .getChildren()
      .map((node) => $getBlockSpacing(node)),
  )
  expect(spacings).toEqual([
    expect.anything(),
    {
      [SpacingProperty.LINE_HEIGHT]: Osome(1.5),
      [SpacingProperty.SPACE_BEFORE]: Onone,
      [SpacingProperty.SPACE_AFTER]: Osome(0),
    },
  ])
})
