import { ChangeEvent } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useController, useFormContext } from "react-hook-form"
import { pipe } from "fp-ts/function"
import { MonoidAny as BMonoidAny, MonoidAll as BMonoidAll } from "fp-ts/boolean"
import {
  isEmpty as SisEmpty,
  replace as Sreplace,
  includes as Sincludes,
  trim as Strim,
} from "fp-ts/string"
import { match } from "ts-pattern"
import { countryList, CountryOption } from "../utils/countryList"
import { countryToFlag } from "../utils/countryToFlag"
import { isValidPostalCode } from "../utils/isValidPostalCode"
import { appendWithNewline } from "../utils/appendWithNewline"
import { INVALID_POSTAL_CODE_MESSAGE } from "../const"

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
    const postalCode: string = getValues("zip")
    const comments: string = getValues("additionalInformation")
    const validPostalCode = isValidPostalCode(postalCode, country)
    match({ validPostalCode, comments })
      // Remove the invalid postal code warning in the comments, if there is no postal code number entered or if the postal code number is valid.
      .when(
        ({ validPostalCode }) =>
          BMonoidAny.concat(validPostalCode, SisEmpty(postalCode)),
        () => {
          setValue(
            "additionalInformation",
            pipe(comments, Sreplace(INVALID_POSTAL_CODE_MESSAGE, ""), Strim),
          )
        },
      )
      // Append the invalid postal code number warning in the comments, if the entered postal code number is invalid and there is currently no invalid postal code number warning in the comments.
      .when(
        ({ comments, validPostalCode }) =>
          BMonoidAll.concat(
            !pipe(comments, Sincludes(INVALID_POSTAL_CODE_MESSAGE)),
            !validPostalCode,
          ),
        () => {
          setValue(
            "additionalInformation",
            appendWithNewline(comments, INVALID_POSTAL_CODE_MESSAGE),
          )
        },
      )
      .otherwise(() => {})
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
