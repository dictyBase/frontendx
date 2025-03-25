import { useEffect } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { CAPITALIZE_SELECTION_COMMAND } from "./capitalizeCommand"
import { $capitalizeSelection } from "./$capitalizeSelection"

/**
 * A React hook that registers a command to capitalize selected text
 */
const CapitalizePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      // Register the command listener
      editor.registerCommand(
        CAPITALIZE_SELECTION_COMMAND,
        () => {
          // Get the current selection
          const selection = $getSelection()

          // Only process if we have a range selection (text is selected)
          if (!$isRangeSelection(selection)) {
            return false
          }

          $capitalizeSelection(selection)
          return true
        },
        // Set priority (lower number = higher priority)
        1,
      ),
    [editor],
  )

  return <></>
}

export { CapitalizePlugin }
