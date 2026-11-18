/* eslint-disable dot-notation */
import { TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"

const PhenotypeReferenceField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Record<string, string>>()

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
