import { $getSelection, $createTextNode } from "lexical"
import { Button } from "@mui/material"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createDownloadLinkNode } from "../DownloadLinkNode"

const InsertSampleDownloadLinkButton = () => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
    editor.update(() => {
      const selection = $getSelection()
      const linkNode = $createDownloadLinkNode("/sample.jpg", {
        download: "suggested-name.jpg",
      })
      const textNode = $createTextNode("Click to Download")
      linkNode.append(textNode)
      selection?.insertNodes([linkNode])
    })
  }
  return (
    <>
      <Button
        title="Insert DownloadLink"
        color="inherit"
        variant="text"
        onClick={onClick}
        startIcon={<AttachFileIcon />}>
        Sample DownloadLink
      </Button>
    </>
  )
}

export { InsertSampleDownloadLinkButton }
