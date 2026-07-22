import { useEffect } from "react"
import { INSERT_PARAGRAPH_COMMAND, COMMAND_PRIORITY_LOW } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { InsertFlexLayoutNode } from "./InsertFlexLayoutNode"

const FlexLayoutPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() =>
    editor.registerCommand(
      INSERT_PARAGRAPH_COMMAND,
      InsertFlexLayoutNode,
      COMMAND_PRIORITY_LOW,
    ),
  )

  return <></>
}

export { FlexLayoutPlugin }
