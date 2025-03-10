import { useState } from "react"
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
  makeStyles,
} from "@material-ui/core"
import { useLogto } from "@logto/react"
import { pipe } from "fp-ts/function"
import { match as Bmatch, MonoidAll as BMonoidAll } from "fp-ts/boolean"
import { head as Ahead } from "fp-ts/Array"
import { match as Ematch } from "fp-ts/Either"
import {
  Option,
  some,
  none,
  map as Omap,
  flatMap as OflatMap,
  match as Omatch,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { UploadFileMutationFn } from "dicty-graphql-schema"
import { SelectedFile } from "./SelectedFile"
import { UploadButton } from "./UploadButton"
import { UploadAsField } from "./UploadAsField"
import {
  isValidFile,
  ErrorState,
  getFileValidationError,
  useValidateUploadName,
} from "./fileUploadHelpers"
import { createFileUploadFunction } from "./createUploadFileFunction"

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
}
const Upload = ({ loading, mutationFunction }: UploadProperties) => {
  const { getAccessToken } = useLogto()
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useValidateUploadName()
  const [selectedFile, setSelectedFile] = useState<Option<File>>(none)
  const [fileError, setFileError] = useState<Option<ErrorState>>(none)
  const fileName = pipe(
    selectedFile,
    Omap(({ name }) => name),
  )
  const canSubmit = pipe(
    selectedFile,
    Omap(isValidFile),
    OgetOrElse(() => false),
    (b) => BMonoidAll.concat(isValid, b),
  )
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    // Get the file selected by the user.
    const selected = pipe(
      files,
      OfromNullable,
      Omap((someFiles) => [...someFiles]),
      OflatMap(Ahead),
    )
    pipe(
      selected,
      Omap(({ name }) => name),
      OgetOrElse(() => ""),
      (uploadName) => {
        setValue("uploadName", uploadName)
      },
    )
    // Set the error state of the file.
    pipe(selected, OflatMap(getFileValidationError), setFileError)
    // Set the file state.
    setSelectedFile(selected)
  }

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
            {pipe(
              fileName,
              Omatch(
                () => <></>,
                () => <UploadAsField register={register} errors={errors} />,
              ),
            )}
          </Grid>
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
                  Omatch(
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
        {pipe(
          fileName,
          Omatch(
            () => <></>,
            () => (
              <UploadButton
                onSubmit={handleSubmit(onSubmit)}
                isDisabled={!canSubmit}
              />
            ),
          ),
        )}
      </DialogActions>
    </>
  )
}

export { Upload }
