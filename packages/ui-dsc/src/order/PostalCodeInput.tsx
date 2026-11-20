import { FunctionComponent } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Grid, TextField as MuiTextField } from "@mui/material"
import { getPostalCodeWarning } from "../utils/getPostalCodeWarning"

const PostalCodeInput: FunctionComponent<{
  name: string
  label: string
}> = ({ name, label }) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<Record<string, string>>()
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
      <Grid item sx={{ flexGrow: 1 }}>
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
