import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  matchW as OmatchW,
  isSome,
} from "fp-ts/Option"
import { TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { type FileFormFields } from "./helpers/fileUploadHelpers"

const initialHelpText = "Specify the name you want to upload the file as"

const UploadAsField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FileFormFields>()
  const helperText = pipe(
    errors.suggestedFilename,
    OfromNullable,
    OflatMap(({ message }) => OfromNullable(message)),
    OmatchW(
      () => initialHelpText,
      (message) => message,
    ),
  )

  const hasError = pipe(errors.suggestedFilename, OfromNullable, isSome)
  return (
    <TextField
      error={hasError}
      helperText={helperText}
      label="Upload Name"
      fullWidth
      variant="outlined"
      {...register("suggestedFilename")}
    />
  )
}

export { UploadAsField }
