import { FunctionComponent } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { Grid, Select, MenuItem, makeStyles } from "@material-ui/core"
import { TextField } from "./order/TextField"
import { countryToFlag } from "./utils/countryToFlag"
import { countryList, CountryOption } from "./utils/countryList"

const useStyles = makeStyles({
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
  const { control } = useFormContext()
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
              {...field}>
              {countryCodes}
            </Select>
          )}
        />
      </Grid>
      <Grid item>
        <TextField name="phone" label="Phone Number" />
      </Grid>
    </Grid>
  )
}

export { PhoneNumberInput }
