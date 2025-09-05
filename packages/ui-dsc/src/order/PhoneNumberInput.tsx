import { FunctionComponent } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  Grid,
  Select,
  MenuItem,
  makeStyles,
  TextField as MuiTextField,
} from "@material-ui/core"
import { countryToFlag } from "../utils/countryToFlag"
import { countryList, CountryOption } from "../utils/countryList"

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
    formState: { errors },
  } = useFormContext()
  const classes = useStyles()
  const countryCodeFieldName = `${name}CountryCode`
  return (
    <Grid container>
      <Grid item>
        <Controller
          name={countryCodeFieldName}
          control={control}
          render={({ field }) => (
            <Select
              variant="outlined"
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
              {...field}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export { PhoneNumberInput }
