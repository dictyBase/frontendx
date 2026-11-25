import { useEffect, type ReactElement } from "react"
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INSERT_PARAGRAPH_COMMAND,
  ParagraphNode,
  mergeRegister,
  type ElementNode,
  type Klass,
  type LexicalEditor,
  type LexicalNode,
  type NodeMutation,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode } from "@lexical/list"
import { pipe } from "fp-ts/function"
import {
  filter as Afilter,
  filterMap as AfilterMap,
  map as Amap,
} from "fp-ts/Array"
import { match as Omatch, fromPredicate as OfromPredicate } from "fp-ts/Option"
import {
  $applyBlockSpacing,
  $getBlockSpacing,
  $getSpacingBlock,
  $isNewNode,
  $isSpacingBlock,
  applySpacingToElement,
  hasSpacing,
} from "../utils/blockSpacing"

const SPACING_NODE_CLASSES: Array<Klass<LexicalNode>> = [
  ParagraphNode,
  HeadingNode,
  QuoteNode,
  ListItemNode,
]

type SpacingMutationListener = (mutations: Map<string, NodeMutation>) => void

const renderSpacing =
  (editor: LexicalEditor): SpacingMutationListener =>
  (mutations): void => {
    editor.getEditorState().read(() => {
      mutations.forEach((mutation, key) => {
        if (mutation === "destroyed") return
        const node = $getNodeByKey(key)
        const element = editor.getElementByKey(key)
        if (!node || !element) return
        applySpacingToElement(element, $getBlockSpacing(node))
      })
    })
  }

const $carrySpacingToNewSiblings = (
  editor: LexicalEditor,
  block: ElementNode,
): void => {
  const spacing = $getBlockSpacing(block)
  if (!hasSpacing(spacing)) return
  const previousState = editor.getEditorState()
  const latest = block.getLatest()
  pipe(
    [latest.getPreviousSibling(), latest.getNextSibling()],
    AfilterMap(
      OfromPredicate(
        (sibling: LexicalNode | null): sibling is ElementNode =>
          $isSpacingBlock(sibling) && $isNewNode(sibling, previousState),
      ),
    ),
  ).forEach((sibling) => $applyBlockSpacing(sibling, spacing))
}

/**
 * Like a word processor, a paragraph created by pressing Enter continues the
 * spacing of the paragraph it was split from.
 */
const $insertParagraphKeepingSpacing = (editor: LexicalEditor): boolean => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return false
  const source = $getSpacingBlock(selection.anchor.getNode())
  selection.insertParagraph()
  pipe(
    source,
    Omatch(
      () => {},
      (block) => $carrySpacingToNewSiblings(editor, block),
    ),
  )
  return true
}

/**
 * Renders the per-block line and paragraph spacing stored in node state and
 * keeps it when new paragraphs are created. Required in both editable and
 * read-only editors.
 */
const BlockSpacingPlugin = (): ReactElement => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    const mutationListeners = pipe(
      SPACING_NODE_CLASSES,
      Afilter((klass) => editor.hasNodes([klass])),
      Amap((klass) =>
        editor.registerMutationListener(klass, renderSpacing(editor), {
          skipInitialization: false,
        }),
      ),
    )
    return mergeRegister(
      ...mutationListeners,
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => $insertParagraphKeepingSpacing(editor),
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor])
  return <></>
}

export { BlockSpacingPlugin }
