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
import { pipe } from "fp-ts/function"
import {
  type Option,
  none as Onone,
  some as Osome,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { map as RAmap } from "fp-ts/ReadonlyArray"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { BlockSpacingPlugin } from "../components/BlockSpacingPlugin"
import {
  $getBlockSpacing,
  $setBlockSpacing,
  SpacingProperty,
  parseSpacingValue,
  getSpacingDeclarations,
} from "../utils/blockSpacing"

const TEXT = "Dicty Stock Center"
const TEST_LINE_HEIGHT = 1.5
const NO_SPACING = 0
const MAX_TEST_LINE_HEIGHT = 5
const MAX_TEST_PARAGRAPH_SPACE = 200

const captured: { editor: Option<LexicalEditor> } = { editor: Onone }

const getOrThrow = <A,>(message: string): ((option: Option<A>) => A) =>
  OgetOrElse((): A => {
    throw new Error(message)
  })

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
  return pipe(
    captured.editor,
    getOrThrow<LexicalEditor>("Lexical editor was not mounted"),
  )
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
  return pipe(nodeKey, getOrThrow<string>("Paragraph node was not created"))
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

test("parseSpacingValue accepts inclusive bounds and rejects invalid values", () => {
  const parseLineHeight = parseSpacingValue(MAX_TEST_LINE_HEIGHT)
  const parseParagraphSpace = parseSpacingValue(MAX_TEST_PARAGRAPH_SPACE)
  expect(parseLineHeight(NO_SPACING)).toEqual(Osome(NO_SPACING))
  expect(parseLineHeight(MAX_TEST_LINE_HEIGHT)).toEqual(
    Osome(MAX_TEST_LINE_HEIGHT),
  )
  expect(parseLineHeight(-0.1)).toEqual(Onone)
  expect(parseLineHeight(MAX_TEST_LINE_HEIGHT + 0.1)).toEqual(Onone)
  expect(parseParagraphSpace(MAX_TEST_PARAGRAPH_SPACE)).toEqual(
    Osome(MAX_TEST_PARAGRAPH_SPACE),
  )
  expect(parseParagraphSpace(MAX_TEST_PARAGRAPH_SPACE + 0.1)).toEqual(Onone)
  expect(parseLineHeight(Number.NaN)).toEqual(Onone)
  expect(parseLineHeight("1.5")).toEqual(Onone)
})

const getParagraphElement = (editor: LexicalEditor, key: string): HTMLElement =>
  pipe(
    editor.getElementByKey(key),
    OfromNullable,
    getOrThrow<HTMLElement>("Paragraph element was not rendered"),
  )

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
  const spacings = editor
    .getEditorState()
    .read(() => pipe($getRoot().getChildren(), RAmap($getBlockSpacing)))
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
