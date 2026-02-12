import {
  Grid,
  Input,
  InputLabel,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { pipe } from "fp-ts/function"
import { Option, map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { ErrorState } from "./helpers/fileUploadHelpers"

const renderError = (Oerror: Option<ErrorState>) =>
  pipe(
    Oerror,
    Omap((someError) => (
      <Typography color="error">{someError.message}</Typography>
    )),
    OgetOrElse(() => <></>),
  )

const useFileUploadDialogStyles = makeStyles()({
  nativeInput: {
    display: "none",
  },
  helpText: {
    marginTop: "5px",
    color: "hsl(241, 5%, 50%)",
    fontStyle: "italic",
  },
})

type FileSelectProperties = {
  fileError: Option<ErrorState>
  onFileChange: React.ChangeEventHandler<HTMLInputElement>
}
const FileSelect = ({ fileError, onFileChange }: FileSelectProperties) => {
  const {
    classes: { helpText, nativeInput },
  } = useFileUploadDialogStyles()

  return (
    <>
      <DialogTitle>
        <Typography variant="h3"> Choose a file to upload </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <InputLabel htmlFor="file-upload">
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                component="span">
                Choose a file
              </Button>
            </InputLabel>
            <Input
              type="file"
              id="file-upload"
              onChange={onFileChange}
              fullWidth
              className={nativeInput}
            />
          </Grid>
          <Grid item>
            <Typography className={helpText}>
              * File size may not exceed 10MB
            </Typography>
          </Grid>
          <Grid item>{renderError(fileError)}</Grid>
        </Grid>
      </DialogContent>
    </>
  )
}

export { FileSelect }
