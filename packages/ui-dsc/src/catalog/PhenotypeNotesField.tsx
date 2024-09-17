import { TextField } from "@material-ui/core"
import { useFormContext } from "react-hook-form"

const PhenotypeNotesField = () => {
  const { register } = useFormContext()
  return (
    <TextField
      {...register("note")}
      fullWidth
      multiline
      variant="outlined"
      id="phenotype-note"
      label="Note"
      minRows={4}
      maxRows={4}
    />
  )
}

export { PhenotypeNotesField }
