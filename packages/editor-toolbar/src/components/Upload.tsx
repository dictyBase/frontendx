import { ChangeEventHandler } from "react"
import {
  Box,
  Grid,
  CircularProgress,
  Input,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"
import InsertDriveFileIconOutlined from "@mui/icons-material/InsertDriveFileOutlined"
import { grey } from "@mui/material/colors"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  Option,
  map as Omap,
  getOrElse as OgetOrElse,
  isSome,
} from "fp-ts/Option"
import { ErrorState } from "./fileUploadHelpers"

const renderError = (Oerror: Option<ErrorState>) =>
  pipe(
    Oerror,
    Omap((someError) => (
      <Typography color="error">{someError.message}</Typography>
    )),
    OgetOrElse(() => <></>),
  )

const useFileUploadDialogStyles = () => ({
  nativeInput: {
    display: "none",
  },
  helpText: {
    marginTop: "5px",
    color: "hsl(241, 5%, 50%)",
    fontStyle: "italic",
  },
  selectedFile: {
    padding: "16px",
    backgroundColor: grey[200],
    borderRadius: "0.3125rem",
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
  const styles = useFileUploadDialogStyles()
  return (
    <>
      <DialogTitle disableTypography>
        <Typography variant="h3"> Choose a file to upload </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          {pipe(
            fileName,
            Omap((name) => (
              <Grid item>
                <Box sx={styles.selectedFile}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <InsertDriveFileIconOutlined />
                    </Grid>
                    <Grid item>
                      <Typography>{name}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )),
            OgetOrElse(() => <></>),
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
