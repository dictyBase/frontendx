import { useState, type MouseEvent, type ReactElement } from "react"
import { $getSelection } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
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
  Stack,
  Typography,
} from "@mui/material"
import { Check, FormatLineSpacing } from "@mui/icons-material"
import { pipe } from "fp-ts/function"
import {
  type Option,
  none as Onone,
  some as Osome,
  getEq as OgetEq,
  isSome as OisSome,
  toNullable as OtoNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match as Bmatch } from "fp-ts/boolean"
import { head as RAhead, map as RAmap } from "fp-ts/ReadonlyArray"
import { Eq as NumberEq } from "fp-ts/number"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { Aura } from "./Aura"
import {
  $applySpacingChanges,
  $getBlockSpacing,
  $getSelectedSpacingBlocks,
  EMPTY_SPACING,
  SpacingProperty,
  toSpacingChanges,
  type BlockSpacing,
  type SpacingChange,
} from "../utils/blockSpacing"

type SpacingOption = Readonly<{ label: string; value: Option<number> }>
type SpacingSection = Readonly<{
  heading: string
  property: SpacingProperty
  options: readonly SpacingOption[]
}>

const TITLE = "Line & paragraph spacing"
const DEFAULT_LABEL = "Default"
const ONE_AND_A_HALF = 1.5
const NO_PARAGRAPH_SPACE = 0
const FOOTER_SPACING = 1.5

const LINE_SPACING_OPTIONS: readonly SpacingOption[] = [
  { label: DEFAULT_LABEL, value: Onone },
  { label: "Single", value: Osome(1) },
  { label: "1.15", value: Osome(1.15) },
  { label: "1.5", value: Osome(ONE_AND_A_HALF) },
  { label: "Double", value: Osome(2) },
]

const PARAGRAPH_SPACE_OPTIONS: readonly SpacingOption[] = [
  { label: DEFAULT_LABEL, value: Onone },
  { label: "None", value: Osome(NO_PARAGRAPH_SPACE) },
  ...pipe(
    [4, 8, 12, 16, 24],
    RAmap((px) => ({ label: `${px} px`, value: Osome(px) })),
  ),
]

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

const OPTION_EQ = OgetEq(NumberEq)

const REMOVE_PARAGRAPH_SPACE: readonly SpacingChange[] = [
  [SpacingProperty.SPACE_BEFORE, Osome(NO_PARAGRAPH_SPACE)],
  [SpacingProperty.SPACE_AFTER, Osome(NO_PARAGRAPH_SPACE)],
]

const RESET_SPACING: readonly SpacingChange[] = toSpacingChanges(EMPTY_SPACING)

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

type SpacingOptionItemProperties = Readonly<{
  label: string
  isSelected: boolean
  onSelect: () => void
}>

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
      {pipe(
        isSelected,
        Bmatch(
          () => undefined,
          () => <Check fontSize="small" />,
        ),
      )}
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
  </MenuItem>
)

const LineSpacingButton = (): ReactElement => {
  const [editor] = useLexicalComposerContext()
  const styles = useToolbarItemStyles()
  const [anchorElement, setAnchorElement] = useState<Option<HTMLElement>>(Onone)
  const [current, setCurrent] = useState<BlockSpacing>(EMPTY_SPACING)
  const isOpen = OisSome(anchorElement)

  const readCurrentSpacing = (): BlockSpacing =>
    editor.getEditorState().read(() =>
      pipe(
        $getSelectedSpacingBlocks($getSelection()),
        RAhead,
        Omap($getBlockSpacing),
        OgetOrElse(() => EMPTY_SPACING),
      ),
    )

  const onOpen = (event: MouseEvent<HTMLElement>): void => {
    setCurrent(readCurrentSpacing())
    setAnchorElement(Osome(event.currentTarget))
  }

  const onClose = (): void => setAnchorElement(Onone)

  const updateSelectedBlocks = (changes: readonly SpacingChange[]): void => {
    editor.update(() =>
      $getSelectedSpacingBlocks($getSelection()).forEach(
        $applySpacingChanges(changes),
      ),
    )
    onClose()
  }

  return (
    <>
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
      <Popover
        open={isOpen}
        anchorEl={OtoNullable(anchorElement)}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}>
        <Box sx={popoverStyles}>
          <Box sx={columnsStyles}>
            {pipe(
              SECTIONS,
              RAmap(({ heading, property, options }) => (
                <Box key={property} component="section" aria-label={heading}>
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
                          isSelected={OPTION_EQ.equals(
                            current[property],
                            value,
                          )}
                          onSelect={() =>
                            updateSelectedBlocks([[property, value]])
                          }
                        />
                      )),
                    )}
                  </MenuList>
                </Box>
              )),
            )}
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={FOOTER_SPACING}
            alignItems="center"
            sx={{ px: FOOTER_SPACING, pt: FOOTER_SPACING }}>
            <Aura>
              <Button
                size="small"
                color="inherit"
                onClick={() => updateSelectedBlocks(REMOVE_PARAGRAPH_SPACE)}>
                Remove space between paragraphs
              </Button>
            </Aura>
            <Button
              size="small"
              color="inherit"
              onClick={() => updateSelectedBlocks(RESET_SPACING)}>
              Reset
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", px: 2, pt: 1 }}>
            Tip: press Shift+Enter for a new line within the same paragraph.
          </Typography>
        </Box>
      </Popover>
    </>
  )
}

export { LineSpacingButton }
