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
import { useListPhenotypesLazyQuery } from "dicty-graphql-schema"

const PhenotypeAutocomplete = () => {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({ name: "phenotype" })
  const [getPhenotypes, { data, loading }] = useListPhenotypesLazyQuery()
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
    getPhenotypes({
      variables: {
        search: textFieldValue,
      },
    })
  }

  const options = match(data)
    .with(
      {
        listPhenotypes: P.select(P.array(P.string)),
      },
      (phenotypes) => phenotypes,
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
          name="phenotype"
          size="small"
          label="* Phenotype"
          variant="outlined"
          error={!!errors["phenotype"]}
          helperText={errors["phenotype"]?.message || ""}
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

export { PhenotypeAutocomplete }
