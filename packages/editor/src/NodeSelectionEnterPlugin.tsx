import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  $isNodeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_BEFORE_EDITOR,
  KEY_ENTER_COMMAND,
} from "lexical"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  filter as Ofilter,
  match as Omatch,
} from "fp-ts/Option"

const handleNodeSelectionEnter = (event: KeyboardEvent | null) => {
  if (event?.shiftKey) return false

  return pipe(
    $getSelection(),
    OfromNullable,
    Ofilter($isNodeSelection),
    Omatch(
      () => false,
      (selection) => {
        const node = selection.getNodes()[0]
        if (!node) return false
        const topLevelElement = node.getTopLevelElement()
        if (!topLevelElement) return false
        const paragraphNode = $createParagraphNode()
        topLevelElement.insertAfter(paragraphNode)
        paragraphNode.select()
        return true
      },
    ),
  )
}

const NodeSelectionEnterPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregister = editor.registerCommand(
      KEY_ENTER_COMMAND,
      handleNodeSelectionEnter,
      COMMAND_PRIORITY_BEFORE_EDITOR,
    )

    return () => {
      unregister()
    }
  }, [editor])

  return <></>
}

export { NodeSelectionEnterPlugin }
