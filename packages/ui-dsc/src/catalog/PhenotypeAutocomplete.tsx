/* eslint-disable dot-notation */
import { ChangeEvent } from "react"
import { useController } from "react-hook-form"
import { Autocomplete } from "@material-ui/lab"
import { TextField, CircularProgress } from "@material-ui/core"
import { match, P } from "ts-pattern"
import { useListPhenotypesLazyQuery } from "dicty-graphql-schema"

const PhenotypeAutocomplete = () => {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({ name: "phenotype" })
  const [getPhenotypes, { data, loading, error }] = useListPhenotypesLazyQuery()
  const handleAutocompleteChange = (
    _: ChangeEvent<{}>,
    changeValue: string,
    reason:
      | "select-option"
      | "clear"
      | "create-option"
      | "remove-option"
      | "blur",
  ) => {
    match(reason)
      .with("select-option", () => {
        onChange(changeValue)
      })
      .with("clear", () => {
        onChange(changeValue)
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
          label="Phenotype"
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
