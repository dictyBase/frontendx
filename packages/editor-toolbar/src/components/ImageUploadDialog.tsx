import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Input,
  makeStyles,
} from "@material-ui/core"
import { useState } from "react"
import { useSetAtom } from "jotai"
import { pipe } from "fp-ts/function"
import {
  Option,
  some,
  none,
  isSome,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match } from "ts-pattern"
import { INSERT_IMAGE_COMMAND } from "image-plugin"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"

type fileError = {
  errorMessage: string
}

const useStyles = makeStyles({ input: { display: "flex" } })

const validateFile = (file: File) =>
  match(file)
    .when(
      ({ size }) => size > 500_000,
      () =>
        some({
          errorMessage:
            "The chosen image is too large. It must be smaller than 0.5MB",
        }),
    )
    .otherwise(() => none)

type ImageUploadDialogProperties = {
  handleImageUpload: (file: File) => Promise<string>
  open: boolean
}

const ImageUploadDialog = ({
  handleImageUpload,
  open,
}: ImageUploadDialogProperties) => {
  const [editor] = useLexicalComposerContext()
  const setDialogDisplay = useSetAtom(insertImageDialogOpenAtom)
  const [imageSource, setImageSource] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Option<fileError>>(none)
  const { input } = useStyles()

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { validity, files },
  }) => {
    if (!validity.valid || !files || !files[0]) {
      return
    }
    setImageSource("")
    setError(none)
    const otherValidationErrors = validateFile(files[0])
    if (isSome(otherValidationErrors)) {
      setError(otherValidationErrors)
      return
    }
    setLoading(true)
    try {
      const url = await handleImageUpload(files[0])
      setImageSource(url)
    } catch {
      setError(some({ errorMessage: "Could not upload image to the server" }))
    } finally {
      setLoading(false)
    }
  }
  const handleClose = () => {
    if (loading) return
    setImageSource("")
    setError(none)
    setDialogDisplay(false)
  }

  const onClick = () => {
    if (!imageSource) return
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      source: imageSource,
      width: 300,
      height: 300,
    })
    handleClose()
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
          className={input}
          inputProps={{ accept: "image/*" }}
        />
        <DialogActions>
          {pipe(
            error,
            Omap(({ errorMessage }) => (
              <Typography color="error">{errorMessage}</Typography>
            )),
            OgetOrElse(() => <></>),
          )}
          {loading ? <CircularProgress /> : <></>}
          <Button type="button" disabled={!imageSource} onClick={onClick}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export { ImageUploadDialog }
