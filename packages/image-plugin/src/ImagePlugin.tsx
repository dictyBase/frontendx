import { useEffect } from "react"
import {
  $getRoot,
  COMMAND_PRIORITY_EDITOR,
  DRAGSTART_COMMAND,
  COMMAND_PRIORITY_HIGH,
  DROP_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
  filter as Ofilter,
  match as Omatch,
} from "fp-ts/Option"
import { ImageNode } from "./ImageNode"
import { INSERT_IMAGE_COMMAND, InsertImagePayload } from "./InsertImageCommand"
import { onDragStart, onDrop } from "./dragHandlers"
import { getTopLevelElementFromSelection } from "./InsertImageHelpers"
import { $isFlexLayoutNode } from "@dictybase/flex-layout-plugin"

// If the currentSelection is an ImageNode, insert a paragraph
const onInsertImage = (payload: InsertImagePayload) => {
  const imageNode = new ImageNode(payload)
  const topLevelNode = getTopLevelElementFromSelection()
  return pipe(
    topLevelNode,
    OfromNullable,
    Omap((someNode) => {
      someNode.insertAfter(imageNode)
      return true
    }),
    OgetOrElse(() => {
      // get the flex layout node and append it, else do nothing.
      return pipe(
        $getRoot().getFirstChild(),
        OfromNullable,
        Ofilter($isFlexLayoutNode),
        Omatch(
          () => false,
          (flexLayoutNode) => {
            flexLayoutNode.append(imageNode)
            return true
          },
        ),
      )
    }),
  )
}

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    const unregisterInsertImage = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      onInsertImage,
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

  return <></>
}

export { ImagePlugin, onInsertImage }
