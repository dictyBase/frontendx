import TextField from "@material-ui/core/TextField"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { useFormContext } from "react-hook-form"
import { PanelWrapper } from "./PanelWrapper"

const AdditionalInformation = () => {
  const { register } = useFormContext()

  return (
    <PanelWrapper title="Additional Information">
      <Box mt={1} mb={2} p={2}>
        <Typography variant="h3">Comments:</Typography>
        <TextField
          label="comments"
          fullWidth
          multiline
          variant="outlined"
          minRows={5}
          maxRows={5}
          {...register("additionalInformation")}
        />
      </Box>
    </PanelWrapper>
  )
}

export { AdditionalInformation }
