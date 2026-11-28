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
  $createRangeSelection,
  $createTextNode,
  $getNodeByKey,
  $getRoot,
  $setSelection,
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
const SPACE_AFTER = "Space after"
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

const optionLabels = (heading: string): readonly string[] =>
  within(section(heading))
    .getAllByRole(RADIO)
    .map((item) => item.textContent ?? "")

test("opens a panel with line, before and after sections", async () => {
  const editor = renderToolbar()
  await setupParagraph(editor)
  openMenu()
  expect(section(LINE_SPACING)).toBeInTheDocument()
  expect(section(SPACE_BEFORE)).toBeInTheDocument()
  expect(section(SPACE_AFTER)).toBeInTheDocument()
  expect(screen.getByTitle(TITLE)).toHaveAttribute(EXPANDED, "true")
})

test("renders options in exact section order", async () => {
  const editor = renderToolbar()
  await setupParagraph(editor)
  openMenu()

  expect(optionLabels(LINE_SPACING)).toEqual([
    "Default",
    "Single",
    "1.15",
    "1.5",
    "Double",
  ])
  const expectedParagraphLabels = [
    "Default",
    "None",
    "4 px",
    "8 px",
    "12 px",
    "16 px",
    "24 px",
  ]
  expect(optionLabels(SPACE_BEFORE)).toEqual(expectedParagraphLabels)
  expect(optionLabels(SPACE_AFTER)).toEqual(expectedParagraphLabels)
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

test("applies spacing changes across all selected paragraphs and refreshes on reopen", async () => {
  const editor = renderToolbar()
  const keys: { first: Option<string>; second: Option<string> } = {
    first: Onone,
    second: Onone,
  }
  await act(async () => {
    editor.update(
      () => {
        const firstText = $createTextNode("Alpha")
        const secondText = $createTextNode("Beta")
        const firstParagraph = $createParagraphNode().append(firstText)
        const secondParagraph = $createParagraphNode().append(secondText)
        $getRoot().clear().append(firstParagraph, secondParagraph)
        keys.first = Osome(firstParagraph.getKey())
        keys.second = Osome(secondParagraph.getKey())
        const range = $createRangeSelection()
        range.anchor.set(firstText.getKey(), 0, "text")
        range.focus.set(secondText.getKey(), 4, "text")
        $setSelection(range)
      },
      { discrete: true },
    )
  })
  const firstKey = pipe(keys.first, getOrThrow<string>("first missing"))
  const secondKey = pipe(keys.second, getOrThrow<string>("second missing"))

  openMenu()
  fireEvent.click(
    within(section(LINE_SPACING)).getByRole(RADIO, { name: "Double" }),
  )
  await waitFor(() => {
    expect(readSpacing(editor, firstKey)[SpacingProperty.LINE_HEIGHT]).toEqual(
      Osome(DOUBLE),
    )
    expect(readSpacing(editor, secondKey)[SpacingProperty.LINE_HEIGHT]).toEqual(
      Osome(DOUBLE),
    )
  })
  await waitFor(() => {
    expect(screen.getByTitle(TITLE)).toHaveAttribute(EXPANDED, "false")
  })
  openMenu()
  expect(
    within(section(LINE_SPACING)).getByRole(RADIO, { name: "Double" }),
  ).toHaveAttribute(CHECKED, "true")
})

test("retains checked state during popover exit transition and refreshes on next open", async () => {
  const editor = renderToolbar()
  const key = await setupParagraph(editor)
  openMenu()
  expect(
    within(section(LINE_SPACING)).getByRole(RADIO, { name: "1.5" }),
  ).toHaveAttribute(CHECKED, "true")

  fireEvent.keyDown(section(LINE_SPACING), { key: "Escape" })
  expect(screen.getByTitle(TITLE)).toHaveAttribute(EXPANDED, "false")
  const exitingLineMenu = screen.queryByRole("menu", {
    name: LINE_SPACING,
    hidden: true,
  })
  expect(exitingLineMenu).not.toBeNull()
  expect(
    within(exitingLineMenu as HTMLElement).getByRole(RADIO, {
      name: "1.5",
      hidden: true,
    }),
  ).toHaveAttribute(CHECKED, "true")

  await waitFor(() => {
    expect(
      screen.queryByRole("menu", { name: LINE_SPACING, hidden: true }),
    ).toBeNull()
  })

  await act(async () => {
    editor.update(
      () => {
        const node = pipe(
          $getNodeByKey(key),
          OfromNullable,
          getOrThrow("paragraph missing"),
        )
        $setBlockSpacing(node, SpacingProperty.LINE_HEIGHT, Osome(DOUBLE))
      },
      { discrete: true },
    )
  })

  openMenu()
  expect(
    within(section(LINE_SPACING)).getByRole(RADIO, { name: "Double" }),
  ).toHaveAttribute(CHECKED, "true")
})
