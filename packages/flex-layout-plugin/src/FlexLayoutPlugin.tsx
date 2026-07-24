import { useEffect } from "react"
import {
  INSERT_PARAGRAPH_COMMAND,
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { InsertFlexLayoutNode, inspectSelection } from "./InsertFlexLayoutNode"

const FlexLayoutPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregisterInsertParagraphCommand = editor.registerCommand(
      INSERT_PARAGRAPH_COMMAND,
      InsertFlexLayoutNode,
      COMMAND_PRIORITY_LOW,
    )
    const unregisterInspect = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      inspectSelection,
      COMMAND_PRIORITY_CRITICAL,
    )
    return () => {
      unregisterInspect()
      unregisterInsertParagraphCommand()
    }
  })

  return <></>
}

export { FlexLayoutPlugin }
