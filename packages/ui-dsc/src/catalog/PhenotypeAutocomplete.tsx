/* eslint-disable dot-notation */
import { ChangeEvent } from "react"
import { useController } from "react-hook-form"
import { Autocomplete } from "@material-ui/lab"
import { TextField, CircularProgress } from "@material-ui/core"
import { match, P } from "ts-pattern"
import { useStrainListLazyQuery, StrainType } from "dicty-graphql-schema"

const PhenotypeAutocomplete = () => {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({ name: "phenotype" })
  const [getStrains, { data, loading, error }] = useStrainListLazyQuery()

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
    getStrains({
      variables: {
        cursor: 10,
        limit: 10,
        filter: {
          strain_type: StrainType.All,
          label: textFieldValue,
        },
      },
    })
  }

  const options = match(data)
    .with(
      {
        listStrains: { strains: P.select(P.array({ label: P.string })) },
      },
      (strains) => strains,
    )
    .otherwise(() => [])

  const endAdornment = match(loading)
    .with(true, () => <CircularProgress />)
    .with(false, () => <></>)
    .exhaustive()

  return (
    <Autocomplete
      value={value}
      options={options}
      onBlur={onBlur}
      onChange={handleAutocompleteChange}
      getOptionLabel={(option) => option.label}
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
