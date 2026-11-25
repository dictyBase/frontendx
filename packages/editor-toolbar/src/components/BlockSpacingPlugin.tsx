import { useEffect } from "react"
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INSERT_PARAGRAPH_COMMAND,
  ParagraphNode,
  mergeRegister,
  type EditorState,
  type ElementNode,
  type Klass,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type NodeMutation,
  type RangeSelection,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode } from "@lexical/list"
import { constant, flow, pipe } from "fp-ts/function"
import {
  Do as RADo,
  apS as RAapS,
  bind as RAbind,
  filter as RAfilter,
  filterMap as RAfilterMap,
  flap as RAflap,
  fromOption as RAfromOption,
  map as RAmap,
} from "fp-ts/ReadonlyArray"
import { filter as RMfilter, keys as RMkeys } from "fp-ts/ReadonlyMap"
import {
  type Option,
  Do as ODo,
  apS as OapS,
  fromNullable as OfromNullable,
  fromPredicate as OfromPredicate,
  map as Omap,
  match as Omatch,
} from "fp-ts/Option"
import {
  type IO,
  as as IOas,
  flatMap as IOflatMap,
  map as IOmap,
  of as IOof,
  tap as IOtap,
} from "fp-ts/IO"
import type { Eq } from "fp-ts/Eq"
import { type Predicate, not as Pnot } from "fp-ts/Predicate"
import { Eq as StringEq, Ord as StringOrd } from "fp-ts/string"
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

const equalTo =
  <A,>(eq: Eq<A>) =>
  (expected: A): Predicate<A> =>
  (actual) =>
    eq.equals(actual, expected)

const isLiveMutation: Predicate<NodeMutation> = Pnot(
  equalTo(StringEq)("destroyed"),
)

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

type SpacingCarry = Readonly<{ target: ElementNode; spacing: BlockSpacing }>

type SiblingAccessor = (node: ElementNode) => LexicalNode | null

const ADJACENT_SIBLINGS: readonly SiblingAccessor[] = [
  (node) => node.getPreviousSibling(),
  (node) => node.getNextSibling(),
]

const $getNewSiblingBlocks =
  (previousState: EditorState) =>
  (block: ElementNode): readonly ElementNode[] =>
    pipe(
      ADJACENT_SIBLINGS,
      RAflap(block.getLatest()),
      RAfilter($isSpacingBlock),
      RAfilter($isNewNode(previousState)),
    )

const $getCarriedSpacing = (source: ElementNode): readonly BlockSpacing[] =>
  pipe(source, $getBlockSpacing, OfromPredicate(hasSpacing), RAfromOption)

const $collectSpacingCarries =
  (previousState: EditorState) =>
  (source: Option<ElementNode>): readonly SpacingCarry[] =>
    pipe(
      RADo,
      RAapS("block", RAfromOption(source)),
      RAbind("spacing", ({ block }) => $getCarriedSpacing(block)),
      RAbind("target", ({ block }) =>
        $getNewSiblingBlocks(previousState)(block),
      ),
    )

const $resolveSpacingSource =
  (selection: RangeSelection): IO<Option<ElementNode>> =>
  () =>
    pipe(selection.anchor.getNode(), $getSpacingBlock)

const $insertParagraph =
  (selection: RangeSelection): IO<void> =>
  () =>
    selection.insertParagraph()

const $applySpacingCarries =
  (carries: readonly SpacingCarry[]): IO<void> =>
  () =>
    carries.forEach(({ target, spacing }) =>
      $applyBlockSpacing(target, spacing),
    )

/** The source is resolved before the split moves the selection. */
const $splitKeepingSpacing =
  (editor: LexicalEditor) =>
  (selection: RangeSelection): IO<void> =>
    pipe(
      $resolveSpacingSource(selection),
      IOtap(() => $insertParagraph(selection)),
      IOmap($collectSpacingCarries(editor.getEditorState())),
      IOflatMap($applySpacingCarries),
    )

/**
 * Like a word processor, a paragraph created by pressing Enter continues the
 * spacing of the paragraph it was split from.
 */
const $insertParagraphKeepingSpacing = (editor: LexicalEditor): IO<boolean> =>
  pipe(
    $getSelection,
    IOmap(OfromPredicate($isRangeSelection)),
    IOflatMap(
      Omatch(
        constant(IOof(false)),
        flow($splitKeepingSpacing(editor), IOas(true)),
      ),
    ),
  )

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
        () => $insertParagraphKeepingSpacing(editor)(),
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor])
  return undefined
}

export { BlockSpacingPlugin }
