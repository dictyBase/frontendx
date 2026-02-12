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

const initialHelpText = "the name that the file will be saved as"

const SaveAsField = () => {
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
      label="File Name"
      fullWidth
      variant="outlined"
      {...register("suggestedFilename")}
    />
  )
}

export { SaveAsField }
