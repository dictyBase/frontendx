import { useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  type AutocompleteChangeReason,
} from "@mui/material"
import { match } from "ts-pattern"
import { trim as Strim } from "fp-ts/string"
import { pipe } from "fp-ts/function"
import {
  map as Omap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { PHENOTYPE_OPTIONS } from "../const"
import { encodePhenotypeParameter } from "../utils/encodePhenotypeParameter"
import { cleanQuery } from "../utils/cleanQuery"

/**
 * SearchPhenotypeForm provides an autocomplete search input for phenotype
 * search. The input is filtered against the Dicty Phenotype Ontology terms.
 * On submit it navigates to the phenotype route parameter URL.
 */
const SearchPhenotypeForm = () => {
  const { name } = useParams()
  const [value, setValue] = useState(
    pipe(
      name,
      OfromNullable,
      Omap(cleanQuery),
      OgetOrElse(() => ""),
    ),
  )
  const navigate = useNavigate()

  const trimmed = Strim(value)

  const handleSearch = (overrideValue?: string) => {
    const searchValue = Strim(overrideValue ?? value)
    if (!searchValue) return
    const encoded = encodePhenotypeParameter(searchValue)
    navigate(`/phenotypes/${encoded}`)
  }

  const handleChange = (
    _: SyntheticEvent,
    newValue: string | null,
    reason: AutocompleteChangeReason,
  ) => {
    match(reason)
      .with("selectOption", () => {
        const selected = newValue ?? ""
        setValue(selected)
        handleSearch(selected)
      })
      .with("clear", () => {
        setValue("")
      })
      .otherwise(() => {})
  }

  return (
    <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
      <Grid item xs={12} sm={8}>
        <Autocomplete
          freeSolo
          value={value}
          options={PHENOTYPE_OPTIONS}
          onChange={handleChange}
          onInputChange={(_, newInputValue) => setValue(newInputValue)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return
            // If the dropdown listbox is open, an option is being selected —
            // let onChange handle it instead to avoid racing on stale state.
            if (document.querySelector('[role="listbox"]')) return
            handleSearch()
          }}
          renderInput={(parameters) => (
            <TextField
              {...parameters}
              label="Phenotype"
              size="small"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          variant="contained"
          disabled={!trimmed}
          onClick={() => handleSearch()}
          fullWidth>
          Search
        </Button>
      </Grid>
    </Grid>
  )
}

export { SearchPhenotypeForm }
