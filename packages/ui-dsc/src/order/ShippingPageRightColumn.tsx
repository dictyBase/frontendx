import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useFormContext } from "react-hook-form"

const ShippingPageRightColumn = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <> Shipping Method Here </>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          minRows={5}
          maxRows={5}
          {...register("additionalInformation")}
        />
      </Grid>
      <Grid item>
        <Button type="submit"> Continue </Button>
      </Grid>
    </Grid>
  )
}

export { ShippingPageRightColumn }
