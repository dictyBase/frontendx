import { flow, pipe, tuple } from "fp-ts/function"
import {
  type Option,
  none as Onone,
  some as Osome,
  getEq as OgetEq,
} from "fp-ts/Option"
import { contramap as Pcontramap, type Predicate } from "fp-ts/Predicate"
import {
  getMonoid as RAgetMonoid,
  map as RAmap,
  of as RAof,
  prepend as RAprepend,
  Traversable as RATraversable,
} from "fp-ts/ReadonlyArray"
import { type ReadonlyNonEmptyArray } from "fp-ts/ReadonlyNonEmptyArray"
import { Eq as NumberEq } from "fp-ts/number"
import {
  component as Lcomponent,
  id as Lid,
  prop as Lprop,
  type Lens,
} from "monocle-ts/Lens"
import {
  composeLens as TcomposeLens,
  filter as Tfilter,
  foldMap as TfoldMap,
  fromTraversable as TfromTraversable,
  set as Tset,
} from "monocle-ts/Traversal"
import { buildFrom, notEqualString, stringEq } from "@dictybase/fp-ts-loom"
import {
  EMPTY_SPACING,
  SpacingProperty,
  toSpacingChanges,
  type BlockSpacing,
  type SpacingChange,
} from "../../utils/blockSpacing"

type SpacingOption = Readonly<{ label: string; value: Option<number> }>
type LineHeightPreset = Readonly<{ label: string; height: number }>
type SpacingSection = Readonly<{
  heading: string
  property: SpacingProperty
  options: readonly SpacingOption[]
}>
type SectionHeadingPair = readonly [string, SpacingProperty]

const ONE_AND_A_HALF = 1.5
const NO_PARAGRAPH_SPACE = 0

const optionLabelLens = pipe(Lid<SpacingOption>(), Lprop("label"))
const optionValueLens = pipe(Lid<SpacingOption>(), Lprop("value"))

const presetLabelLens = pipe(Lid<LineHeightPreset>(), Lprop("label"))
const presetHeightLens = pipe(Lid<LineHeightPreset>(), Lprop("height"))

const sectionHeadingLens = pipe(Lid<SpacingSection>(), Lprop("heading"))
const sectionPropertyLens = pipe(Lid<SpacingSection>(), Lprop("property"))
const sectionOptionsLens = pipe(Lid<SpacingSection>(), Lprop("options"))

const pairHeadingLens = pipe(Lid<SectionHeadingPair>(), Lcomponent(0))
const pairPropertyLens = pipe(Lid<SectionHeadingPair>(), Lcomponent(1))

// Raw data tables: domain presets with no upstream source to derive from.

const LINE_HEIGHT_PRESETS: ReadonlyNonEmptyArray<LineHeightPreset> = [
  { label: "Single", height: 1 },
  { label: "1.15", height: 1.15 },
  { label: "1.5", height: ONE_AND_A_HALF },
  { label: "Double", height: 2 },
]

const PARAGRAPH_SPACE_PX: ReadonlyNonEmptyArray<number> = [4, 8, 12, 16, 24]

const SECTION_HEADINGS: ReadonlyNonEmptyArray<SectionHeadingPair> = [
  tuple("Line spacing", SpacingProperty.LINE_HEIGHT),
  tuple("Space before", SpacingProperty.SPACE_BEFORE),
  tuple("Space after", SpacingProperty.SPACE_AFTER),
]

// Option builders: each one modifies DEFAULT_OPTION through lenses.

const DEFAULT_OPTION: SpacingOption = { label: "Default", value: Onone }

const NONE_OPTION: SpacingOption = pipe(
  DEFAULT_OPTION,
  optionLabelLens.set("None"),
  optionValueLens.set(Osome(NO_PARAGRAPH_SPACE)),
)

const toPixelLabel = (px: number): string => `${px} px`

const toLineOption = buildFrom<LineHeightPreset, SpacingOption>(
  DEFAULT_OPTION,
  [
    flow(presetLabelLens.get, optionLabelLens.set),
    flow(presetHeightLens.get, Osome, optionValueLens.set),
  ],
)

const toPixelOption = buildFrom<number, SpacingOption>(DEFAULT_OPTION, [
  flow(toPixelLabel, optionLabelLens.set),
  flow(Osome, optionValueLens.set),
])

/** Every option list starts with "Default", which clears the value. */
const withDefault = RAprepend(DEFAULT_OPTION)

const LINE_SPACING_OPTIONS: readonly SpacingOption[] = pipe(
  LINE_HEIGHT_PRESETS,
  RAmap(toLineOption),
  withDefault,
)

const PARAGRAPH_SPACE_OPTIONS: readonly SpacingOption[] = pipe(
  PARAGRAPH_SPACE_PX,
  RAmap(toPixelOption),
  RAprepend(NONE_OPTION),
  withDefault,
)

// The menu layout table, built from SECTION_HEADINGS via lenses + Traversal.

const DEFAULT_SECTION: SpacingSection = {
  heading: "",
  property: SpacingProperty.SPACE_BEFORE,
  options: PARAGRAPH_SPACE_OPTIONS,
}

const toSpacingSection = buildFrom<SectionHeadingPair, SpacingSection>(
  DEFAULT_SECTION,
  [
    flow(pairHeadingLens.get, sectionHeadingLens.set),
    flow(pairPropertyLens.get, sectionPropertyLens.set),
  ],
)

const sectionsTraversal = TfromTraversable(RATraversable)<SpacingSection>()

const isLineHeightSection: Predicate<SpacingSection> = pipe(
  stringEq(SpacingProperty.LINE_HEIGHT),
  Pcontramap(sectionPropertyLens.get),
)

/** Paragraph space is every spacing property except line height. */
const isParagraphSpace: Predicate<SpacingSection> = pipe(
  notEqualString(SpacingProperty.LINE_HEIGHT),
  Pcontramap(sectionPropertyLens.get),
)

const lineHeightOptionsTraversal = pipe(
  sectionsTraversal,
  Tfilter(isLineHeightSection),
  TcomposeLens(sectionOptionsLens),
)

const paragraphPropertiesTraversal = pipe(
  sectionsTraversal,
  Tfilter(isParagraphSpace),
  TcomposeLens(sectionPropertyLens),
)

const setLineSpacingOptions = pipe(
  lineHeightOptionsTraversal,
  Tset(LINE_SPACING_OPTIONS),
)

const SECTIONS: readonly SpacingSection[] = pipe(
  SECTION_HEADINGS,
  RAmap(toSpacingSection),
  setLineSpacingOptions,
)

const toZeroChange = (property: SpacingProperty): SpacingChange =>
  tuple(property, Osome(NO_PARAGRAPH_SPACE))

const collectZeroChanges = pipe(
  paragraphPropertiesTraversal,
  TfoldMap(RAgetMonoid<SpacingChange>())(flow(toZeroChange, RAof)),
)

const REMOVE_PARAGRAPH_SPACE: readonly SpacingChange[] = pipe(
  SECTIONS,
  collectZeroChanges,
)

const RESET_SPACING: readonly SpacingChange[] = toSpacingChanges(EMPTY_SPACING)

// Pure rules: which option is checked, what a click changes.

const OPTION_EQ = OgetEq(NumberEq)

const spacingPropertyLens = (
  property: SpacingProperty,
): Lens<BlockSpacing, Option<number>> =>
  pipe(Lid<BlockSpacing>(), Lprop(property))

/** True for the option value that the block already has for `property`. */
const isCurrentValue = (
  current: BlockSpacing,
  property: SpacingProperty,
): Predicate<Option<number>> => {
  const currentValue = spacingPropertyLens(property).get(current)
  const matchesCurrent: Predicate<Option<number>> = (value) =>
    OPTION_EQ.equals(currentValue, value)
  return matchesCurrent
}

const toOptionChange = (
  property: SpacingProperty,
  value: Option<number>,
): readonly SpacingChange[] => pipe(tuple(property, value), RAof)

export {
  isCurrentValue,
  optionLabelLens,
  optionValueLens,
  REMOVE_PARAGRAPH_SPACE,
  RESET_SPACING,
  SECTIONS,
  toOptionChange,
  type SpacingSection,
}
