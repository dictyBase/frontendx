import type { ChangeEventHandler } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { findFirst as RAfindFirst } from "fp-ts/ReadonlyArray"
import {
  type ReadonlyNonEmptyArray,
  map as RNEAmap,
} from "fp-ts/ReadonlyNonEmptyArray"
import {
  type Option,
  fromNullable as OfromNullable,
  exists as Oexists,
  map as Omap,
  flatMap as OflatMap,
  match as Omatch,
  toUndefined as OtoUndefined,
} from "fp-ts/Option"
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material"

const PILL_BORDER_RADIUS = "9999px"
const INLINE_FLEX = "inline-flex"

const ENTITY_SELECTED_BG = "#ebf8ff"
const ENTITY_SELECTED_BORDER = "#3182ce"
const ENTITY_SELECTED_TEXT = "#1a56db"
const ENTITY_SELECTED_BADGE_BG = "#bee3f8"
const ENTITY_SELECTED_BADGE_TEXT = "#2b6cb0"

const GROUP_SELECTED_BG = "#3182ce"
const GROUP_SELECTED_BORDER = "#3182ce"
const GROUP_SELECTED_TEXT = "#ffffff"
const GROUP_SELECTED_BADGE_BG = "rgba(255, 255, 255, 0.25)"

const UNSELECTED_BG = "#ffffff"
const UNSELECTED_HOVER_BG = "#f7fafc"
const UNSELECTED_BORDER = "#cbd5e0"
const UNSELECTED_TEXT = "#2d3748"
const UNSELECTED_GROUP_TEXT = "#4a5568"
const UNSELECTED_BADGE_BG = "#edf2f7"
const UNSELECTED_BADGE_TEXT = "#4a5568"

const ENTITY_FONT_SIZE = "14px"
const GROUP_FONT_SIZE = "13px"
const BADGE_FONT_SIZE = "12px"

const hiddenIcon = <Box component="span" sx={{ display: "none" }} />

const hiddenRadioSx = {
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  p: 0,
} as const

type FilterGroupOption = {
  value: string
  label: string
  count: number
}

type FilterOption = {
  value: string
  label: string
  count: number
  groups?: ReadonlyNonEmptyArray<FilterGroupOption>
}

type FilterPillLabelProperties = {
  label: string
  count: number
  labelColor: string
  labelFontSize: string
  labelFontWeight: number
  badgeBg: string
  badgeColor: string
}

const FilterPillLabel = ({
  label,
  count,
  labelColor,
  labelFontSize,
  labelFontWeight,
  badgeBg,
  badgeColor,
}: FilterPillLabelProperties) => (
  <Box
    component="span"
    sx={{
      display: INLINE_FLEX,
      alignItems: "center",
      gap: "8px",
    }}>
    <Typography
      component="span"
      sx={{
        fontSize: labelFontSize,
        color: labelColor,
        fontWeight: labelFontWeight,
        lineHeight: 1.4,
      }}>
      {label}
    </Typography>
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        display: INLINE_FLEX,
        alignItems: "center",
        justifyContent: "center",
        minWidth: "22px",
        px: "8px",
        py: "1px",
        borderRadius: PILL_BORDER_RADIUS,
        fontSize: BADGE_FONT_SIZE,
        fontWeight: 600,
        lineHeight: 1.4,
        backgroundColor: badgeBg,
        color: badgeColor,
      }}>
      {count.toLocaleString()}
    </Box>
  </Box>
)

type CatalogFilterSelectorProperties = {
  options: ReadonlyNonEmptyArray<FilterOption>
  selectedEntity: string
  selectedGroup: Option<string>
  onChangeEntity: ChangeEventHandler<HTMLInputElement>
  onChangeGroup: ChangeEventHandler<HTMLInputElement>
}

const CatalogFilterSelector = ({
  options,
  selectedEntity,
  selectedGroup,
  onChangeEntity,
  onChangeGroup,
}: CatalogFilterSelectorProperties) => (
  <Box sx={{ mb: "16px" }}>
    <RadioGroup
      row
      value={selectedEntity}
      onChange={onChangeEntity}
      sx={{ gap: "10px", flexWrap: "wrap" }}>
      {pipe(
        options,
        RNEAmap((entityOption) => {
          const isSelected = selectedEntity === entityOption.value
          return (
            <FormControlLabel
              key={entityOption.value}
              value={entityOption.value}
              control={
                <Radio
                  icon={hiddenIcon}
                  checkedIcon={hiddenIcon}
                  sx={hiddenRadioSx}
                />
              }
              label={
                <FilterPillLabel
                  label={entityOption.label}
                  count={entityOption.count}
                  labelColor={pipe(
                    isSelected,
                    Bmatch(
                      () => UNSELECTED_TEXT,
                      () => ENTITY_SELECTED_TEXT,
                    ),
                  )}
                  labelFontSize={ENTITY_FONT_SIZE}
                  labelFontWeight={pipe(
                    isSelected,
                    Bmatch(
                      () => 500,
                      () => 600,
                    ),
                  )}
                  badgeBg={pipe(
                    isSelected,
                    Bmatch(
                      () => UNSELECTED_BADGE_BG,
                      () => ENTITY_SELECTED_BADGE_BG,
                    ),
                  )}
                  badgeColor={pipe(
                    isSelected,
                    Bmatch(
                      () => UNSELECTED_BADGE_TEXT,
                      () => ENTITY_SELECTED_BADGE_TEXT,
                    ),
                  )}
                />
              }
              sx={{
                margin: 0,
                padding: "6px 14px",
                borderRadius: PILL_BORDER_RADIUS,
                border: "1.5px solid",
                backgroundColor: pipe(
                  isSelected,
                  Bmatch(
                    () => UNSELECTED_BG,
                    () => ENTITY_SELECTED_BG,
                  ),
                ),
                borderColor: pipe(
                  isSelected,
                  Bmatch(
                    () => UNSELECTED_BORDER,
                    () => ENTITY_SELECTED_BORDER,
                  ),
                ),
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: pipe(
                    isSelected,
                    Bmatch(
                      () => UNSELECTED_HOVER_BG,
                      () => ENTITY_SELECTED_BG,
                    ),
                  ),
                },
              }}
            />
          )
        }),
      )}
    </RadioGroup>
    {pipe(
      options,
      RAfindFirst(({ value }) => value === selectedEntity),
      OflatMap(({ groups }) => pipe(groups, OfromNullable)),
      Omap(
        RNEAmap(({ label, value, count }) => {
          const isGroupSelected = pipe(
            selectedGroup,
            Oexists((groupValue) => groupValue === value),
          )
          return (
            <FormControlLabel
              key={value}
              value={value}
              control={
                <Radio
                  icon={hiddenIcon}
                  checkedIcon={hiddenIcon}
                  sx={hiddenRadioSx}
                />
              }
              label={
                <FilterPillLabel
                  label={label}
                  count={count}
                  labelColor={pipe(
                    isGroupSelected,
                    Bmatch(
                      () => UNSELECTED_GROUP_TEXT,
                      () => GROUP_SELECTED_TEXT,
                    ),
                  )}
                  labelFontSize={GROUP_FONT_SIZE}
                  labelFontWeight={pipe(
                    isGroupSelected,
                    Bmatch(
                      () => 500,
                      () => 600,
                    ),
                  )}
                  badgeBg={pipe(
                    isGroupSelected,
                    Bmatch(
                      () => UNSELECTED_BADGE_BG,
                      () => GROUP_SELECTED_BADGE_BG,
                    ),
                  )}
                  badgeColor={pipe(
                    isGroupSelected,
                    Bmatch(
                      () => UNSELECTED_BADGE_TEXT,
                      () => GROUP_SELECTED_TEXT,
                    ),
                  )}
                />
              }
              sx={{
                margin: 0,
                padding: "5px 12px",
                borderRadius: PILL_BORDER_RADIUS,
                border: "1.5px solid",
                backgroundColor: pipe(
                  isGroupSelected,
                  Bmatch(
                    () => UNSELECTED_BG,
                    () => GROUP_SELECTED_BG,
                  ),
                ),
                borderColor: pipe(
                  isGroupSelected,
                  Bmatch(
                    () => UNSELECTED_BORDER,
                    () => GROUP_SELECTED_BORDER,
                  ),
                ),
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: pipe(
                    isGroupSelected,
                    Bmatch(
                      () => UNSELECTED_HOVER_BG,
                      () => GROUP_SELECTED_BG,
                    ),
                  ),
                },
              }}
            />
          )
        }),
      ),
      Omatch(
        () => <></>,
        (groupComponents) => (
          <RadioGroup
            row
            value={OtoUndefined(selectedGroup)}
            onChange={onChangeGroup}
            sx={{ gap: "8px", mt: "10px", flexWrap: "wrap" }}>
            {groupComponents}
          </RadioGroup>
        ),
      ),
    )}
  </Box>
)

export { CatalogFilterSelector }
export type { CatalogFilterSelectorProperties, FilterOption, FilterGroupOption }
