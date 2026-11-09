import { memo, type ChangeEventHandler } from "react"
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
const SPAN_COMPONENT = "span"
const ALIGN_CENTER = "center"
const GAP_SMALL = "8px"
const FONT_WEIGHT_MEDIUM = 500
const FONT_WEIGHT_SEMIBOLD = 600
const LINE_HEIGHT_DEFAULT = 1.4

const PRIMARY_BLUE = "#3182ce"
const ENTITY_SELECTED_BG = "#ebf8ff"
const ENTITY_SELECTED_TEXT = "#1a56db"
const ENTITY_SELECTED_BADGE_BG = "#bee3f8"
const ENTITY_SELECTED_BADGE_TEXT = "#2b6cb0"

const GROUP_SELECTED_TEXT = "#ffffff"
const GROUP_SELECTED_BADGE_BG = "rgba(255, 255, 255, 0.25)"

const UNSELECTED_BG = "#ffffff"
const UNSELECTED_HOVER_BG = "#f7fafc"
const UNSELECTED_BORDER = "#cbd5e0"
const UNSELECTED_TEXT = "#2d3748"
const UNSELECTED_GROUP_TEXT = "#4a5568"
const UNSELECTED_BADGE_BG = "#edf2f7"
const UNSELECTED_BADGE_TEXT = "#4a5568"

const ENTITY_PADDING = "6px 14px"
const GROUP_PADDING = "5px 12px"
const ENTITY_FONT_SIZE = "14px"
const GROUP_FONT_SIZE = "13px"
const BADGE_FONT_SIZE = "12px"
const LOADING_COUNT_DISPLAY = "..."

const HIDDEN_ICON = <Box component={SPAN_COMPONENT} sx={{ display: "none" }} />

const HIDDEN_RADIO_SX = {
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  p: 0,
} as const

type FilterPillStyle = {
  padding: string
  labelFontSize: string
  labelColor: string
  labelFontWeight: number
  badgeBg: string
  badgeColor: string
  backgroundColor: string
  borderColor: string
  hoverBackgroundColor: string
}

const ENTITY_UNSELECTED_STYLE: FilterPillStyle = {
  padding: ENTITY_PADDING,
  labelFontSize: ENTITY_FONT_SIZE,
  labelColor: UNSELECTED_TEXT,
  labelFontWeight: FONT_WEIGHT_MEDIUM,
  badgeBg: UNSELECTED_BADGE_BG,
  badgeColor: UNSELECTED_BADGE_TEXT,
  backgroundColor: UNSELECTED_BG,
  borderColor: UNSELECTED_BORDER,
  hoverBackgroundColor: UNSELECTED_HOVER_BG,
}

const ENTITY_SELECTED_STYLE: FilterPillStyle = {
  padding: ENTITY_PADDING,
  labelFontSize: ENTITY_FONT_SIZE,
  labelColor: ENTITY_SELECTED_TEXT,
  labelFontWeight: FONT_WEIGHT_SEMIBOLD,
  badgeBg: ENTITY_SELECTED_BADGE_BG,
  badgeColor: ENTITY_SELECTED_BADGE_TEXT,
  backgroundColor: ENTITY_SELECTED_BG,
  borderColor: PRIMARY_BLUE,
  hoverBackgroundColor: ENTITY_SELECTED_BG,
}

const GROUP_UNSELECTED_STYLE: FilterPillStyle = {
  padding: GROUP_PADDING,
  labelFontSize: GROUP_FONT_SIZE,
  labelColor: UNSELECTED_GROUP_TEXT,
  labelFontWeight: FONT_WEIGHT_MEDIUM,
  badgeBg: UNSELECTED_BADGE_BG,
  badgeColor: UNSELECTED_BADGE_TEXT,
  backgroundColor: UNSELECTED_BG,
  borderColor: UNSELECTED_BORDER,
  hoverBackgroundColor: UNSELECTED_HOVER_BG,
}

const GROUP_SELECTED_STYLE: FilterPillStyle = {
  padding: GROUP_PADDING,
  labelFontSize: GROUP_FONT_SIZE,
  labelColor: GROUP_SELECTED_TEXT,
  labelFontWeight: FONT_WEIGHT_SEMIBOLD,
  badgeBg: GROUP_SELECTED_BADGE_BG,
  badgeColor: GROUP_SELECTED_TEXT,
  backgroundColor: PRIMARY_BLUE,
  borderColor: PRIMARY_BLUE,
  hoverBackgroundColor: PRIMARY_BLUE,
}

type FilterGroupOption = {
  value: string
  label: string
  count?: Option<number>
}

type FilterOption = {
  value: string
  label: string
  count?: Option<number>
  groups?: ReadonlyNonEmptyArray<FilterGroupOption>
}

type FilterPillLabelProperties = {
  label: string
  count?: Option<number>
  labelColor: string
  labelFontSize: string
  labelFontWeight: number
  badgeBg: string
  badgeColor: string
}

const formatCount = (count: Option<number>): string =>
  pipe(
    count,
    Omatch(
      () => LOADING_COUNT_DISPLAY,
      (value) => value.toLocaleString(),
    ),
  )

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
    component={SPAN_COMPONENT}
    sx={{
      display: INLINE_FLEX,
      alignItems: ALIGN_CENTER,
      gap: GAP_SMALL,
    }}>
    <Typography
      component={SPAN_COMPONENT}
      sx={{
        fontSize: labelFontSize,
        color: labelColor,
        fontWeight: labelFontWeight,
        lineHeight: LINE_HEIGHT_DEFAULT,
      }}>
      {label}
    </Typography>
    {pipe(
      count,
      OfromNullable,
      Omatch(
        () => <></>,
        (countOption) => (
          <Box
            component={SPAN_COMPONENT}
            aria-hidden="true"
            sx={{
              display: INLINE_FLEX,
              alignItems: ALIGN_CENTER,
              justifyContent: ALIGN_CENTER,
              minWidth: "22px",
              px: GAP_SMALL,
              py: "1px",
              borderRadius: PILL_BORDER_RADIUS,
              fontSize: BADGE_FONT_SIZE,
              fontWeight: FONT_WEIGHT_SEMIBOLD,
              lineHeight: LINE_HEIGHT_DEFAULT,
              backgroundColor: badgeBg,
              color: badgeColor,
            }}>
            {formatCount(countOption)}
          </Box>
        ),
      ),
    )}
  </Box>
)

type FilterPillProperties = {
  value: string
  label: string
  count?: Option<number>
  pillStyle: FilterPillStyle
}

const FilterPill = ({
  value,
  label,
  count,
  pillStyle,
}: FilterPillProperties) => (
  <FormControlLabel
    value={value}
    control={
      <Radio
        icon={HIDDEN_ICON}
        checkedIcon={HIDDEN_ICON}
        sx={HIDDEN_RADIO_SX}
      />
    }
    label={
      <FilterPillLabel
        label={label}
        count={count}
        labelColor={pillStyle.labelColor}
        labelFontSize={pillStyle.labelFontSize}
        labelFontWeight={pillStyle.labelFontWeight}
        badgeBg={pillStyle.badgeBg}
        badgeColor={pillStyle.badgeColor}
      />
    }
    sx={{
      margin: 0,
      padding: pillStyle.padding,
      borderRadius: PILL_BORDER_RADIUS,
      border: "1.5px solid",
      backgroundColor: pillStyle.backgroundColor,
      borderColor: pillStyle.borderColor,
      transition: "all 0.2s",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: pillStyle.hoverBackgroundColor,
      },
    }}
  />
)

type CatalogFilterSelectorProperties = {
  options: ReadonlyNonEmptyArray<FilterOption>
  selectedEntity: string
  selectedGroup: Option<string>
  onChangeEntity: ChangeEventHandler<HTMLInputElement>
  onChangeGroup: ChangeEventHandler<HTMLInputElement>
}

const CatalogFilterSelector = memo(
  ({
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
          RNEAmap(({ value, label, count }) => (
            <FilterPill
              key={value}
              value={value}
              label={label}
              count={count}
              pillStyle={pipe(
                selectedEntity === value,
                Bmatch(
                  () => ENTITY_UNSELECTED_STYLE,
                  () => ENTITY_SELECTED_STYLE,
                ),
              )}
            />
          )),
        )}
      </RadioGroup>
      {pipe(
        options,
        RAfindFirst(({ value }) => value === selectedEntity),
        OflatMap(({ groups }) => pipe(groups, OfromNullable)),
        Omap(
          RNEAmap(({ value, label, count }) => (
            <FilterPill
              key={value}
              value={value}
              label={label}
              count={count}
              pillStyle={pipe(
                selectedGroup,
                Oexists((groupValue) => groupValue === value),
                Bmatch(
                  () => GROUP_UNSELECTED_STYLE,
                  () => GROUP_SELECTED_STYLE,
                ),
              )}
            />
          )),
        ),
        Omatch(
          () => <></>,
          (groupComponents) => (
            <RadioGroup
              row
              value={OtoUndefined(selectedGroup)}
              onChange={onChangeGroup}
              sx={{ gap: GAP_SMALL, mt: "10px", flexWrap: "wrap" }}>
              {groupComponents}
            </RadioGroup>
          ),
        ),
      )}
    </Box>
  ),
)

export { CatalogFilterSelector }
export type { CatalogFilterSelectorProperties, FilterOption, FilterGroupOption }
