import { Box, Radio, RadioGroup, FormControlLabel, Paper } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { fromNullable, getOrElse } from "fp-ts/Option"
import { StrainType } from "../types"

const STRAIN_TYPE_OPTIONS = [
  { value: StrainType.Regular, label: "Regular Strains" },
  { value: StrainType.Bacterial, label: "Bacterial Strains" },
  { value: StrainType.Gwdi, label: "GWDI Strains" },
  { value: StrainType.All, label: "All Strains" },
] as const

const CatalogSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Use Option to safely handle the query parameter
  const selectedType = pipe(
    searchParams.get("type"),
    fromNullable,
    getOrElse(() => StrainType.Regular),
  )

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newType = event.target.value
    setSearchParams((previous) =>
      pipe(
        new URLSearchParams(previous),
        (params) => {
          params.set("type", newType)
          return params
        },
      ),
    )
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
      }}
    >
      <Box
        component="h2"
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#1a202c",
          mb: "16px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          margin: 0,
          marginBottom: "16px",
        }}
      >
        Strain Type
      </Box>
      <RadioGroup value={selectedType} onChange={handleTypeChange}>
        {STRAIN_TYPE_OPTIONS.map((option) => (
          <Box
            key={option.value}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "2px solid transparent",
              background:
                selectedType === option.value ? "#ebf8ff" : "#f7fafc",
              borderColor:
                selectedType === option.value ? "#3182ce" : "transparent",
              transition: "all 0.2s",
              mb: "8px",
              cursor: "pointer",
              "&:hover": {
                background: selectedType === option.value ? "#ebf8ff" : "#edf2f7",
              },
            }}
          >
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
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                  color: "#2d3748",
                  fontWeight: 500,
                  cursor: "pointer",
                  flex: 1,
                },
              }}
            />
          </Box>
        ))}
      </RadioGroup>
    </Paper>
  )
}

export { CatalogSidebar }
