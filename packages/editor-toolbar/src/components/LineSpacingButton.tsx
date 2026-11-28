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
import { pipe, tuple } from "fp-ts/function"
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
  filter as RAfilter,
  map as RAmap,
  of as RAof,
  prepend as RAprepend,
} from "fp-ts/ReadonlyArray"
import { type ReadonlyNonEmptyArray } from "fp-ts/ReadonlyNonEmptyArray"
import { Eq as NumberEq } from "fp-ts/number"
import {
  foldViews,
  notEqualString,
  whenNode,
  wrapView,
  type Handler,
  type View,
} from "@dictybase/fp-ts-loom"
import { useLineSpacing } from "../hooks/useLineSpacing"
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
// Menu data: what the user can pick
// ---------------------------------------------------------------------------

type SpacingOption = Readonly<{ label: string; value: Option<number> }>
type LineHeightPreset = Readonly<{ label: string; height: number }>
type SpacingSection = Readonly<{
  heading: string
  property: SpacingProperty
  options: readonly SpacingOption[]
}>

const TITLE = "Line & paragraph spacing"
const ONE_AND_A_HALF = 1.5
const NO_PARAGRAPH_SPACE = 0
const FOOTER_SPACING = 1.5

// Raw data tables. These are the only list literals: nothing derives them.

const LINE_HEIGHT_PRESETS: ReadonlyNonEmptyArray<LineHeightPreset> = [
  { label: "Single", height: 1 },
  { label: "1.15", height: 1.15 },
  { label: "1.5", height: ONE_AND_A_HALF },
  { label: "Double", height: 2 },
]

const PARAGRAPH_SPACE_PX: ReadonlyNonEmptyArray<number> = [4, 8, 12, 16, 24]

// Option builders: each one lifts one kind of raw data into a SpacingOption.

const DEFAULT_OPTION: SpacingOption = { label: "Default", value: Onone }

const NONE_OPTION: SpacingOption = {
  label: "None",
  value: Osome(NO_PARAGRAPH_SPACE),
}

const toLineOption = ({ label, height }: LineHeightPreset): SpacingOption => {
  const option: SpacingOption = { label, value: Osome(height) }
  return option
}

const toPixelOption = (px: number): SpacingOption => {
  const option: SpacingOption = { label: `${px} px`, value: Osome(px) }
  return option
}

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

// The menu layout table: one column for each spacing property.

const SECTIONS: readonly SpacingSection[] = [
  {
    heading: "Line spacing",
    property: SpacingProperty.LINE_HEIGHT,
    options: LINE_SPACING_OPTIONS,
  },
  {
    heading: "Space before",
    property: SpacingProperty.SPACE_BEFORE,
    options: PARAGRAPH_SPACE_OPTIONS,
  },
  {
    heading: "Space after",
    property: SpacingProperty.SPACE_AFTER,
    options: PARAGRAPH_SPACE_OPTIONS,
  },
]

// Preset changes, derived from the layout table.

const propertyOf = ({ property }: SpacingSection): SpacingProperty => property

/** Paragraph space is every spacing property except line height. */
const isParagraphSpace: Predicate<SpacingSection> = pipe(
  notEqualString(SpacingProperty.LINE_HEIGHT),
  Pcontramap(propertyOf),
)

const toZeroChange = (section: SpacingSection): SpacingChange =>
  tuple(propertyOf(section), Osome(NO_PARAGRAPH_SPACE))

const REMOVE_PARAGRAPH_SPACE: readonly SpacingChange[] = pipe(
  SECTIONS,
  RAfilter(isParagraphSpace),
  RAmap(toZeroChange),
)

const RESET_SPACING: readonly SpacingChange[] = toSpacingChanges(EMPTY_SPACING)

// ---------------------------------------------------------------------------
// Pure rules: which option is checked, what a click changes
// ---------------------------------------------------------------------------

const OPTION_EQ = OgetEq(NumberEq)

/** True for the option value that the block already has for `property`. */
const isCurrentValue = (
  current: BlockSpacing,
  property: SpacingProperty,
): Predicate<Option<number>> => {
  const matchesCurrent: Predicate<Option<number>> = (value) =>
    OPTION_EQ.equals(current[property], value)
  return matchesCurrent
}

const toOptionChange = (
  property: SpacingProperty,
  value: Option<number>,
): readonly SpacingChange[] => pipe(tuple(property, value), RAof)

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const anchorOrigin: PopoverOrigin = { vertical: "bottom", horizontal: "left" }
const transformOrigin: PopoverOrigin = { vertical: "top", horizontal: "left" }

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

type SpacingSectionColumnProperties = SpacingPanelProperties &
  Readonly<{ section: SpacingSection }>

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
          RAmap(({ label, value }) => (
            <SpacingOptionItem
              key={label}
              label={label}
              isSelected={isSelected(value)}
              onSelect={() => onApply(toOptionChange(property, value))}
            />
          )),
        )}
      </MenuList>
    </Box>
  )
}

// ---------------------------------------------------------------------------
// Panel views: the popover body, top to bottom
// ---------------------------------------------------------------------------

const SpacingColumns: View<SpacingPanelProperties> = (
  properties: SpacingPanelProperties,
) => (
  <Box sx={columnsStyles}>
    {pipe(
      SECTIONS,
      RAmap((section) => (
        <SpacingSectionColumn
          key={section.property}
          section={section}
          {...properties}
        />
      )),
    )}
  </Box>
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
  const isOpen = OisSome(menu.anchor)
  return (
    <>
      <SpacingTrigger isOpen={isOpen} onOpen={open} />
      <Popover
        open={isOpen}
        anchorEl={OtoNullable(menu.anchor)}
        onClose={close}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}>
        <SpacingPanel current={menu.current} onApply={apply} />
      </Popover>
    </>
  )
}

export { LineSpacingButton }
