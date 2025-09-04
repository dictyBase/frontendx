import { FunctionComponent } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  Grid,
  Select,
  MenuItem,
  makeStyles,
  TextField as MUITextField,
} from "@material-ui/core"
import { TextField } from "./TextField"
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

const PhoneNumberInput: FunctionComponent = () => {
  const {
    control,
    trigger,
    getFieldState,
    formState: { errors },
  } = useFormContext()
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <Controller
          name="countryCode"
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
                if (getFieldState("phone").isTouched) trigger("phone")
                field.onChange(event)
              }}>
              {countryCodes}
            </Select>
          )}
        />
      </Grid>
      <Grid item className={classes.textField}>
        <TextField name="phone" label="Phone Number" />
      </Grid>
    </Grid>
  )
}

export { PhoneNumberInput }
