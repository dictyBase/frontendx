import { Button } from "@mui/material"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { INSERT_IMAGE_COMMAND } from "@dictybase/image-plugin"

const InsertImageButton = () => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, { source: "/sample.jpg", width: 500 })
  }
  return (
    <>
      <Button
        title="Insert Image"
        color="inherit"
        variant="text"
        onClick={onClick}
        startIcon={<ImageOutlinedIcon />}
      >
        Image
      </Button>
    </>
  )
}

export { InsertImageButton }
