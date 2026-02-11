import { Button } from "@mui/material"

type UploadButtonProperties = {
  onSubmit: () => void
  isDisabled: boolean
}

const UploadButton = ({ onSubmit, isDisabled }: UploadButtonProperties) => (
  <Button
    type="button"
    variant="contained"
    onClick={onSubmit}
    disabled={isDisabled}>
    Upload
  </Button>
)

export { UploadButton }
