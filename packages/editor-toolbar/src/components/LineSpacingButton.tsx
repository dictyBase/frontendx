import { type MouseEvent, type ReactElement, type ReactNode } from "react"
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  type PopoverOrigin,
  Stack,
  Typography,
} from "@mui/material"
import { Check, FormatLineSpacing } from "@mui/icons-material"
import { flow, pipe, tuple } from "fp-ts/function"
import {
  type Option,
  none as Onone,
  some as Osome,
  getEq as OgetEq,
  isSome as OisSome,
  toNullable as OtoNullable,
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
import {
  buildFrom,
  contramapView,
  foldViews,
  getHandlerMonoid,
  notEqualString,
  stringEq,
  whenNode,
  wrapView,
  type Handler,
  type View,
} from "@dictybase/fp-ts-loom"
import {
  menuAnchorLens,
  menuCurrentLens,
  useLineSpacing,
} from "../hooks/useLineSpacing"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { Aura } from "./Aura"
import {
  EMPTY_SPACING,
  SpacingProperty,
  toSpacingChanges,
  type BlockSpacing,
  type SpacingChange,
} from "../utils/blockSpacing"

// ---------------------------------------------------------------------------
// Menu data and optics: what the user can pick
// ---------------------------------------------------------------------------

type SpacingOption = Readonly<{ label: string; value: Option<number> }>
type LineHeightPreset = Readonly<{ label: string; height: number }>
type SpacingSection = Readonly<{
  heading: string
  property: SpacingProperty
  options: readonly SpacingOption[]
}>
type SectionHeadingPair = readonly [string, SpacingProperty]

const TITLE = "Line & paragraph spacing"
const ONE_AND_A_HALF = 1.5
const NO_PARAGRAPH_SPACE = 0
const FOOTER_SPACING = 1.5

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

// ---------------------------------------------------------------------------
// Pure rules: which option is checked, what a click changes
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const verticalOriginLens = pipe(Lid<PopoverOrigin>(), Lprop("vertical"))

const ANCHOR_ORIGIN: PopoverOrigin = { vertical: "bottom", horizontal: "left" }
const TRANSFORM_ORIGIN: PopoverOrigin = pipe(
  ANCHOR_ORIGIN,
  verticalOriginLens.set("top"),
)

const popoverStyles = { py: 1, width: "min(440px, 95vw)" }

const columnsStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
}

const headingStyles = {
  display: "block",
  px: 2,
  color: "text.secondary",
  lineHeight: 2,
}

const actionsStyles = { px: FOOTER_SPACING, pt: FOOTER_SPACING }

const tipStyles = { display: "block", px: 2, pt: 1 }

// ---------------------------------------------------------------------------
// Leaf pieces: each one renders one thing
// ---------------------------------------------------------------------------

type SpacingTriggerProperties = Readonly<{
  isOpen: boolean
  onOpen: Handler<MouseEvent<HTMLElement>>
}>

/** The toolbar icon that opens the spacing menu. */
const SpacingTrigger = ({
  isOpen,
  onOpen,
}: SpacingTriggerProperties): ReactElement => {
  const styles = useToolbarItemStyles()
  return (
    <IconButton
      sx={styles.root}
      title={TITLE}
      aria-label={TITLE}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={onOpen}
      size="large">
      <FormatLineSpacing fontSize="small" />
    </IconButton>
  )
}

type SpacingOptionItemProperties = Readonly<{
  label: string
  isSelected: boolean
  onSelect: () => void
}>

/** One radio item. A check mark shows the selected value. */
const SpacingOptionItem = ({
  label,
  isSelected,
  onSelect,
}: SpacingOptionItemProperties): ReactElement => (
  <MenuItem
    selected={isSelected}
    aria-checked={isSelected}
    role="menuitemradio"
    onClick={onSelect}>
    <ListItemIcon>
      {whenNode(isSelected)(() => (
        <Check fontSize="small" />
      ))}
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
  </MenuItem>
)

/**
 * Everything the panel body needs. Every panel view reads this one record, so
 * the views compose with `foldViews`.
 */
type SpacingPanelProperties = Readonly<{
  current: BlockSpacing
  onApply: Handler<readonly SpacingChange[]>
}>

type SpacingSectionColumnProperties = Readonly<{
  section: SpacingSection
  current: BlockSpacing
  onApply: Handler<readonly SpacingChange[]>
}>

/** One column: a heading and the radio list for one spacing property. */
const SpacingSectionColumn = ({
  section: { heading, property, options },
  current,
  onApply,
}: SpacingSectionColumnProperties): ReactElement => {
  const isSelected = isCurrentValue(current, property)
  return (
    <Box component="section" aria-label={heading}>
      <Typography variant="overline" sx={headingStyles}>
        {heading}
      </Typography>
      <MenuList dense aria-label={heading} autoFocusItem={false}>
        {pipe(
          options,
          RAmap((option) => {
            const label = optionLabelLens.get(option)
            const value = optionValueLens.get(option)
            return (
              <SpacingOptionItem
                key={label}
                label={label}
                isSelected={isSelected(value)}
                onSelect={() => onApply(toOptionChange(property, value))}
              />
            )
          }),
        )}
      </MenuList>
    </Box>
  )
}

// ---------------------------------------------------------------------------
// Panel views: the popover body, top to bottom
// ---------------------------------------------------------------------------

const columnCurrentLens = pipe(
  Lid<SpacingSectionColumnProperties>(),
  Lprop("current"),
)
const columnOnApplyLens = pipe(
  Lid<SpacingSectionColumnProperties>(),
  Lprop("onApply"),
)
const panelCurrentLens = pipe(Lid<SpacingPanelProperties>(), Lprop("current"))
const panelOnApplyLens = pipe(Lid<SpacingPanelProperties>(), Lprop("onApply"))

const withSection = (
  section: SpacingSection,
): ((properties: SpacingPanelProperties) => SpacingSectionColumnProperties) =>
  buildFrom<SpacingPanelProperties, SpacingSectionColumnProperties>(
    {
      section,
      current: EMPTY_SPACING,
      onApply: getHandlerMonoid<readonly SpacingChange[]>().empty,
    },
    [
      flow(panelCurrentLens.get, columnCurrentLens.set),
      flow(panelOnApplyLens.get, columnOnApplyLens.set),
    ],
  )

const withColumnsGrid = (columns: ReactNode): ReactNode => (
  <Box sx={columnsStyles}>{columns}</Box>
)

const toSectionView = (section: SpacingSection): View<SpacingPanelProperties> =>
  pipe(SpacingSectionColumn, contramapView(withSection(section)))

const SECTION_VIEWS: readonly View<SpacingPanelProperties>[] = pipe(
  SECTIONS,
  RAmap(toSectionView),
)

const SpacingColumns: View<SpacingPanelProperties> = pipe(
  foldViews(SECTION_VIEWS),
  wrapView(withColumnsGrid),
)

const SectionDivider: View<SpacingPanelProperties> = () => <Divider />

const SpacingActions: View<SpacingPanelProperties> = ({
  onApply,
}: SpacingPanelProperties) => (
  <Stack
    direction="row"
    spacing={FOOTER_SPACING}
    alignItems="center"
    sx={actionsStyles}>
    <Aura>
      <Button
        size="small"
        color="inherit"
        onClick={() => onApply(REMOVE_PARAGRAPH_SPACE)}>
        Remove space between paragraphs
      </Button>
    </Aura>
    <Button size="small" color="inherit" onClick={() => onApply(RESET_SPACING)}>
      Reset
    </Button>
  </Stack>
)

const SpacingTip: View<SpacingPanelProperties> = () => (
  <Typography variant="caption" color="text.secondary" sx={tipStyles}>
    Tip: press Shift+Enter for a new line within the same paragraph.
  </Typography>
)

const withPanelFrame = (body: ReactNode): ReactNode => (
  <Box sx={popoverStyles}>{body}</Box>
)

/** The popover body: columns, divider, actions and tip in one frame. */
const SpacingPanel: View<SpacingPanelProperties> = pipe(
  foldViews([SpacingColumns, SectionDivider, SpacingActions, SpacingTip]),
  wrapView(withPanelFrame),
)

// ---------------------------------------------------------------------------
// The toolbar control: state from the hook, layout from the pieces
// ---------------------------------------------------------------------------

const LineSpacingButton = (): ReactElement => {
  const { menu, open, close, apply } = useLineSpacing()
  const anchor = menuAnchorLens.get(menu)
  const isOpen = OisSome(anchor)
  return (
    <>
      <SpacingTrigger isOpen={isOpen} onOpen={open} />
      <Popover
        open={isOpen}
        anchorEl={OtoNullable(anchor)}
        onClose={close}
        anchorOrigin={ANCHOR_ORIGIN}
        transformOrigin={TRANSFORM_ORIGIN}>
        <SpacingPanel current={menuCurrentLens.get(menu)} onApply={apply} />
      </Popover>
    </>
  )
}

export { LineSpacingButton }
