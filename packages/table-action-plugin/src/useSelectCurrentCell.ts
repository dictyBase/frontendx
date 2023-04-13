import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getTableCellNodeFromLexicalNode } from "@lexical/table"
import { useSetAtom } from "jotai"
import { selectedTableCellNode } from "./atomConfigs"

const useSelectCurrentCell = () => {
  const [editor] = useLexicalComposerContext()
  const setCurrentTableCellNode = useSetAtom(selectedTableCellNode)

  useEffect(() => {
    // register a listener for selection command,
    // if the selection is inside a table cell, get the current table cell node for that cell
    // and store it in state, which is used by TableMenuButton for positioning
    const unregisterUpdateListener = editor.registerUpdateListener(
      // lexical's demo uses registerUpdateListener, maybe that's the right choice, look into later
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection()
          if (!$isRangeSelection(selection)) return
          // lexical also has other non-null checks for other variables, that I don't think are necessary, but I will look closer
          const tableCellNode = $getTableCellNodeFromLexicalNode(
            selection.anchor.getNode(),
          )
          if (!tableCellNode) {
            setCurrentTableCellNode(undefined)
            return
          }

          setCurrentTableCellNode(tableCellNode)
        })
      },
    )

    return () => {
      unregisterUpdateListener()
    }
  }, [editor, setCurrentTableCellNode])
}

export default useSelectCurrentCell
