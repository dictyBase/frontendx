import TextField from "@material-ui/core/TextField"
import { useFormContext } from "react-hook-form"
import { PanelWrapper } from "./PanelWrapper"

const AdditionalInformation = () => {
  const { register } = useFormContext()

  return (
    <PanelWrapper title="Additional Information">
      <TextField
        fullWidth
        multiline
        variant="outlined"
        minRows={5}
        maxRows={5}
        {...register("additionalInformation")}
      />
    </PanelWrapper>
  )
}

export { AdditionalInformation }
