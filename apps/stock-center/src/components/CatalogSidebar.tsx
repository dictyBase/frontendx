import { ChangeEventHandler } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  ReadonlyNonEmptyArray,
  map as RNEAmap,
} from "fp-ts/ReadonlyNonEmptyArray"
import {
  Option,
  fromNullable as OfromNullable,
  fromPredicate as OfromPredicate,
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
  Paper,
  Typography,
} from "@mui/material"

const SELECTED_BG = "#ebf8ff"
const SELECTED_BORDER = "#3182ce"
const UNSELECTED_BG = "#f7fafc"
const UNSELECTED_HOVER_BG = "#edf2f7"

type SidebarOption = {
  value: string
  label: string
  groups?: ReadonlyNonEmptyArray<{ value: string; label: string }>
}

type CatalogSidebarProperties = {
  title: string
  options: ReadonlyNonEmptyArray<SidebarOption>
  selectedEntity: string
  selectedGroup: Option<string>
  onChangeEntity: ChangeEventHandler<HTMLInputElement>
  onChangeGroup: ChangeEventHandler<HTMLInputElement>
}

const CatalogSidebar = ({
  title,
  options,
  selectedEntity,
  selectedGroup,
  onChangeEntity,
  onChangeGroup,
}: CatalogSidebarProperties) => (
  <Paper
    sx={{
      width: "240px",
      flexShrink: 0,
      position: "sticky",
      top: "24px",
      p: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    }}>
    <Typography
      variant="h2"
      sx={{
        fontSize: "14px",
        fontWeight: 800,
        color: "#1a202c",
        mb: 2,
        textTransform: "uppercase",
        letterSpacing: "0.75px",
      }}>
      {title}
    </Typography>
    <RadioGroup value={selectedEntity} onChange={onChangeEntity}>
      {options.map((entityOption) => (
        <Box
          key={entityOption.value}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "2px solid transparent",
            background: pipe(
              selectedEntity === entityOption.value,
              Bmatch(
                () => UNSELECTED_BG,
                () => SELECTED_BG,
              ),
            ),
            borderColor: pipe(
              selectedEntity === entityOption.value,
              Bmatch(
                () => "transparent",
                () => SELECTED_BORDER,
              ),
            ),
            transition: "all 0.2s",
            mb: "8px",
            cursor: "pointer",
            "&:hover": {
              background: pipe(
                selectedEntity === entityOption.value,
                Bmatch(
                  () => UNSELECTED_HOVER_BG,
                  () => SELECTED_BG,
                ),
              ),
            },
          }}>
          <Box sx={{ width: "100%" }}>
            <FormControlLabel
              value={entityOption.value}
              control={
                <Radio
                  sx={{
                    width: "18px",
                    height: "18px",
                    p: 0,
                  }}
                />
              }
              label={entityOption.label}
              sx={{
                margin: 0,
                width: "100%",
                gap: "8px",
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                  color: "#2d3748",
                  fontWeight: 500,
                  cursor: "pointer",
                  flex: 1,
                },
              }}
            />
            {pipe(
              entityOption,
              // Show `groups` radio filters for the selected entity.
              OfromPredicate(({ value }) => value === selectedEntity),
              // Extract `groups` from entity.
              OflatMap(({ groups }) => pipe(groups, OfromNullable)),
              // Map `groups` to Radio components.
              Omap(
                RNEAmap(({ label, value }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Radio sx={{ width: "14px", height: "14px", py: 4 }} />
                    }
                    label={label}
                    sx={{
                      margin: 0,
                      mb: "4px",
                      gap: "6px",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "13px",
                        color: "#4a5568",
                        fontWeight: 400,
                      },
                    }}
                  />
                )),
              ),
              // Wrap `Radio` components in `RadioGroup`.
              Omatch(
                () => <></>,
                (radioComponents) => (
                  <RadioGroup
                    value={OtoUndefined(selectedGroup)}
                    onChange={onChangeGroup}
                    sx={{ mt: "10px", pl: "13px" }}>
                    {radioComponents}
                  </RadioGroup>
                ),
              ),
            )}
          </Box>
        </Box>
      ))}
    </RadioGroup>
  </Paper>
)

export { CatalogSidebar }
export type { CatalogSidebarProperties, SidebarOption }
