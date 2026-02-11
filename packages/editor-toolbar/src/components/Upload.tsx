import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
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
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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
import { UploadAsField } from "./UploadAsField"
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
  loading: boolean
  mutationFunction: UploadFileMutationFn
  selectedFile: File
  setSelectedFile: Dispatch<SetStateAction<Option<File>>>
  fileError: Option<ErrorState>
  setFileError: Dispatch<SetStateAction<Option<ErrorState>>>
  validationMethods: UseFormReturn<{ uploadName?: any }>
  onFileChange: React.ChangeEventHandler<HTMLInputElement>
}
const Upload = ({
  loading,
  mutationFunction,
  selectedFile,
  setSelectedFile,
  fileError,
  setFileError,
  validationMethods,
  onFileChange,
}: UploadProperties) => {
  const { getAccessToken } = useLogto()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = validationMethods
  const filename = selectedFile.name
  const canSubmit = pipe(selectedFile, isValidFile, (b) =>
    BMonoidAll.concat(isValid, b),
  )

  const onSubmit = async () => {
    const uploadFunction = createFileUploadFunction(
      selectedFile,
      getValues("uploadName"),
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

  const { helpText, nativeInput } = useFileUploadDialogStyles()

  return (<>
    <DialogTitle>
      <Typography variant="h3"> Choose a file to upload </Typography>
    </DialogTitle>
    <DialogContent>
      <Grid container direction="column" spacing={2}>
        <SelectedFile filename={filename} />
        <Grid item>
          <UploadAsField register={register} errors={errors} />
        </Grid>
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
            sx={nativeInput}
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
      <UploadButton
        onSubmit={handleSubmit(onSubmit)}
        isDisabled={!canSubmit}
      />
    </DialogActions>
  </>);
}

export { Upload }
