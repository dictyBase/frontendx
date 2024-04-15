import { useState, ChangeEvent } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  Button,
  CardHeader,
  Card,
  CardContent,
  TextField,
  CardActions,
  Grid,
} from "@material-ui/core"
import { useSetAtom } from "jotai"
import { INSERT_IMAGE_COMMAND } from "image-plugin"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"

type ImageDialogContentsProperties = {
  handleImageUpload: (file: File) => Promise<string>
}

const ImageDialogContents = ({
  handleImageUpload,
}: ImageDialogContentsProperties) => {
  const [editor] = useLexicalComposerContext()
  const setIsDialogOpen = useSetAtom(insertImageDialogOpenAtom)
  const [altText, setAltText] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()

  const handleAltTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setAltText(value)
  }

  const handleConfirm = async () => {
    if (!selectedFile) return
    const url = await handleImageUpload(selectedFile)
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      source: url,
      alt: altText,
      width: 250,
      height: 250,
    })
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardContent>
        <CardHeader title="Insert Image" />
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <input
              type="file"
              onChange={({ target: { validity, files } }) => {
                if (validity.valid && files && files[0]) {
                  setSelectedFile(files[0])
                }
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Alt Text"
              value={altText}
              onChange={handleAltTextChange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleConfirm}> Confirm </Button>
      </CardActions>
    </Card>
  )
}

export { ImageDialogContents }
