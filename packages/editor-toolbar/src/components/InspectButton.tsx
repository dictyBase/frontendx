import { $getSelection } from "lexical"
import { Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const InspectButton = () => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
    editor.read(() => {
      // eslint-disable-next-line no-console
      console.log($getSelection())
    })
  }
  return (
    <>
      <Button
        title="Copy State"
        color="inherit"
        variant="text"
        onClick={onClick}
        startIcon={<SearchIcon />}
      >
        Inspect
      </Button>
    </>
  )
}

export { InspectButton }
