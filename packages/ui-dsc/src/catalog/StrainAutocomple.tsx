import { useState, useEffect, ChangeEvent } from "react"
import { Autocomplete } from "@material-ui/lab"
import TextField from "@material-ui/core/TextField"
import { match, P } from "ts-pattern"
import { useStrainListLazyQuery, StrainType } from "dicty-graphql-schema"

const StrainAutocomplete = () => {
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

  const options = match(data)
    .with(
      {
        listStrains: { strains: P.select(P.array({ label: P.string })) },
      },
      (strains) => strains,
    )
    .otherwise(() => [])

  const handleTextFieldChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchLabel(value)
  }
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(parameters) => (
        <TextField
          {...parameters}
          size="medium"
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      )}
    />
  )
}

export { StrainAutocomplete }
