import { useEffect } from "react"
import {
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
  orElse as OorElse,
  map as Omap,
} from "fp-ts/Option"
import { match } from "ts-pattern"
import { ImageNode } from "./ImageNode"
import { INSERT_IMAGE_COMMAND, InsertImagePayload } from "./InsertImageCommand"
import { onDragStart, onDrop } from "./dragHandlers"
import {
  getParagraphNodeFromSelection,
  getFlexLayoutNodeFromSelection,
} from "./InsertImageHelpers"

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
        const paragraphNode = getParagraphNodeFromSelection()
        return pipe(
          paragraphNode,
          OfromNullable,
          Omap((someParagraphNode) => {
            match(payload.alignment)
              .with("left", () => someParagraphNode.insertBefore(imageNode))
              .with("right", () => someParagraphNode.insertAfter(imageNode))
              .otherwise(() => someParagraphNode.insertBefore(imageNode))
            return true
          }),
          OorElse(() => {
            const flexParagraph = getFlexLayoutNodeFromSelection()
            return pipe(
              flexParagraph,
              OfromNullable,
              Omap((someFlexParagraph) => {
                someFlexParagraph.append(imageNode)
                return true
              }),
            )
          }),
          OgetOrElse(() => false),
        )
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

  return <></>
}

export { ImagePlugin }
