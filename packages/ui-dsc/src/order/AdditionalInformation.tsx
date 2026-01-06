import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { pipe } from "fp-ts/function"
import {
  flatMap as OflatMap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { useFormContext } from "react-hook-form"
import { PanelWrapper } from "./PanelWrapper"

const fieldName = "additionalInformation"
const AdditionalInformation = () => {
  const { register, getFieldState } = useFormContext()
  const { error, invalid } = getFieldState(fieldName)
  const helperText = pipe(
    error,
    OfromNullable,
    OflatMap(({ message }) => OfromNullable(message)),
    OgetOrElse(() => ""),
  )

  return (
    <PanelWrapper title="Additional Information">
      <Box mt={1} mb={2} p={2}>
        <Typography component="label" variant="h3" htmlFor={fieldName}>
          Comments:
        </Typography>
        <TextField
          id={fieldName}
          fullWidth
          multiline
          variant="outlined"
          minRows={5}
          maxRows={5}
          error={invalid}
          helperText={helperText}
          {...register(fieldName)}
        />
      </Box>
    </PanelWrapper>
  )
}

export { AdditionalInformation }
