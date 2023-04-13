import { useCallback, useEffect } from "react"
import { CAN_REDO_COMMAND, REDO_COMMAND } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useSetAtom } from "jotai"
import { canRedoAtom } from "../context/atomConfigs"

const useRedo = () => {
  const [editor] = useLexicalComposerContext()
  const setCanRedo = useSetAtom(canRedoAtom)

  useEffect(() => {
    const unregisterCanRedoCommand = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload)
        return false
      },
      1,
    )

    return () => {
      unregisterCanRedoCommand()
    }
  }, [editor, setCanRedo])

  return useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined)
  }, [editor])
}

export default useRedo
