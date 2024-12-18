import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Input,
} from "@material-ui/core"
import { useUploadFileMutation } from "dicty-graphql-schema"
import { useLogto } from "@logto/react"
import { useSetAtom } from "jotai"
import { pipe } from "fp-ts/function"
import { MonoidAll as BMonoidAll } from "fp-ts/boolean"
import { head as Ahead } from "fp-ts/Array"
import { match as Ematch } from "fp-ts/Either"
import {
  isSome,
  isNone,
  some,
  none,
  Option,
  fromNullable as OfromNullable,
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { uploadFileDialogOpenAtom } from "../context/atomConfigs"
import { getFileError, ErrorState } from "./fileUploadHelpers"
import { createFileUploadFunction } from "./createUploadFileFunction"

type FileUploadDialogProperties = {
  open: boolean
}

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

const FileUploadDialog = ({ open }: FileUploadDialogProperties) => {
  const [selectedFile, setSelectedFile] = useState<Option<File>>(none)
  const [fileError, setFileError] = useState<Option<ErrorState>>(none)
  const [fileUrl, setFileUrl] = useState<string>("")
  const canSubmit = BMonoidAll.concat(isSome(selectedFile), isNone(fileError))

  const { getAccessToken } = useLogto()
  const [uploadFile, { loading, reset }] = useUploadFileMutation()

  const setDialogDisplay = useSetAtom(uploadFileDialogOpenAtom)
  const { helpText } = useImageUploadDialogStyles()

  const [editor] = useLexicalComposerContext()

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    // get the file selected by the user
    const selected = pipe(
      files,
      OfromNullable,
      Omap((someFiles) => [...someFiles]),
      OflatMap(Ahead),
    )
    // set the error state of the file
    pipe(selected, OflatMap(getFileError), setFileError)
    // set the file state
    setSelectedFile(selected)
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
    setSelectedFile(none)
    setFileError(none)
    reset()
  }

  const onSubmit = async () => {
    if (!canSubmit) return
    const uploadFunction = createFileUploadFunction(
      selectedFile,
      uploadFile,
      getAccessToken,
    )
    const result = await uploadFunction()
    pipe(
      result,
      Ematch(
        (error) => {
          setFileError(some(error))
        },
        (fileUpload) => {
          setFileUrl(fileUpload.url)
        },
      ),
    )
  }

  return (
    <Dialog open={open} onClose={handleClose}>
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
    </Dialog>
  )
}

export { FileUploadDialog }
