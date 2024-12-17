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
import { none, Option } from "fp-ts/Option"
import { Either } from "fp-ts/Either"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"
import {
  renderError,
  EgetValidFile,
  createImageUploadFunction,
  isValidFile,
  type ErrorState,
  type ImageSuccessState,
} from "./imageUploadHelpers"

type FileUploadDialogProperties = {
  open: boolean
}

const useImageUploadDialogStyles = makeStyles({
  helpText: {
    marginTop: "5px",
    color: "hsl(241, 5%, 50%)",
    fontStyle: "italic",
  },
})

const FileUploadDialog = ({ open }: FileUploadDialogProperties) => {
  const [selectedFile, setSelectedFile] =
    useState<Option<Either<ErrorState, ImageSuccessState>>>(none)
  const [fileError, setFileError] = useState<Option<ErrorState>>(none)
  const { getAccessToken } = useLogto()
  const [editor] = useLexicalComposerContext()
  const setDialogDisplay = useSetAtom(insertImageDialogOpenAtom)
  const [uploadFile, { loading, reset }] = useUploadFileMutation()
  const { helpText } = useImageUploadDialogStyles()
  const canSubmit = isValidFile(selectedFile)

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    pipe(files, EgetValidFile, setSelectedFile)
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
    setSelectedFile(none)
    reset()
  }

  const onSubmit = () => {
    const uploadFunction = createImageUploadFunction(
      editor,
      getAccessToken,
      uploadFile,
      selectedFile,
      setSelectedFile,
      alignment,
      setDialogDisplay,
    )
    uploadFunction()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h3"> Choose a File to Upload </Typography>
      </DialogTitle>
      <DialogContent>
        <Input type="file" id="file-upload" onChange={onFileChange} fullWidth />
        <Typography className={helpText}>* Must be smaller than 1MB</Typography>
        {renderError(selectedFile)}
      </DialogContent>
      <DialogActions>
        {loading ? <CircularProgress /> : <></>}
        <Button type="button" disabled={!canSubmit} onClick={onSubmit}>
          Insert Image
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { FileUploadDialog }
