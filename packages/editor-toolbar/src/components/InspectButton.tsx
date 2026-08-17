import { Button } from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const InspectButton = () => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
    navigator.clipboard.writeText(JSON.stringify(editor.getEditorState()))
  }
  return (
    <>
      <Button
        title="Copy State"
        color="inherit"
        variant="text"
        onClick={onClick}
        startIcon={<FileDownloadIcon />}
      >
        Copy State
      </Button>
    </>
  )
}

export { InspectButton }
