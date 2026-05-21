import { ChangeEvent } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useController, useFormContext } from "react-hook-form"
import { countryList, CountryOption } from "../utils/countryList"
import { countryToFlag } from "../utils/countryToFlag"
import { getPostalCodeWarning } from "../utils/getPostalCodeWarning"

type CountryDropdownProperties = {
  fieldName: string
}
/**
 * CountryDropdown is an Autocomplete component for selecting a user's
 * country.
 */
const CountryDropdown = ({ fieldName }: CountryDropdownProperties) => {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const {
    field: { onChange, onBlur, value, name, ref },
  } = useController({
    name: fieldName,
  })

  const appendWarning = () => {
    const country = getValues(name)
    const postalCode = getValues("zip")
    const comments = getValues("additionalInformation")
    setValue(
      "additionalInformation",
      getPostalCodeWarning(postalCode, country, comments),
    )
  }
  const autoCompleteValue =
    // eslint-disable-next-line unicorn/no-null
    countryList.find((country) => country.label === value) ?? null

  const handleChange = (
    _: ChangeEvent<{}>,
    optionValue: CountryOption | null,
    reason: string,
  ) => {
    if (!optionValue) return
    if (reason !== "selectOption") return
    onChange(optionValue.label)
    appendWarning()
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
      renderOption={(properties, option) => (
        <li {...properties}>
          {countryToFlag(option?.code as string)}&nbsp;
          {option?.label}
        </li>
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
          size="small"
        />
      )}
    />
  )
}

export { CountryDropdown }
