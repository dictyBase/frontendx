import { useEffect } from "react"
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import { useSearchParams } from "react-router-dom"

type SidebarOption = {
  value: string
  label: string
  groups?: Array<{ value: string; label: string }>
}

type CatalogSidebarProperties = {
  title: string
  value: string
  param: string
  options: Array<SidebarOption>
}

const CatalogSidebar = ({
  title,
  value,
  param,
  options,
}: CatalogSidebarProperties) => {
  const [searchParameters, setSearchParameters] = useSearchParams()
  const selectedType = searchParameters.get(param) ?? value

  useEffect(() => {
    setSearchParameters(
      (previousParameters) => {
        const newParameters = new URLSearchParams([
          ...previousParameters.entries(),
        ])
        newParameters.set(param, selectedType)
        return [...newParameters.entries()]
      },
      { replace: true },
    )
  }, [searchParameters, setSearchParameters, param, selectedType, value])

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSearchParameters((previousParameters) => {
      const newParameters = new URLSearchParams([
        ...previousParameters.entries(),
      ])
      newParameters.set(param, event.target.value)
      return [...newParameters.entries()]
    })
  }

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
      <RadioGroup value={selectedType} onChange={handleTypeChange}>
        {options.map((option) => (
          <Box
            key={option.value}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "2px solid transparent",
              background: selectedType === option.value ? "#ebf8ff" : "#f7fafc",
              borderColor:
                selectedType === option.value ? "#3182ce" : "transparent",
              transition: "all 0.2s",
              mb: "8px",
              cursor: "pointer",
              "&:hover": {
                background:
                  selectedType === option.value ? "#ebf8ff" : "#edf2f7",
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
              {selectedType === option.value && option.groups && (
                <RadioGroup
                  value={searchParameters.get("group") ?? ""}
                  onChange={(event) => {
                    setSearchParameters((previousParameters) => {
                      const newParameters = new URLSearchParams([
                        ...previousParameters.entries(),
                      ])
                      newParameters.set("group", event.target.value)
                      return [...newParameters.entries()]
                    })
                  }}
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
