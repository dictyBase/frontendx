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
import { pipe } from "fp-ts/function"
import { fromNullable, getOrElse } from "fp-ts/Option"

const STRAIN_TYPE_OPTIONS = [
  { value: "regular", label: "Regular Strains" },
  { value: "bacterial", label: "Bacterial Strains" },
  { value: "gwdi", label: "GWDI Strains" },
  { value: "all", label: "All Strains" },
] as const

const CatalogSidebar = () => {
  const [searchParameters, setSearchParameters] = useSearchParams()

  // Use Option to safely handle the query parameter
  const selectedType = pipe(
    searchParameters.get("group"),
    fromNullable,
    getOrElse(() => "regular"),
  )

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSearchParameters((previousParameters) => {
      const newParameters = new URLSearchParams([
        ...previousParameters.entries(),
      ])
      newParameters.set("group", event.target.value)
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
        Strain Type
      </Typography>
      <RadioGroup value={selectedType} onChange={handleTypeChange}>
        {STRAIN_TYPE_OPTIONS.map((option) => (
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
          </Box>
        ))}
      </RadioGroup>
    </Paper>
  )
}

export { CatalogSidebar }
