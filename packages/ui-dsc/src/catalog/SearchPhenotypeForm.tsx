import { useState, useEffect, SyntheticEvent } from "react"
import { useSearchParams } from "react-router-dom"
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  AutocompleteChangeReason,
} from "@mui/material"
import { match } from "ts-pattern"
import { ENTITY_OPTIONS, QUALITY_OPTIONS } from "../const"

const SearchPhenotypeForm = () => {
  const [searchParameters, setSearchParameters] = useSearchParams()
  const [quality, setQuality] = useState(searchParameters.get("quality"))
  const [entity, setEntity] = useState(searchParameters.get("entity"))

  useEffect(() => {
    setQuality(searchParameters.get("quality"))
    setEntity(searchParameters.get("entity"))
  }, [searchParameters])

  const isWildType = quality === "wild type"

  const handleSearch = () => {
    const parameters = new URLSearchParams()
    if (quality) parameters.set("quality", quality)
    if (entity) parameters.set("entity", entity)
    setSearchParameters(parameters)
  }

  const handleQualityChange = (
    _: SyntheticEvent,
    value: string | null,
    reason: AutocompleteChangeReason,
  ) => {
    match(reason)
      .with("selectOption", () => {
        setQuality(value ?? "")
        if (value === "wild type") setEntity("")
      })
      .with("clear", () => {
        setQuality("")
      })
      .otherwise(() => {})
  }

  const handleEntityChange = (
    _: SyntheticEvent,
    value: string | null,
    reason: AutocompleteChangeReason,
  ) => {
    match(reason)
      .with("selectOption", () => setEntity(value ?? ""))
      .with("clear", () => setEntity(""))
      .otherwise(() => {})
  }

  return (
    <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
      <Grid item xs={12} sm={4}>
        <Autocomplete
          value={quality}
          options={QUALITY_OPTIONS}
          onChange={handleQualityChange}
          renderInput={(parameters) => (
            <TextField
              {...parameters}
              label="Quality"
              size="small"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          value={entity}
          options={ENTITY_OPTIONS}
          disabled={isWildType}
          onChange={handleEntityChange}
          renderInput={(parameters) => (
            <TextField
              {...parameters}
              label="Entity"
              size="small"
              variant="outlined"
              helperText={
                isWildType ? "No entity needed for wild type" : undefined
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          variant="contained"
          disabled={!quality || (!isWildType && !entity)}
          onClick={handleSearch}
          fullWidth>
          Search
        </Button>
      </Grid>
    </Grid>
  )
}

export { SearchPhenotypeForm }
