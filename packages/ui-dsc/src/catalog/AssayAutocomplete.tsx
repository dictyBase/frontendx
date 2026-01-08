/* eslint-disable dot-notation */
import { ChangeEvent, SyntheticEvent } from "react"
import { useController } from "react-hook-form"
import {
  Autocomplete,
  TextField,
  CircularProgress,
  AutocompleteChangeReason,
} from "@mui/material"
import { match, P } from "ts-pattern"
import { useListPhenotypeAssaysLazyQuery } from "dicty-graphql-schema"

const AssayAutocomplete = () => {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({ name: "assay" })
  const [getAssays, { data, loading }] = useListPhenotypeAssaysLazyQuery()

  const handleAutocompleteChange = (
    _: SyntheticEvent,
    changeValue: string,
    reason: AutocompleteChangeReason,
  ) => {
    match(reason)
      .with("selectOption", () => {
        onChange(changeValue)
      })
      .with("clear", () => {
        onChange("")
      })
      .otherwise(() => {})
  }
  const handleTextFieldChange = ({
    target: { value: textFieldValue },
  }: ChangeEvent<HTMLInputElement>) => {
    getAssays({
      variables: {
        search: textFieldValue,
      },
    })
  }

  const options = match(data)
    .with(
      {
        listPhenotypeAssays: P.select(P.array(P.string)),
      },
      (assays) => assays,
    )
    .otherwise(() => [])

  const endAdornment = match(loading)
    .with(true, () => <CircularProgress size="1rem" />)
    .with(false, () => <></>)
    .exhaustive()

  return (
    <Autocomplete
      value={value}
      options={options}
      onBlur={onBlur}
      onChange={handleAutocompleteChange}
      getOptionLabel={(option) => option}
      renderInput={(parameters) => (
        <TextField
          {...parameters}
          name="assay"
          label="Assay"
          size="small"
          variant="outlined"
          error={!!errors["assay"]}
          helperText={errors["assay"]?.message || ""}
          onChange={handleTextFieldChange}
          InputProps={{
            ...parameters.InputProps,
            endAdornment: (
              <>
                {endAdornment}
                {parameters.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export { AssayAutocomplete }
