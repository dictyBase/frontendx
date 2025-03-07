import { Button } from "@material-ui/core"

type UploadButtonProperties = {
  onSubmit: () => void
}

const UploadButton = ({ onSubmit }: UploadButtonProperties) => (
  <Button type="button" variant="contained" onClick={onSubmit}>
    Upload
  </Button>
)

export { UploadButton }
