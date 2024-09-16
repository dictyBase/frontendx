import { ChangeEvent } from "react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import { useController } from "react-hook-form"
import { countryList, CountryOption } from "../utils/countryList"

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
    field: { onChange, onBlur, value, name, ref },
    formState: { errors },
  } = useController({
    name: fieldName,
  })

  const autoCompleteValue = countryList.find(
    (country) => country.label === value,
  ) ?? { code: "", label: "" }

  const handleChange = (
    _: ChangeEvent<{}>,
    optionValue: CountryOption | null,
    reason: string,
  ) => {
    if (!optionValue) return
    if (reason !== "select-option") return
    onChange(optionValue.label)
  }

  return (
    <Autocomplete
      id="country"
      onBlur={onBlur}
      onChange={handleChange}
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
          name={name}
          ref={ref}
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
