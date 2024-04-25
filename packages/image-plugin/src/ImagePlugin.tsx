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
  match as Omatch,
  map as Omap,
  bindTo as ObindTo,
  bind as Obind,
  let as Olet,
} from "fp-ts/Option"
import { match } from "ts-pattern"
import { ImageNode } from "./ImageNode"
import { INSERT_IMAGE_COMMAND, InsertImagePayload } from "./InsertImageCommand"
import { onDragStart, onDrop } from "./dragHandlers"
import {
  getTextNodeFromSelection,
  getFlexParagraphNodeFromSelection,
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
        console.log(payload)
        const imageNode = new ImageNode(payload)
        const textNode = getTextNodeFromSelection()
        return pipe(
          textNode,
          OfromNullable,
          Omap((someTextNode) => {
            match(payload.alignment)
              .with("left", () => someTextNode.insertBefore(imageNode))
              .with("right", () => someTextNode.insertAfter(imageNode))
              .otherwise(() => someTextNode.insertBefore(imageNode))
            return true
          }),
          OorElse(() => {
            const OflexParagraph = getFlexParagraphNodeFromSelection()
            return pipe(
              OflexParagraph,
              Omap((someFlexParagraph) => {
                someFlexParagraph.append(imageNode)
                return true
              }),
            )
          }),
          OgetOrElse(() => {
            return false
          }),
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
