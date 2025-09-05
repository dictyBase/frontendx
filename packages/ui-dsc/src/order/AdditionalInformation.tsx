import TextField from "@material-ui/core/TextField"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { pipe } from "fp-ts/function"
import {
  flatMap as OflatMap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { useFormContext } from "react-hook-form"
import { PanelWrapper } from "./PanelWrapper"

const AdditionalInformation = () => {
  const { register, getFieldState } = useFormContext()
  const { error, invalid } = getFieldState("additionalInformation")
  const helperText = pipe(
    error,
    OfromNullable,
    OflatMap(({ message }) => OfromNullable(message)),
    OgetOrElse(() => ""),
  )

  return (
    <PanelWrapper title="Additional Information">
      <Box mt={1} mb={2} p={2}>
        <Typography variant="h3">Comments:</Typography>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          minRows={5}
          maxRows={5}
          error={invalid}
          helperText={helperText}
          {...register("additionalInformation")}
        />
      </Box>
    </PanelWrapper>
  )
}

export { AdditionalInformation }
