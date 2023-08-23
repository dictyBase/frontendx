import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import { useFormContext } from "react-hook-form"
import { countryList } from "../utils/countryList"

// ISO 3166-1 alpha-2 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
const countryToFlag = (isoCode: string) => {
  // verify fromCodePoint is a valid method for browser
  if (String.fromCodePoint !== undefined) {
    return isoCode.replaceAll(/./g, (char: string) =>
      String.fromCodePoint((char.codePointAt(0) as number) + 127_397),
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
    getValues,
  } = useFormContext()

  // Since the Autocomplete component itself is not registered with React Form Hook,
  // its value is not automatically set. The code below gets the country object corresponding to
  // the current form value. This country object is passed into Autocomplete's value prop.
  const autoCompleteValue = countryList.find(
    (country) => country.label === getValues(fieldName),
  )

  return (
    <Autocomplete
      id="country"
      value={autoCompleteValue}
      aria-label="country"
      size="medium"
      options={countryList}
      getOptionLabel={(option) => option?.label as string}
      renderOption={(option) => (
        <span>
          {countryToFlag(option?.code as string)}&nbsp;
          {option?.label}
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
