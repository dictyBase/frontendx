import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { makeStyles } from "@material-ui/core"
import {
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

type ImageUploadDialogProperties = {
  open: boolean
}

const useImageUploadDialogStyles = makeStyles({
  helpText: {
    marginTop: "5px",
    color: "hsl(241, 5%, 50%)",
    fontStyle: "italic",
  },
})

const ImageUploadDialog = ({ open }: ImageUploadDialogProperties) => {
  const { getAccessToken } = useLogto()
  const [editor] = useLexicalComposerContext()
  const setDialogDisplay = useSetAtom(insertImageDialogOpenAtom)
  const [uploadImage, { loading, reset }] = useUploadFileMutation()
  const [imageState, setImageState] =
    useState<Option<Either<ErrorState, ImageSuccessState>>>(none)
  const { helpText } = useImageUploadDialogStyles()
  const canSubmit = isValidFile(imageState)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    setImageState(none)
    pipe(files, EgetValidFile, setImageState)
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
    setImageState(none)
    reset()
  }

  const onSubmit = () => {
    const uploadFunction = createImageUploadFunction(
      editor,
      getAccessToken,
      uploadImage,
      imageState,
      setImageState,
      setDialogDisplay,
    )
    uploadFunction()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h3"> Choose an Image to Upload </Typography>
      </DialogTitle>
      <DialogContent>
        <Input
          type="file"
          id="image-upload"
          onChange={onChange}
          fullWidth
          inputProps={{ accept: "image/*" }}
        />
        <Typography className={helpText}>* Must be smaller than 1MB</Typography>
        {renderError(imageState)}
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

export { ImageUploadDialog }
