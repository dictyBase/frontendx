import { Dispatch, SetStateAction } from "react"
import {
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
import { makeStyles } from "tss-react/mui"
import { useLogto } from "@logto/react"
import { pipe } from "fp-ts/function"
import { match as Bmatch, MonoidAll as BMonoidAll } from "fp-ts/boolean"
import { match as Ematch } from "fp-ts/Either"
import {
  Option,
  some,
  none,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { UploadFileMutationFn } from "dicty-graphql-schema"
import { SelectedFile } from "./SelectedFile"
import { UploadButton } from "./UploadButton"
import { isValidFile, ErrorState } from "./helpers/fileUploadHelpers"
import { createFileUploadFunction } from "./helpers/createUploadFileFunction"

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

type UploadProperties = {
  loading: boolean
  mutationFunction: UploadFileMutationFn
  selectedFile: File
  setSelectedFile: Dispatch<SetStateAction<Option<File>>>
  fileError: Option<ErrorState>
  setFileError: Dispatch<SetStateAction<Option<ErrorState>>>
  // validationMethods: UseFormReturn<{ uploadName?: any }>
  onFileChange: React.ChangeEventHandler<HTMLInputElement>
}
const Upload = ({
  loading,
  mutationFunction,
  selectedFile,
  setSelectedFile,
  fileError,
  setFileError,
  onFileChange,
}: UploadProperties) => {
  const { getAccessToken } = useLogto()
  const filename = selectedFile.name
  const canSubmit = pipe(selectedFile, isValidFile)

  const onSubmit = async () => {
    const uploadFunction = createFileUploadFunction(
      selectedFile,
      mutationFunction,
      getAccessToken,
    )
    pipe(
      await uploadFunction(),
      Ematch(
        (error) => {
          setFileError(some(error))
        },
        () => {
          setSelectedFile(none)
          setFileError(none)
        },
      ),
    )
  }

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
          <SelectedFile filename={filename} />
          <Grid item>
            <InputLabel htmlFor="file-upload">
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                component="span">
                Choose a different file
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
      <DialogActions>
        {pipe(
          loading,
          Bmatch(
            () => <></>,
            () => <CircularProgress />,
          ),
        )}
        <UploadButton onSubmit={onSubmit} isDisabled={!canSubmit} />
      </DialogActions>
    </>
  )
}

export { Upload }
