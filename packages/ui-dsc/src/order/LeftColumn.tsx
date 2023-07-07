import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { match } from "ts-pattern"
import { map } from "fp-ts/Array"
import { pipe } from "fp-ts/function"
import {
  useFormContext,
  type UseFormRegister,
  type FieldValues,
  type FieldErrors,
} from "react-hook-form"
import { addressFields } from "./addressFields"
import { CountryDropdown } from "./CountryDropdown"

type AddressField = {
  name: string
  label: string
}

const matchCountry =
  (register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>) =>
  (addressField: AddressField) =>
    match(addressField)
      .when(
        ({ name }) => name === "country",
        () => <CountryDropdown />,
      )
      .otherwise(({ name, label }) => (
        <TextField
          label={label}
          {...register(name)}
          error={!!errors[name]}
          helperText={errors[name]?.message || ""}
        />
      ))

const gridItemWrapper = (element: JSX.Element) => <Grid item>{element}</Grid>

const LeftColumn = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const matchCountryFunction = matchCountry(register, errors)

  return (
    <Grid container alignContent="center" direction="column" spacing={2}>
      {pipe(addressFields, map(matchCountryFunction), map(gridItemWrapper))}
    </Grid>
  )
}

export { LeftColumn }
