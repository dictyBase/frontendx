import { FunctionComponent } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Grid, TextField as MuiTextField } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { getPostalCodeWarning } from "../utils/getPostalCodeWarning"

const useStyles = makeStyles()({
  textField: {
    flexGrow: 1,
  },
  select: {
    marginTop: "8px",
  },
})

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
    setValue(
      "additionalInformation",
      getPostalCodeWarning(postalCode, country, comments),
    )
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
