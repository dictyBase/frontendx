/* eslint-disable @typescript-eslint/no-shadow */
import { FunctionComponent } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { pipe } from "fp-ts/function"
import { match as Bmatch, MonoidAny as BMonoidAny } from "fp-ts/boolean"
import {
  isEmpty as SisEmpty,
  replace as Sreplace,
  includes as Sincludes,
} from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"
import { match } from "ts-pattern"
import {
  Grid,
  Select,
  MenuItem,
  makeStyles,
  TextField as MuiTextField,
} from "@material-ui/core"
import { countryToFlag } from "../utils/countryToFlag"
import { countryList, CountryOption } from "../utils/countryList"
import { isPhoneValid } from "../utils/isPhoneValid"

const INVALID_PHONE_MESSAGE =
  "The phone number entered for the shipping information appears to be invalid. Please double-check the phone number and make sure the country code is correct."

const appendIfEmpty = (base: string, add: string) =>
  pipe(
    base,
    SisEmpty,
    Bmatch(
      () => `${base}\n${add}`,
      () => add,
    ),
  )

const useStyles = makeStyles({
  textField: {
    flexGrow: 1,
  },
  select: {
    marginTop: "8px",
  },
})

const countryCodes = pipe(
  countryList,
  Amap(({ code, label }) => (
    <MenuItem key={code} value={code}>
      {countryToFlag(code)} {label}
    </MenuItem>
  )),
)

const PhoneNumberInput: FunctionComponent<{
  name: string
  label: string
}> = ({ name, label }) => {
  const {
    control,
    trigger,
    getFieldState,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const classes = useStyles()
  const countryCodeFieldName = `${name}CountryCode`
  const onBlur = () => {
    const phone: string = getValues(name)
    const comments: string = getValues("additionalInformation")
    match({ phone, comments })
      .when(
        ({ phone }) =>
          BMonoidAny.concat(
            isPhoneValid(phone, getValues(countryCodeFieldName)),
            SisEmpty(phone),
          ),
        () => {
          setValue(
            "additionalInformation",
            pipe(comments, Sreplace(INVALID_PHONE_MESSAGE, "")),
          )
        },
      )
      .when(
        ({ comments }) => !pipe(comments, Sincludes(INVALID_PHONE_MESSAGE)),
        () => {
          setValue(
            "additionalInformation",
            appendIfEmpty(comments, INVALID_PHONE_MESSAGE),
          )
        },
      )
      .otherwise(() => {})
  }
  return (
    <Grid container>
      <Grid item>
        <Controller
          name={countryCodeFieldName}
          control={control}
          render={({ field }) => (
            <Select
              variant="outlined"
              label="Country Code"
              margin="dense"
              className={classes.select}
              renderValue={(value) =>
                countryToFlag(value as CountryOption["code"])
              }
              {...field}
              onChange={(event) => {
                if (getFieldState(name).isTouched) trigger(name)
                field.onChange(event)
              }}>
              {countryCodes}
            </Select>
          )}
        />
      </Grid>
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

export { PhoneNumberInput }
