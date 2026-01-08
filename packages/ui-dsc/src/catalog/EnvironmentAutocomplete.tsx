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
import { useListPhenotypeEnvironmentsLazyQuery } from "dicty-graphql-schema"

const EnvironmentAutocomplete = () => {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({ name: "environment" })
  const [getEnvironments, { data, loading }] =
    useListPhenotypeEnvironmentsLazyQuery()

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
    getEnvironments({
      variables: {
        search: textFieldValue,
      },
    })
  }

  const options = match(data)
    .with(
      {
        listPhenotypeEnvironments: P.select(P.array(P.string)),
      },
      (environments) => environments,
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
          name="environment"
          label="Environment"
          size="small"
          variant="outlined"
          error={!!errors["environment"]}
          helperText={errors["environment"]?.message || ""}
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

export { EnvironmentAutocomplete }
