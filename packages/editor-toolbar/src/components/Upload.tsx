import { ChangeEventHandler } from "react"
import {
  CircularProgress,
  Input,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { Option, map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { ErrorState } from "./fileUploadHelpers"

const renderError = (Oerror: Option<ErrorState>) =>
  pipe(
    Oerror,
    Omap((someError) => (
      <Typography color="error">{someError.message}</Typography>
    )),
    OgetOrElse(() => <></>),
  )

const useImageUploadDialogStyles = makeStyles({
  helpText: {
    marginTop: "5px",
    color: "hsl(241, 5%, 50%)",
    fontStyle: "italic",
  },
})

type UploadProperties = {
  fileError: Option<ErrorState>
  loading: boolean
  canSubmit: boolean
  onSubmit: () => void
  onFileChange: ChangeEventHandler<HTMLInputElement>
}

const Upload = ({
  fileError,
  loading,
  canSubmit,
  onSubmit,
  onFileChange,
}: UploadProperties) => {
  const { helpText } = useImageUploadDialogStyles()
  return (
    <>
      <DialogTitle disableTypography>
        <Typography variant="h3"> Choose a File to Upload </Typography>
      </DialogTitle>
      <DialogContent>
        <Input type="file" id="file-upload" onChange={onFileChange} fullWidth />
        <Typography className={helpText}>
          * File size may not exceed 10MB
        </Typography>
        {renderError(fileError)}
      </DialogContent>
      <DialogActions>
        {loading ? <CircularProgress /> : <></>}
        <Button type="button" disabled={!canSubmit} onClick={onSubmit}>
          Upload File
        </Button>
      </DialogActions>
    </>
  )
}

export { Upload }
