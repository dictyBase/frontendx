import { useEffect, useCallback, ChangeEventHandler } from "react"
import { pipe, flow } from "fp-ts/function"
import {
  ReadonlyNonEmptyArray,
  head as RNEAhead,
} from "fp-ts/ReadonlyNonEmptyArray"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  some,
  none,
} from "fp-ts/Option"
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import { useSearchParams, NavigateOptions } from "react-router-dom"

type SidebarOption = {
  value: string
  label: string
  groups?: Array<{ value: string; label: string }>
}

type CatalogSidebarProperties = {
  title: string
  options: ReadonlyNonEmptyArray<SidebarOption>
  onChangeEntity: ChangeEventHandler<HTMLInputElement>
  onChangeGroup: ChangeEventHandler<HTMLInputElement>
}
const getFirstEntity = flow(RNEAhead<SidebarOption>, ({ value }) => value)

const CatalogSidebar = ({
  title,
  options,
  onChangeEntity,
  onChangeGroup,
}: CatalogSidebarProperties) => {
  const [searchParameters, setSearchParameters] = useSearchParams()
  const initialEntity = pipe(
    searchParameters.get("entity"),
    OfromNullable,
    OgetOrElse(() => pipe(options, getFirstEntity)),
  )

  return (
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
      <RadioGroup value={initialEntity} onChange={onChangeEntity}>
        {options.map((option) => (
          <Box
            key={option.value}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "2px solid transparent",
              background:
                initialEntity === option.value ? "#ebf8ff" : "#f7fafc",
              borderColor:
                initialEntity === option.value ? "#3182ce" : "transparent",
              transition: "all 0.2s",
              mb: "8px",
              cursor: "pointer",
              "&:hover": {
                background:
                  initialEntity === option.value ? "#ebf8ff" : "#edf2f7",
              },
            }}>
            <Box sx={{ width: "100%" }}>
              <FormControlLabel
                value={option.value}
                control={
                  <Radio
                    sx={{
                      width: "18px",
                      height: "18px",
                      p: 0,
                    }}
                  />
                }
                label={option.label}
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
              {initialEntity === option.value && option.groups && (
                <RadioGroup
                  value={searchParameters.get("group") ?? ""}
                  onChange={() => {}}
                  sx={{ mt: "10px", pl: "13px" }}>
                  {option.groups.map((groupOption) => (
                    <FormControlLabel
                      key={groupOption.value}
                      value={groupOption.value}
                      control={
                        <Radio sx={{ width: "14px", height: "14px", py: 4 }} />
                      }
                      label={groupOption.label}
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
                  ))}
                </RadioGroup>
              )}
            </Box>
          </Box>
        ))}
      </RadioGroup>
    </Paper>
  )
}

export { CatalogSidebar }
export type { CatalogSidebarProperties, SidebarOption }
