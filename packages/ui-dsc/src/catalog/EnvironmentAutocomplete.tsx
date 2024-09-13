import { useState, useEffect, ChangeEvent } from "react"
import { Autocomplete } from "@material-ui/lab"
import { TextField, CircularProgress } from "@material-ui/core"
import { match, P } from "ts-pattern"
import { useStrainListLazyQuery, StrainType } from "dicty-graphql-schema"

const EnvironmentAutocomplete = () => {
  const [searchLabel, setSearchLabel] = useState("")
  const [getStrains, { data, loading, error }] = useStrainListLazyQuery()

  useEffect(() => {
    const fetchStrains = async () => {
      getStrains({
        variables: {
          cursor: 10,
          limit: 10,
          filter: {
            strain_type: StrainType.All,
            label: searchLabel,
          },
        },
      })
    }
    fetchStrains()
  }, [getStrains, searchLabel])

  const handleTextFieldChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchLabel(value)
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
          label="Environment"
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

export { EnvironmentAutocomplete }
