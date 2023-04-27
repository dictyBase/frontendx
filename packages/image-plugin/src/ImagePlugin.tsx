import { useEffect } from "react"
import {
  COMMAND_PRIORITY_EDITOR,
  DRAGSTART_COMMAND,
  COMMAND_PRIORITY_HIGH,
  DROP_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ImageNode from "./ImageNode"
import { INSERT_IMAGE_COMMAND, InsertImagePayload } from "./InsertImageCommand"
import { onDragStart, onDrop } from "./dragHandlers"
import insertNodeIntoFlexRow from "./InsertImageHelpers"

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    const unregisterInsertImage = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: InsertImagePayload) => {
        const imageNode = new ImageNode(payload)
        insertNodeIntoFlexRow(editor, imageNode, payload.x)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )

    const unregisterDragStart = editor.registerCommand(
      DRAGSTART_COMMAND,
      onDragStart,
      COMMAND_PRIORITY_HIGH,
    )

    const unregisterDrop = editor.registerCommand(
      DROP_COMMAND,
      (event) => onDrop(event, editor),
      COMMAND_PRIORITY_HIGH,
    )

    return () => {
      unregisterInsertImage()
      unregisterDragStart()
      unregisterDrop()
    }
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>
}

export default ImagePlugin
