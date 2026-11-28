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
import { flow, pipe } from "fp-ts/function"
import { isSome as OisSome, toNullable as OtoNullable } from "fp-ts/Option"
import { map as RAmap } from "fp-ts/ReadonlyArray"
import { id as Lid, prop as Lprop } from "monocle-ts/Lens"
import {
  buildFrom,
  contramapView,
  foldViews,
  getHandlerMonoid,
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
import {
  EMPTY_SPACING,
  type BlockSpacing,
  type SpacingChange,
} from "../utils/blockSpacing"
import { Aura } from "./Aura"
import {
  isCurrentValue,
  optionLabelLens,
  optionValueLens,
  REMOVE_PARAGRAPH_SPACE,
  RESET_SPACING,
  SECTIONS,
  toOptionChange,
  type SpacingSection,
} from "./helpers/lineSpacingHelpers"

// ---------------------------------------------------------------------------
// Layout constants and origin optics
// ---------------------------------------------------------------------------

const TITLE = "Line & paragraph spacing"
const FOOTER_SPACING = 1.5

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
