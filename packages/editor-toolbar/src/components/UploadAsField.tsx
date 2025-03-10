import { TextField } from "@material-ui/core"
import { UseFormRegister } from "react-hook-form"

type UploadAsFieldProperties = {
  register: UseFormRegister<{ uploadName: string }>
}

const UploadAsField = ({ register }: UploadAsFieldProperties) => (
  <TextField
    {...register("uploadName")}
    label="File Name"
    fullWidth
    variant="outlined"
    helperText="The name of the file that will be downloaded"
  />
)

export { UploadAsField }
