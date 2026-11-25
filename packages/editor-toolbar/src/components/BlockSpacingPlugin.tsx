import { useEffect } from "react"
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
  type NodeKey,
  type NodeMutation,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode } from "@lexical/list"
import { pipe } from "fp-ts/function"
import {
  filter as RAfilter,
  filterMap as RAfilterMap,
  map as RAmap,
} from "fp-ts/ReadonlyArray"
import { filter as RMfilter, keys as RMkeys } from "fp-ts/ReadonlyMap"
import {
  type Option,
  Do as ODo,
  apS as OapS,
  fromNullable as OfromNullable,
  fromPredicate as OfromPredicate,
  isNone as OisNone,
  map as Omap,
} from "fp-ts/Option"
import { Ord as StringOrd } from "fp-ts/string"
import {
  type BlockSpacing,
  $applyBlockSpacing,
  $getBlockSpacing,
  $getSpacingBlock,
  $isNewNode,
  $isSpacingBlock,
  applySpacingToElement,
  hasSpacing,
} from "../utils/blockSpacing"

const SPACING_NODE_CLASSES: readonly Klass<LexicalNode>[] = [
  ParagraphNode,
  HeadingNode,
  QuoteNode,
  ListItemNode,
]

type SpacingMutationListener = (mutations: Map<NodeKey, NodeMutation>) => void

type SpacingTarget = Readonly<{ element: HTMLElement; spacing: BlockSpacing }>

const isLiveMutation = (mutation: NodeMutation): boolean =>
  mutation !== "destroyed"

const $getSpacingTarget =
  (editor: LexicalEditor) =>
  (key: NodeKey): Option<SpacingTarget> =>
    pipe(
      ODo,
      OapS("node", OfromNullable($getNodeByKey(key))),
      OapS("element", OfromNullable(editor.getElementByKey(key))),
      Omap(({ node, element }) => ({
        element,
        spacing: $getBlockSpacing(node),
      })),
    )

const $collectSpacingTargets = (
  editor: LexicalEditor,
  mutations: ReadonlyMap<NodeKey, NodeMutation>,
): readonly SpacingTarget[] =>
  pipe(
    mutations,
    RMfilter(isLiveMutation),
    RMkeys(StringOrd),
    RAfilterMap($getSpacingTarget(editor)),
  )

const renderSpacing =
  (editor: LexicalEditor): SpacingMutationListener =>
  (mutations) =>
    editor
      .getEditorState()
      .read(() => $collectSpacingTargets(editor, mutations))
      .forEach(({ element, spacing }) =>
        applySpacingToElement(element, spacing),
      )

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
    RAfilterMap(
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
  if (OisNone(source)) return true
  $carrySpacingToNewSiblings(editor, source.value)
  return true
}

/**
 * Renders the per-block line and paragraph spacing stored in node state and
 * keeps it when new paragraphs are created. Required in both editable and
 * read-only editors.
 */
const BlockSpacingPlugin = (): undefined => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    const mutationListeners = pipe(
      SPACING_NODE_CLASSES,
      RAfilter((klass) => editor.hasNodes([klass])),
      RAmap((klass) =>
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
  return undefined
}

export { BlockSpacingPlugin }
