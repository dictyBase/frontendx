import { useState, useEffect, ChangeEvent } from "react"
import { useFormContext } from "react-hook-form"
import { Autocomplete } from "@material-ui/lab"
import { TextField, CircularProgress } from "@material-ui/core"
import { match, P } from "ts-pattern"
import { useStrainListLazyQuery, StrainType } from "dicty-graphql-schema"

const PhenotypeAutocomplete = () => {
  const [getStrains, { data, loading, error }] = useStrainListLazyQuery()

  const handleTextFieldChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    getStrains({
      variables: {
        cursor: 10,
        limit: 10,
        filter: {
          strain_type: StrainType.All,
          label: value,
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
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(parameters) => (
        <TextField
          {...parameters}
          size="small"
          label="Entity"
          variant="outlined"
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
