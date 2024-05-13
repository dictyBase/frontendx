import { IconButton } from "@material-ui/core"
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import { $createLinkNode, toggleLink, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isTextNode } from "lexical"

const InsertLinkButton = () => {
  const [editor] = useLexicalComposerContext()

  const onClick = () => {
    editor.update(() => {
      const selection = $getSelection()
      const selectionNodes = selection.getNodes()
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
      toggleLink("test")
      console.log(selection)
      console.log(selectionNodes)
    }) 

  }

  return <IconButton onClick={onClick}><InsertLinkIcon /></IconButton>
}

export { InsertLinkButton }
