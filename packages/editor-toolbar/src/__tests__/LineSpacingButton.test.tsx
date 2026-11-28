import { test, expect } from "vitest"
import {
  render,
  act,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react"
import {
  $createParagraphNode,
  $createTextNode,
  $getNodeByKey,
  $getRoot,
  type LexicalEditor,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { pipe } from "fp-ts/function"
import {
  type Option,
  none as Onone,
  some as Osome,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { LineSpacingButton } from "../components/LineSpacingButton"
import {
  $getBlockSpacing,
  $setBlockSpacing,
  SpacingProperty,
  type BlockSpacing,
} from "../utils/blockSpacing"

const TITLE = "Line & paragraph spacing"
const START_LINE_HEIGHT = 1.5
const DOUBLE = 2
const REMOVE_SPACE = "Remove space between paragraphs"
const RADIO = "menuitemradio"
const EXPANDED = "aria-expanded"
const CHECKED = "aria-checked"
const LINE_SPACING = "Line spacing"
const SPACE_BEFORE = "Space before"
const NO_SPACE = 0

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

const renderToolbar = (): LexicalEditor => {
  captured.editor = Onone
  render(
    <LexicalTestComposer>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <LineSpacingButton />
      <CaptureEditor />
    </LexicalTestComposer>,
  )
  return pipe(captured.editor, getOrThrow<LexicalEditor>("editor not mounted"))
}

const setupParagraph = async (editor: LexicalEditor): Promise<string> => {
  const key: { value: Option<string> } = { value: Onone }
  await act(async () => {
    editor.update(
      () => {
        const paragraph = $createParagraphNode().append(
          $createTextNode("Dicty"),
        )
        $getRoot().clear().append(paragraph)
        $setBlockSpacing(
          paragraph,
          SpacingProperty.LINE_HEIGHT,
          Osome(START_LINE_HEIGHT),
        )
        key.value = Osome(paragraph.getKey())
        paragraph.selectEnd()
      },
      { discrete: true },
    )
  })
  return pipe(key.value, getOrThrow<string>("paragraph not created"))
}

const readSpacing = (editor: LexicalEditor, key: string): BlockSpacing =>
  editor
    .getEditorState()
    .read(() =>
      pipe(
        $getNodeByKey(key),
        OfromNullable,
        getOrThrow("paragraph missing"),
        $getBlockSpacing,
      ),
    )

const openMenu = (): void => {
  fireEvent.click(screen.getByTitle(TITLE))
}

const section = (heading: string): HTMLElement =>
  screen.getByRole("menu", { name: heading })

test("opens a panel with line, before and after sections", async () => {
  const editor = renderToolbar()
  await setupParagraph(editor)
  openMenu()
  expect(section(LINE_SPACING)).toBeInTheDocument()
  expect(section(SPACE_BEFORE)).toBeInTheDocument()
  expect(section("Space after")).toBeInTheDocument()
  expect(screen.getByTitle(TITLE)).toHaveAttribute(EXPANDED, "true")
})

test("checks the current spacing value of the selected block", async () => {
  const editor = renderToolbar()
  await setupParagraph(editor)
  openMenu()
  expect(
    within(section(LINE_SPACING)).getByRole(RADIO, {
      name: "1.5",
    }),
  ).toHaveAttribute(CHECKED, "true")
  expect(
    within(section(SPACE_BEFORE)).getByRole(RADIO, {
      name: "Default",
    }),
  ).toHaveAttribute(CHECKED, "true")
})

test("selecting an option applies it and closes the panel", async () => {
  const editor = renderToolbar()
  const key = await setupParagraph(editor)
  openMenu()
  fireEvent.click(
    within(section(LINE_SPACING)).getByRole(RADIO, {
      name: "Double",
    }),
  )
  await waitFor(() => {
    expect(readSpacing(editor, key)[SpacingProperty.LINE_HEIGHT]).toEqual(
      Osome(DOUBLE),
    )
  })
  await waitFor(() => {
    expect(screen.getByTitle(TITLE)).toHaveAttribute(EXPANDED, "false")
  })
})

test("remove space between paragraphs zeroes before and after", async () => {
  const editor = renderToolbar()
  const key = await setupParagraph(editor)
  openMenu()
  fireEvent.click(screen.getByRole("button", { name: REMOVE_SPACE }))
  await waitFor(() => {
    expect(readSpacing(editor, key)).toEqual({
      [SpacingProperty.LINE_HEIGHT]: Osome(START_LINE_HEIGHT),
      [SpacingProperty.SPACE_BEFORE]: Osome(NO_SPACE),
      [SpacingProperty.SPACE_AFTER]: Osome(NO_SPACE),
    })
  })
})

test("reset clears every spacing value", async () => {
  const editor = renderToolbar()
  const key = await setupParagraph(editor)
  openMenu()
  fireEvent.click(screen.getByRole("button", { name: "Reset" }))
  await waitFor(() => {
    expect(readSpacing(editor, key)).toEqual({
      [SpacingProperty.LINE_HEIGHT]: Onone,
      [SpacingProperty.SPACE_BEFORE]: Onone,
      [SpacingProperty.SPACE_AFTER]: Onone,
    })
  })
})

test("checks None for explicit zero space and keeps it apart from Default", async () => {
  const editor = renderToolbar()
  const key = await setupParagraph(editor)
  openMenu()
  fireEvent.click(screen.getByRole("button", { name: REMOVE_SPACE }))
  await waitFor(() => {
    expect(readSpacing(editor, key)[SpacingProperty.SPACE_BEFORE]).toEqual(
      Osome(NO_SPACE),
    )
  })
  openMenu()
  const before = within(section(SPACE_BEFORE))
  expect(before.getByRole(RADIO, { name: "None" })).toHaveAttribute(
    CHECKED,
    "true",
  )
  expect(before.getByRole(RADIO, { name: "Default" })).toHaveAttribute(
    CHECKED,
    "false",
  )
})

test("dismissing the panel closes it without changing spacing", async () => {
  const editor = renderToolbar()
  const key = await setupParagraph(editor)
  openMenu()
  fireEvent.keyDown(section(LINE_SPACING), { key: "Escape" })
  await waitFor(() => {
    expect(screen.getByTitle(TITLE)).toHaveAttribute(EXPANDED, "false")
  })
  expect(readSpacing(editor, key)[SpacingProperty.LINE_HEIGHT]).toEqual(
    Osome(START_LINE_HEIGHT),
  )
})
