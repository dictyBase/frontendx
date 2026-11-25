import { useState, type MouseEvent } from "react"
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
import { head as Ahead } from "fp-ts/Array"
import { Eq as NumberEq } from "fp-ts/number"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { Aura } from "./Aura"
import {
  $getBlockSpacing,
  $getSelectedSpacingBlocks,
  $setBlockSpacing,
  SpacingProperty,
  type BlockSpacing,
} from "../utils/blockSpacing"

type SpacingOption = { label: string; value: Option<number> }

const title = "Line & paragraph spacing"
const DEFAULT_LABEL = "Default"

const LINE_SPACING_OPTIONS: SpacingOption[] = [
  { label: DEFAULT_LABEL, value: Onone },
  { label: "Single", value: Osome(1) },
  { label: "1.15", value: Osome(1.15) },
  { label: "1.5", value: Osome(1.5) },
  { label: "Double", value: Osome(2) },
]

const PARAGRAPH_SPACE_OPTIONS: SpacingOption[] = [
  { label: DEFAULT_LABEL, value: Onone },
  { label: "None", value: Osome(0) },
  ...[4, 8, 12, 16, 24].map((px) => ({
    label: `${px} px`,
    value: Osome(px),
  })),
]

const SECTIONS = [
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

const optionEq = OgetEq(NumberEq)

const emptySpacing: BlockSpacing = {
  [SpacingProperty.LINE_HEIGHT]: Onone,
  [SpacingProperty.SPACE_BEFORE]: Onone,
  [SpacingProperty.SPACE_AFTER]: Onone,
}

const spacingProperties = Object.values(SpacingProperty)

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

const LineSpacingButton = () => {
  const [editor] = useLexicalComposerContext()
  const styles = useToolbarItemStyles()
  const [anchorElement, setAnchorElement] = useState<Option<HTMLElement>>(Onone)
  const [current, setCurrent] = useState<BlockSpacing>(emptySpacing)
  const isOpen = OisSome(anchorElement)

  const readCurrentSpacing = () =>
    editor.getEditorState().read(() =>
      pipe(
        $getSelectedSpacingBlocks($getSelection()),
        Ahead,
        Omap($getBlockSpacing),
        OgetOrElse(() => emptySpacing),
      ),
    )

  const onOpen = (event: MouseEvent<HTMLElement>) => {
    setCurrent(readCurrentSpacing())
    setAnchorElement(Osome(event.currentTarget))
  }

  const onClose = () => setAnchorElement(Onone)

  const updateSelectedBlocks = (
    changes: Array<[SpacingProperty, Option<number>]>,
  ) => {
    editor.update(() => {
      $getSelectedSpacingBlocks($getSelection()).forEach((block) =>
        changes.forEach(([property, value]) =>
          $setBlockSpacing(block, property, value),
        ),
      )
    })
    onClose()
  }

  return (
    <>
      <IconButton
        sx={styles.root}
        title={title}
        aria-label={title}
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
            {SECTIONS.map(({ heading, property, options }) => (
              <Box key={property} component="section" aria-label={heading}>
                <Typography variant="overline" sx={headingStyles}>
                  {heading}
                </Typography>
                <MenuList dense aria-label={heading} autoFocusItem={false}>
                  {options.map(({ label, value }) => {
                    const isSelected = optionEq.equals(current[property], value)
                    return (
                      <MenuItem
                        key={label}
                        selected={isSelected}
                        aria-checked={isSelected}
                        role="menuitemradio"
                        onClick={() =>
                          updateSelectedBlocks([[property, value]])
                        }>
                        <ListItemIcon>
                          {pipe(
                            isSelected,
                            Bmatch(
                              () => <></>,
                              () => <Check fontSize="small" />,
                            ),
                          )}
                        </ListItemIcon>
                        <ListItemText>{label}</ListItemText>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Box>
            ))}
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ px: 1.5, pt: 1.5 }}>
            <Aura>
              <Button
                size="small"
                color="inherit"
                onClick={() =>
                  updateSelectedBlocks([
                    [SpacingProperty.SPACE_BEFORE, Osome(0)],
                    [SpacingProperty.SPACE_AFTER, Osome(0)],
                  ])
                }>
                Remove space between paragraphs
              </Button>
            </Aura>
            <Button
              size="small"
              color="inherit"
              onClick={() =>
                updateSelectedBlocks(
                  spacingProperties.map((property) => [property, Onone]),
                )
              }>
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
