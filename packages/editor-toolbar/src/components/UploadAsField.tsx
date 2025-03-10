import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { TextField } from "@material-ui/core"
import { UseFormRegister, FieldErrors } from "react-hook-form"

type UploadAsFieldProperties = {
  register: UseFormRegister<{ uploadName: string }>
  errors: FieldErrors<{ uploadName: string }>
}

const initialHelpText = "Specify the name you want to upload the file as"

const UploadAsField = ({ register, errors }: UploadAsFieldProperties) => {
  const helperText = pipe(
    errors.uploadName,
    OfromNullable,
    OflatMap(({ message }) => OfromNullable(message)),
    OgetOrElse(() => initialHelpText),
  )
  return (
    <TextField
      {...register("uploadName")}
      error={!!errors.uploadName}
      helperText={helperText}
      label="Upload Name"
      fullWidth
      variant="outlined"
    />
  )
}

export { UploadAsField }
