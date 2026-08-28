import { useEffect } from "react"
import { COMMAND_PRIORITY_EDITOR, $getRoot } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { BasicImageNode } from "./BasicImageNode"
import {
  INSERT_BASIC_IMAGE_COMMAND,
  InsertBasicImagePayload,
} from "./InsertImageCommand"
import { getTopLevelElementFromSelection } from "./InsertImageHelpers"

const BasicImagePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([BasicImageNode])) {
      throw new Error("ImagesPlugin: BasicImageNode not registered on editor")
    }
    // Image insertion handler
    const unregisterInsertImage = editor.registerCommand(
      INSERT_BASIC_IMAGE_COMMAND,
      (payload: InsertBasicImagePayload) => {
        const imageNode = new BasicImageNode(payload)
        const topLevelNode = getTopLevelElementFromSelection()
        return pipe(
          topLevelNode,
          OfromNullable,
          Omap((someNode) => {
            someNode.insertAfter(imageNode)
            return true
          }),
          OgetOrElse(() => {
            $getRoot().append(imageNode)
            return true
          }),
        )
      },
      COMMAND_PRIORITY_EDITOR,
    )

    // Image hlick handler

    // <Enter> key press handler
    return () => {
      unregisterInsertImage()
    }
  })

  return <></>
}

export { BasicImagePlugin }
