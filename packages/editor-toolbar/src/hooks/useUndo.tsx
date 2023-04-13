import { useCallback, useEffect } from "react"
import { CAN_UNDO_COMMAND, UNDO_COMMAND } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useSetAtom } from "jotai"
import { canUndoAtom } from "../context/atomConfigs"

const useUndo = () => {
  const [editor] = useLexicalComposerContext()
  const setCanUndo = useSetAtom(canUndoAtom)

  useEffect(() => {
    const unregisterCanRedoCommand = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload)
        return false
      },
      1,
    )

    return () => {
      unregisterCanRedoCommand()
    }
  }, [editor, setCanUndo])

  return useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined)
  }, [editor])
}

export default useUndo
