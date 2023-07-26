import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import { useFormContext } from "react-hook-form"
import countryList from "../utils/countryList"

// ISO 3166-1 alpha-2 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
const countryToFlag = (isoCode: string) => {
  // verify fromCodePoint is a valid method for browser
  if (String.fromCodePoint !== undefined) {
    return isoCode.replaceAll(/./g, (char: string) =>
      String.fromCodePoint(char.codePointAt(0) + 127_397),
    )
  }
  return isoCode
}

type CountryDropdownProperties = {
  fieldName: string
}
/**
 * CountryDropdown is an Autocomplete component for selecting a user's
 * country.
 */
const CountryDropdown = ({ fieldName }: CountryDropdownProperties) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <Autocomplete
      id="country"
      aria-label="country"
      size="medium"
      options={countryList}
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <span>
          {countryToFlag(option.code)}&nbsp;
          {option.label}
        </span>
      )}
      renderInput={(properties) => (
        <TextField
          {...properties}
          {...register(fieldName)}
          label="Country"
          variant="outlined"
          fullWidth
          margin="dense"
          error={!!errors[fieldName]}
          helperText={errors[fieldName]?.message || ""}
          size="medium"
        />
      )}
    />
  )
}

export { CountryDropdown, countryToFlag }
