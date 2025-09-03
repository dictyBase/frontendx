import { useState, FunctionComponent, ChangeEventHandler } from "react"
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

const PhoneNumberInput: FunctionComponent = () => {
  const [countryCode, setCountryCode] = useState("US")
  const classes = useStyles()
  const onChange: ChangeEventHandler<{ name?: string; value: any }> = ({
    target: { value },
  }) => {
    setCountryCode(value)
  }
  return (
    <Grid container>
      <Grid item>
        <Select
          variant="outlined"
          margin="dense"
          className={classes.select}
          value={countryCode}
          onChange={onChange}
          renderValue={(value) =>
            countryToFlag(value as CountryOption["code"])
          }>
          {pipe(
            countryList,
            Amap(({ code, label }) => (
              <MenuItem key={code} value={code}>
                {countryToFlag(code)} {label}
              </MenuItem>
            )),
          )}
        </Select>
      </Grid>
      <Grid item>
        <TextField name="phone" label="Phone Number" />
      </Grid>
    </Grid>
  )
}

export { PhoneNumberInput }
