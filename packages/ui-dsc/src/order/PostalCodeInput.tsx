/* eslint-disable @typescript-eslint/no-shadow */
import { FunctionComponent } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { pipe } from "fp-ts/function"
import {
  match as Bmatch,
  MonoidAny as BMonoidAny,
  MonoidAll as BMonoidAll,
} from "fp-ts/boolean"
import {
  isEmpty as SisEmpty,
  replace as Sreplace,
  includes as Sincludes,
  trim as Strim,
} from "fp-ts/string"
import { some, none, map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { findFirstMap as AfindFirstMap } from "fp-ts/Array"
import { match } from "ts-pattern"
import { Grid, TextField as MuiTextField } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { postcodeValidator } from "postcode-validator"
import { countryList } from "../utils/countryList"
import { appendWithNewline } from "../utils/appendWithNewline"

const INVALID_POSTAL_CODE_MESSAGE =
  "The postal code entered might be invalid for the selected country. Please check the country and postal code fields."

const useStyles = makeStyles()({
  textField: {
    flexGrow: 1,
  },
  select: {
    marginTop: "8px",
  },
})

const isValidPostalCode = (postalCode: string, country: string) =>
  pipe(
    countryList,
    AfindFirstMap(({ label, code }) => (label === country ? some(code) : none)),
    Omap((countryCode) => postcodeValidator(postalCode, countryCode)),
    OgetOrElse(() => false),
  )

const PostalCodeInput: FunctionComponent<{
  name: string
  label: string
}> = ({ name, label }) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const { classes } = useStyles()
  const onBlur = () => {
    const postalCode: string = getValues(name)
    const country = getValues("country")
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
  return (
    <Grid container>
      <Grid item className={classes.textField}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <MuiTextField
              id={label}
              label={label}
              type="text"
              margin="dense"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors[name]}
              helperText={errors[name]?.message || ""}
              InputProps={{
                onBlur,
              }}
              {...field}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export { PostalCodeInput }
