import {
  $getState,
  $getNodeByKey,
  $isParagraphNode,
  $isRangeSelection,
  $setState,
  createState,
  type BaseSelection,
  type EditorState,
  type ElementNode,
  type LexicalNode,
  type StateConfig,
} from "lexical"
import { $findMatchingParent } from "@lexical/utils"
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text"
import { $isListItemNode } from "@lexical/list"
import { pipe } from "fp-ts/function"
import {
  type Option,
  fromNullable as OfromNullable,
  fromPredicate as OfromPredicate,
  isSome as OisSome,
  match as Omatch,
  toUndefined as OtoUndefined,
} from "fp-ts/Option"
import {
  filterMap as AfilterMap,
  findFirst as AfindFirst,
  map as Amap,
  uniq as Auniq,
} from "fp-ts/Array"
import { contramap as EqContramap } from "fp-ts/Eq"
import { Eq as StringEq } from "fp-ts/string"

enum SpacingProperty {
  LINE_HEIGHT = "lineHeight",
  SPACE_BEFORE = "spaceBefore",
  SPACE_AFTER = "spaceAfter",
}

type BlockSpacing = Record<SpacingProperty, Option<number>>

const MAX_LINE_HEIGHT = 5
const MAX_PARAGRAPH_SPACE = 200
type SpacingDeclaration = { cssProperty: string; value: string }

const isWithin =
  (max: number): ((value: unknown) => value is number) =>
  (value): value is number =>
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= max

/**
 * NodeState values are serialized under the node's "$" key in the editor
 * JSON. Unset values are not serialized, so existing content is unaffected.
 */
const createSpacingState = (
  key: SpacingProperty,
  max: number,
): StateConfig<SpacingProperty, number | undefined> =>
  createState(key, {
    parse: (value: unknown): number | undefined =>
      pipe(value, OfromPredicate(isWithin(max)), OtoUndefined),
  })

const SPACING_STATES = {
  [SpacingProperty.LINE_HEIGHT]: createSpacingState(
    SpacingProperty.LINE_HEIGHT,
    MAX_LINE_HEIGHT,
  ),
  [SpacingProperty.SPACE_BEFORE]: createSpacingState(
    SpacingProperty.SPACE_BEFORE,
    MAX_PARAGRAPH_SPACE,
  ),
  [SpacingProperty.SPACE_AFTER]: createSpacingState(
    SpacingProperty.SPACE_AFTER,
    MAX_PARAGRAPH_SPACE,
  ),
}

const SPACING_PROPERTIES = Object.values(SpacingProperty)

const $isSpacingBlock = (
  node: LexicalNode | null | undefined,
): node is ElementNode =>
  $isParagraphNode(node) ||
  $isHeadingNode(node) ||
  $isQuoteNode(node) ||
  $isListItemNode(node)

/** Nearest spacing-capable block, starting from (and including) the node. */
const $getSpacingBlock = (node: LexicalNode): Option<ElementNode> =>
  OfromNullable($findMatchingParent(node, $isSpacingBlock))

const KEY_EQ = EqContramap((node: ElementNode) => node.getKey())(StringEq)

/**
 * Returns every distinct spacing-capable block touched by the selection,
 * in document order.
 */
const $getSelectedSpacingBlocks = (
  selection: BaseSelection | null,
): ElementNode[] => {
  if (!$isRangeSelection(selection)) return []
  return pipe(
    [
      selection.anchor.getNode(),
      ...selection.getNodes(),
      selection.focus.getNode(),
    ],
    AfilterMap($getSpacingBlock),
    Auniq(KEY_EQ),
  )
}

const $getBlockSpacing = (node: LexicalNode): BlockSpacing => ({
  [SpacingProperty.LINE_HEIGHT]: OfromNullable(
    $getState(node, SPACING_STATES[SpacingProperty.LINE_HEIGHT]),
  ),
  [SpacingProperty.SPACE_BEFORE]: OfromNullable(
    $getState(node, SPACING_STATES[SpacingProperty.SPACE_BEFORE]),
  ),
  [SpacingProperty.SPACE_AFTER]: OfromNullable(
    $getState(node, SPACING_STATES[SpacingProperty.SPACE_AFTER]),
  ),
})

const $setBlockSpacing = (
  node: LexicalNode,
  property: SpacingProperty,
  value: Option<number>,
): LexicalNode => $setState(node, SPACING_STATES[property], OtoUndefined(value))

const $applyBlockSpacing = (node: LexicalNode, spacing: BlockSpacing): void => {
  SPACING_PROPERTIES.forEach((property) =>
    $setBlockSpacing(node, property, spacing[property]),
  )
}

const hasSpacing = (spacing: BlockSpacing): boolean =>
  pipe(
    SPACING_PROPERTIES,
    AfindFirst((property) => OisSome(spacing[property])),
    OisSome,
  )

/**
 * Whether the node did not exist in the given (previously committed) editor
 * state, i.e. it was created during the current update.
 */
const $isNewNode = (node: LexicalNode, previousState: EditorState): boolean =>
  $getNodeByKey(node.getKey(), previousState) === null

const toPx = (value: number): string => `${value}px`
const toLineHeight = (value: number): string => `${value}`

const CSS_BY_SPACING_PROPERTY = {
  [SpacingProperty.LINE_HEIGHT]: {
    cssProperty: "line-height",
    format: toLineHeight,
  },
  [SpacingProperty.SPACE_BEFORE]: { cssProperty: "margin-top", format: toPx },
  [SpacingProperty.SPACE_AFTER]: { cssProperty: "margin-bottom", format: toPx },
}

/**
 * Maps a block spacing to CSS declarations. An empty string value means the
 * declaration should be removed so the theme default applies.
 */
const getSpacingDeclarations = (spacing: BlockSpacing): SpacingDeclaration[] =>
  pipe(
    SPACING_PROPERTIES,
    Amap((property) => {
      const { cssProperty, format } = CSS_BY_SPACING_PROPERTY[property]
      return {
        cssProperty,
        value: pipe(
          spacing[property],
          Omatch(() => "", format),
        ),
      }
    }),
  )

const applySpacingToElement = (
  element: HTMLElement,
  spacing: BlockSpacing,
): void => {
  getSpacingDeclarations(spacing).forEach(({ cssProperty, value }) => {
    if (value === "") {
      element.style.removeProperty(cssProperty)
      return
    }
    element.style.setProperty(cssProperty, value)
  })
}

export {
  SpacingProperty,
  $isSpacingBlock,
  $getSpacingBlock,
  $getSelectedSpacingBlocks,
  $getBlockSpacing,
  $setBlockSpacing,
  $applyBlockSpacing,
  hasSpacing,
  $isNewNode,
  getSpacingDeclarations,
  applySpacingToElement,
}
export type { BlockSpacing }
