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
  type RangeSelection,
  type StateConfig,
} from "lexical"
import { $findMatchingParent } from "@lexical/utils"
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text"
import { $isListItemNode } from "@lexical/list"
import { flow, pipe } from "fp-ts/function"
import {
  type Option,
  filter as Ofilter,
  fromNullable as OfromNullable,
  fromPredicate as OfromPredicate,
  getOrElse as OgetOrElse,
  isNone as OisNone,
  isSome as OisSome,
  map as Omap,
  none as Onone,
  toUndefined as OtoUndefined,
} from "fp-ts/Option"
import {
  filterMap as RAfilterMap,
  flatMap as RAflatMap,
  fromOption as RAfromOption,
  map as RAmap,
  some as RAsome,
  uniq as RAuniq,
} from "fp-ts/ReadonlyArray"
import { map as RRmap } from "fp-ts/ReadonlyRecord"
import { type Refinement, or as Ror } from "fp-ts/Refinement"
import { contramap as EqContramap } from "fp-ts/Eq"
import { Eq as StringEq } from "fp-ts/string"
import { isNumber, Ord as NumberOrd } from "fp-ts/number"
import { between } from "fp-ts/Ord"
import { type Predicate, and as Pand } from "fp-ts/Predicate"

enum SpacingProperty {
  LINE_HEIGHT = "lineHeight",
  SPACE_BEFORE = "spaceBefore",
  SPACE_AFTER = "spaceAfter",
}

type BlockSpacing = Readonly<Record<SpacingProperty, Option<number>>>
type SpacingChange = readonly [SpacingProperty, Option<number>]

const MAX_LINE_HEIGHT = 5
const MAX_PARAGRAPH_SPACE = 200
type SpacingDeclaration = Readonly<{
  cssProperty: string
  value: Option<string>
}>

// Number.isFinite is required because Ord.between lets NaN through.
const isSpacingValueWithin = (max: number): Predicate<number> =>
  pipe(between(NumberOrd)(0, max), Pand<number>(Number.isFinite))

const parseSpacingValue = (max: number): ((value: unknown) => Option<number>) =>
  flow(OfromPredicate(isNumber), Ofilter(isSpacingValueWithin(max)))

/**
 * NodeState values are serialized under the node's "$" key in the editor
 * JSON. Unset values are not serialized, so existing content is unaffected.
 */
const createSpacingState = (
  key: SpacingProperty,
  max: number,
): StateConfig<SpacingProperty, number | undefined> =>
  createState(key, { parse: flow(parseSpacingValue(max), OtoUndefined) })

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

const SPACING_PROPERTIES: readonly SpacingProperty[] =
  Object.values(SpacingProperty)

const EMPTY_SPACING: BlockSpacing = {
  [SpacingProperty.LINE_HEIGHT]: Onone,
  [SpacingProperty.SPACE_BEFORE]: Onone,
  [SpacingProperty.SPACE_AFTER]: Onone,
}

const $isSpacingBlock: Refinement<LexicalNode | null | undefined, ElementNode> =
  pipe(
    $isParagraphNode,
    Ror($isHeadingNode),
    Ror($isQuoteNode),
    Ror($isListItemNode),
  )

/** Nearest spacing-capable block, starting from (and including) the node. */
const $getSpacingBlock = (node: LexicalNode): Option<ElementNode> =>
  OfromNullable($findMatchingParent(node, $isSpacingBlock))

const KEY_EQ = EqContramap((node: ElementNode) => node.getKey())(StringEq)

/**
 * Returns every distinct spacing-capable block touched by the selection,
 * in document order.
 */
const $getTouchedNodes = (
  selection: RangeSelection,
): readonly LexicalNode[] => [
  selection.anchor.getNode(),
  ...selection.getNodes(),
  selection.focus.getNode(),
]

const $getSelectedSpacingBlocks = (
  selection: BaseSelection | null,
): readonly ElementNode[] =>
  pipe(
    selection,
    OfromPredicate($isRangeSelection),
    RAfromOption,
    RAflatMap($getTouchedNodes),
    RAfilterMap($getSpacingBlock),
    RAuniq(KEY_EQ),
  )

const $getBlockSpacing = (node: LexicalNode): BlockSpacing =>
  pipe(
    SPACING_STATES,
    RRmap((state) => OfromNullable($getState(node, state))),
  )

const toSpacingChanges = (spacing: BlockSpacing): readonly SpacingChange[] =>
  pipe(
    SPACING_PROPERTIES,
    RAmap((property): SpacingChange => [property, spacing[property]]),
  )

const $setBlockSpacing = (
  node: LexicalNode,
  property: SpacingProperty,
  value: Option<number>,
): LexicalNode => $setState(node, SPACING_STATES[property], OtoUndefined(value))

const $applySpacingChanges =
  (changes: readonly SpacingChange[]) =>
  (node: LexicalNode): void =>
    changes.forEach(([property, value]) =>
      $setBlockSpacing(node, property, value),
    )

const $applyBlockSpacing = (node: LexicalNode, spacing: BlockSpacing): void =>
  $applySpacingChanges(toSpacingChanges(spacing))(node)

const hasSpacing = (spacing: BlockSpacing): boolean =>
  pipe(
    SPACING_PROPERTIES,
    RAsome((property) => OisSome(spacing[property])),
  )

/**
 * Whether the node did not exist in the given (previously committed) editor
 * state, i.e. it was created during the current update.
 */
const $isNewNode = (node: LexicalNode, previousState: EditorState): boolean =>
  pipe($getNodeByKey(node.getKey(), previousState), OfromNullable, OisNone)

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

const toSpacingDeclaration = ([
  property,
  value,
]: SpacingChange): SpacingDeclaration => ({
  cssProperty: CSS_BY_SPACING_PROPERTY[property].cssProperty,
  value: pipe(value, Omap(CSS_BY_SPACING_PROPERTY[property].format)),
})

/** Maps a block spacing to CSS declarations; None means use the theme default. */
const getSpacingDeclarations: (
  spacing: BlockSpacing,
) => readonly SpacingDeclaration[] = flow(
  toSpacingChanges,
  RAmap(toSpacingDeclaration),
)

// CSSOM treats an empty value as removeProperty, restoring the theme default.
const toCssValue: (value: Option<string>) => string = OgetOrElse(() => "")

const applySpacingToElement = (
  element: HTMLElement,
  spacing: BlockSpacing,
): void =>
  getSpacingDeclarations(spacing).forEach(({ cssProperty, value }) =>
    element.style.setProperty(cssProperty, toCssValue(value)),
  )

export {
  SpacingProperty,
  EMPTY_SPACING,
  toSpacingChanges,
  $applySpacingChanges,
  parseSpacingValue,
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
export type { BlockSpacing, SpacingChange }
