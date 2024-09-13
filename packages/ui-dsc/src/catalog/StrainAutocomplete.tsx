import { ChangeEvent } from "react"
import { Autocomplete } from "@material-ui/lab"
import { TextField, CircularProgress } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { none, fromNullable, map as Omap } from "fp-ts/Option"
import { match, P } from "ts-pattern"
import { useSetAtom } from "jotai"
import { useStrainListLazyQuery, StrainType } from "dicty-graphql-schema"
import { selectedStrainIdAtom } from "../addPhenotypeState"

const StrainAutocomplete = () => {
  const [getStrains, { data, loading, error }] = useStrainListLazyQuery()
  const setSelectedStrainId = useSetAtom(selectedStrainIdAtom)

  const handleAutocompleteChange = (
    _: ChangeEvent<{}>,
    value: { id: string } | null,
    reason: "select-option" | "clear" | "create-option" | "remove-option",
  ) => {
    match(reason)
      .with("clear", () => {
        setSelectedStrainId(none)
      })
      .with("select-option", () => {
        pipe(
          value,
          fromNullable,
          Omap(({ id }) => id),
          setSelectedStrainId,
        )
      })
      .otherwise(() => {})
  }

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
    .with(true, () => <CircularProgress size="1rem" />)
    .with(false, () => <></>)
    .exhaustive()

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={handleAutocompleteChange}
      renderInput={(parameters) => (
        <TextField
          {...parameters}
          size="small"
          label="Strain"
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

export { StrainAutocomplete }
