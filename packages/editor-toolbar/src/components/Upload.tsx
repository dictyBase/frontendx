import { useState, ChangeEventHandler } from "react"
import {
  Grid,
  TextField,
  CircularProgress,
  Input,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  Option,
  map as Omap,
  match as Omatch,
  getOrElse as OgetOrElse,
  isSome,
} from "fp-ts/Option"
import { SelectedFile } from "./SelectedFile"
import { ErrorState } from "./fileUploadHelpers"

const renderError = (Oerror: Option<ErrorState>) =>
  pipe(
    Oerror,
    Omap((someError) => (
      <Typography color="error">{someError.message}</Typography>
    )),
    OgetOrElse(() => <></>),
  )

const useFileUploadDialogStyles = makeStyles({
  nativeInput: {
    display: "none",
  },
  helpText: {
    marginTop: "5px",
    color: "hsl(241, 5%, 50%)",
    fontStyle: "italic",
  },
})

type UploadProperties = {
  fileName: Option<string>
  fileError: Option<ErrorState>
  loading: boolean
  canSubmit: boolean
  onSubmit: () => void
  onFileChange: ChangeEventHandler<HTMLInputElement>
}
const Upload = ({
  fileName,
  fileError,
  loading,
  canSubmit,
  onSubmit,
  onFileChange,
}: UploadProperties) => {
  const { helpText, nativeInput } = useFileUploadDialogStyles()
  return (
    <>
      <DialogTitle variant="h3">Choose a file to upload</DialogTitle>
      <DialogContent
        sx={{
          padding: "16px 24px",
        }}>
        <Grid container direction="column" spacing={1}>
          {pipe(
            fileName,
            Omatch(
              () => <></>,
              (name) => <SelectedFile filename={name} />,
            ),
          )}
          <Grid item>
            <InputLabel htmlFor="file-upload">
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                component="span">
                {pipe(
                  fileName,
                  isSome,
                  Bmatch(
                    () => "Choose a file",
                    () => "Choose a different file",
                  ),
                )}
              </Button>
            </InputLabel>
            <Input
              type="file"
              id="file-upload"
              onChange={onFileChange}
              fullWidth
              sx={styles.nativeInput}
            />
          </Grid>
          <Grid item>
            <Typography sx={styles.helpText}>
              * File size may not exceed 10MB
            </Typography>
          </Grid>
          <Grid item>{renderError(fileError)}</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {pipe(
          loading,
          Bmatch(
            () => <></>,
            () => <CircularProgress />,
          ),
        )}
        {pipe(
          canSubmit,
          Bmatch(
            () => <></>,
            () => (
              <Button
                type="button"
                variant="contained"
                disabled={!canSubmit}
                onClick={onSubmit}>
                Upload
              </Button>
            ),
          ),
        )}
      </DialogActions>
    </>
  )
}

export { Upload }
