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
import {
  type Option,
  none as Onone,
  some as Osome,
  match as Omatch,
} from "fp-ts/Option"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { BlockSpacingPlugin } from "../components/BlockSpacingPlugin"
import {
  $getBlockSpacing,
  $setBlockSpacing,
  SpacingProperty,
  isSpacingValueWithin,
  getSpacingDeclarations,
} from "../utils/blockSpacing"

const TEXT = "Dicty Stock Center"
const TEST_LINE_HEIGHT = 1.5
const NO_SPACING = 0
const MAX_TEST_LINE_HEIGHT = 5
const MAX_TEST_PARAGRAPH_SPACE = 200

const captured: { editor: Option<LexicalEditor> } = { editor: Onone }

const CaptureEditor = (): undefined => {
  const [editor] = useLexicalComposerContext()
  captured.editor = Osome(editor)
  return undefined
}

const renderEditor = (): LexicalEditor => {
  captured.editor = Onone
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
  return Omatch<LexicalEditor, LexicalEditor>(
    () => {
      throw new Error("Lexical editor was not mounted")
    },
    (editor) => editor,
  )(captured.editor)
}

const setupParagraph = async (
  editor: LexicalEditor,
  text: string,
): Promise<string> => {
  let nodeKey: Option<string> = Onone
  await act(async () => {
    editor.update(
      () => {
        const paragraph = $createParagraphNode().append($createTextNode(text))
        $getRoot().clear().append(paragraph)
        $setBlockSpacing(
          paragraph,
          SpacingProperty.LINE_HEIGHT,
          Osome(TEST_LINE_HEIGHT),
        )
        $setBlockSpacing(
          paragraph,
          SpacingProperty.SPACE_AFTER,
          Osome(NO_SPACING),
        )
        nodeKey = Osome(paragraph.getKey())
        paragraph.selectEnd()
      },
      { discrete: true },
    )
  })
  return Omatch<string, string>(
    () => {
      throw new Error("Paragraph node was not created")
    },
    (key) => key,
  )(nodeKey)
}

test("getSpacingDeclarations keeps unset values absent and preserves explicit zero", () => {
  expect(
    getSpacingDeclarations({
      [SpacingProperty.LINE_HEIGHT]: Osome(1.15),
      [SpacingProperty.SPACE_BEFORE]: Onone,
      [SpacingProperty.SPACE_AFTER]: Osome(0),
    }),
  ).toEqual([
    { cssProperty: "line-height", value: Osome("1.15") },
    { cssProperty: "margin-top", value: Onone },
    { cssProperty: "margin-bottom", value: Osome("0px") },
  ])
})

test("spacing validation accepts inclusive bounds and rejects invalid values", () => {
  const isValidLineHeight = isSpacingValueWithin(MAX_TEST_LINE_HEIGHT)
  const isValidParagraphSpace = isSpacingValueWithin(MAX_TEST_PARAGRAPH_SPACE)
  expect(isValidLineHeight(NO_SPACING)).toBe(true)
  expect(isValidLineHeight(MAX_TEST_LINE_HEIGHT)).toBe(true)
  expect(isValidLineHeight(-0.1)).toBe(false)
  expect(isValidLineHeight(MAX_TEST_LINE_HEIGHT + 0.1)).toBe(false)
  expect(isValidParagraphSpace(NO_SPACING)).toBe(true)
  expect(isValidParagraphSpace(MAX_TEST_PARAGRAPH_SPACE)).toBe(true)
  expect(isValidParagraphSpace(MAX_TEST_PARAGRAPH_SPACE + 0.1)).toBe(false)
  expect(isValidLineHeight(Number.NaN)).toBe(false)
})

const getParagraphElement = (
  editor: LexicalEditor,
  key: string,
): HTMLElement => {
  const element = editor.getElementByKey(key)
  if (!element) throw new Error("Paragraph element was not rendered")
  return element
}

test("renders block spacing as inline styles on the paragraph", async () => {
  const editor = renderEditor()
  const key = await setupParagraph(editor, TEXT)
  const element = getParagraphElement(editor, key)
  expect(element.style.lineHeight).toBe(`${TEST_LINE_HEIGHT}`)
  expect(element.style.marginBottom).toBe(`${NO_SPACING}px`)
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
  const element = getParagraphElement(editor, key)
  expect(element.style.lineHeight).toBe("")
  expect(element.style.marginBottom).toBe("")
})

test("serializes spacing into the editor JSON and restores it", async () => {
  const editor = renderEditor()
  await setupParagraph(editor, TEXT)
  const json = JSON.stringify(editor.getEditorState().toJSON())
  expect(json).toContain(`"lineHeight":${TEST_LINE_HEIGHT}`)
  const restored = editor.parseEditorState(json)
  const spacing = restored.read(() =>
    $getBlockSpacing($getRoot().getFirstChildOrThrow()),
  )
  expect(spacing[SpacingProperty.LINE_HEIGHT]).toEqual(Osome(TEST_LINE_HEIGHT))
  expect(spacing[SpacingProperty.SPACE_AFTER]).toEqual(Osome(NO_SPACING))
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
    {
      [SpacingProperty.LINE_HEIGHT]: Osome(TEST_LINE_HEIGHT),
      [SpacingProperty.SPACE_BEFORE]: Onone,
      [SpacingProperty.SPACE_AFTER]: Osome(NO_SPACING),
    },
    {
      [SpacingProperty.LINE_HEIGHT]: Osome(TEST_LINE_HEIGHT),
      [SpacingProperty.SPACE_BEFORE]: Onone,
      [SpacingProperty.SPACE_AFTER]: Osome(NO_SPACING),
    },
  ])
})
