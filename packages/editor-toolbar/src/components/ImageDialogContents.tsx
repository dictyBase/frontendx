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

const ImageDialogContents = () => {
  const [editor] = useLexicalComposerContext()
  const setIsDialogOpen = useSetAtom(insertImageDialogOpenAtom)
  const [url, setUrl] = useState("")
  const [altText, setAltText] = useState("")

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setUrl(value)
  }

  const handleAltTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setAltText(value)
  }

  const handleConfirm = () => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      source: url,
      alt: altText,
      width: 250,
      height: 250,
    })
    setIsDialogOpen(false)
  }

  const handleUseSample = () => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      source: "src/assets/sample.jpg",
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
            <TextField
              fullWidth
              label="Image URL"
              value={url}
              onChange={handleUrlChange}
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
        <Button onClick={handleUseSample}> Insert Sample </Button>
      </CardActions>
      <CardActions>
        <Button onClick={handleConfirm}> Confirm </Button>
      </CardActions>
    </Card>
  )
}

export { ImageDialogContents }
