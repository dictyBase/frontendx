import { useState, type MouseEvent } from "react"
import { $getSelection, type ElementNode } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { constant, pipe } from "fp-ts/function"
import {
  asUnit as IOasUnit,
  traverseArray as IOtraverseArray,
  type IO,
} from "fp-ts/IO"
import {
  type Option,
  none as Onone,
  some as Osome,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { head as RAhead } from "fp-ts/ReadonlyArray"
import {
  contramapHandler,
  foldHandlers,
  type Handler,
} from "@dictybase/fp-ts-loom"
import {
  $applySpacingChanges,
  $getBlockSpacing,
  $getSelectedSpacingBlocks,
  EMPTY_SPACING,
  type BlockSpacing,
  type SpacingChange,
} from "../utils/blockSpacing"

/**
 * The spacing menu state. `anchor` is `Some` while the popover is open.
 * `current` is the spacing of the first selected block when the menu opened.
 * It stays after close so the popover keeps its content during the exit
 * transition.
 */
type SpacingMenu = Readonly<{
  anchor: Option<HTMLElement>
  current: BlockSpacing
}>

type LineSpacing = Readonly<{
  menu: SpacingMenu
  open: Handler<MouseEvent<HTMLElement>>
  close: Handler<unknown>
  apply: Handler<readonly SpacingChange[]>
}>

const CLOSED_MENU: SpacingMenu = { anchor: Onone, current: EMPTY_SPACING }

const openMenuAt = (
  anchor: HTMLElement,
  current: BlockSpacing,
): SpacingMenu => {
  const opened: SpacingMenu = { anchor: Osome(anchor), current }
  return opened
}

const closeMenu = ({ current }: SpacingMenu): SpacingMenu => {
  const closed: SpacingMenu = { anchor: Onone, current }
  return closed
}

const toAnchor = (event: MouseEvent<HTMLElement>): HTMLElement =>
  event.currentTarget

/** Spacing of the first selected block, or no spacing when nothing is selected. */
const $readSelectionSpacing = (): BlockSpacing =>
  pipe(
    $getSelectedSpacingBlocks($getSelection()),
    RAhead,
    Omap($getBlockSpacing),
    OgetOrElse(constant(EMPTY_SPACING)),
  )

type ApplyToBlock = (block: ElementNode) => IO<void>

const toApplyIO = (changes: readonly SpacingChange[]): ApplyToBlock => {
  const applyToBlock: ApplyToBlock = (block) => {
    const applyChanges: IO<void> = () => $applySpacingChanges(changes)(block)
    return applyChanges
  }
  return applyToBlock
}

/** Writes `changes` to every selected block. Run it inside `editor.update`. */
const $applyToSelection = (changes: readonly SpacingChange[]): void =>
  pipe(
    $getSelectedSpacingBlocks($getSelection()),
    IOtraverseArray(toApplyIO(changes)),
    IOasUnit,
  )()

/**
 * Owns the spacing menu: open reads the selection spacing, apply writes
 * changes to the selected blocks and then closes the menu.
 */
const useLineSpacing = (): LineSpacing => {
  const [editor] = useLexicalComposerContext()
  const [menu, setMenu] = useState<SpacingMenu>(CLOSED_MENU)

  const openAt: Handler<HTMLElement> = (anchor) => {
    setMenu(
      openMenuAt(anchor, editor.getEditorState().read($readSelectionSpacing)),
    )
  }

  const close: Handler<unknown> = () => {
    setMenu(closeMenu)
  }

  const writeChanges: Handler<readonly SpacingChange[]> = (changes) => {
    editor.update(() => $applyToSelection(changes))
  }

  return {
    menu,
    open: pipe(openAt, contramapHandler(toAnchor)),
    close,
    apply: foldHandlers([writeChanges, close]),
  }
}

export { useLineSpacing, type SpacingMenu }
