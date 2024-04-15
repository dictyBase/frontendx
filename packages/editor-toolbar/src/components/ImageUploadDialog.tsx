import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core"
import { useState } from "react"
import { useSetAtom } from "jotai"
import { INSERT_IMAGE_COMMAND } from "image-plugin"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"

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
  const [imageSource, setImageSource] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { validity, files },
  }) => {
    if (!validity.valid || !files || !files[0]) return
    setLoading(true)
    try {
      const url = await handleImageUpload(files[0])
      setImageSource(url)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const onClick = () => {
    if (!imageSource) return
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      source: imageSource,
      width: 300,
      height: 300,
    })
    setDialogDisplay(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        setDialogDisplay(false)
      }}>
      <DialogTitle> Choose an Image to Upload </DialogTitle>
      <DialogContent>
        <input type="file" id="image-upload" onChange={onChange} />
        <DialogActions>
          {loading ? <CircularProgress /> : <></>}
          {console.log(!!imageSource)}
          <Button type="button" disabled={!imageSource} onClick={onClick}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export { ImageUploadDialog }
