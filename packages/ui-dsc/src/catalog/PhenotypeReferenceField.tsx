/* eslint-disable dot-notation */
import { TextField } from "@material-ui/core"
import { useFormContext } from "react-hook-form"

const PhenotypeReferenceField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <TextField
      {...register("publication")}
      fullWidth
      label="* Reference"
      size="small"
      variant="outlined"
      error={!!errors["publication"]}
      helperText={errors["publication"]?.message || ""}
    />
  )
}

export { PhenotypeReferenceField }
