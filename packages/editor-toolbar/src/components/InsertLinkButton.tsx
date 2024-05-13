import { IconButton } from "@material-ui/core"
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import { $createLinkNode, toggleLink, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isTextNode } from "lexical"
import { useAtom } from "jotai"
import { match } from "ts-pattern"
import { isLinkAtom } from "../context/atomConfigs"
import { useActiveClass } from "../hooks/useActiveClass"

const InsertLinkButton = () => {
  const [editor] = useLexicalComposerContext()
  const [isLink, setIsLink] = useAtom(isLinkAtom)
  const isActive = useActiveClass(isLinkAtom)

  const onClick = () => {
    editor.update(() => {
      match(isLink)
        .with(true, () => {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
        })
        .with(false, () => {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, "")
        })
        .exhaustive()
    }) 

  }

  return <IconButton className={isActive} onClick={onClick}><InsertLinkIcon /></IconButton>
}

export { InsertLinkButton }
