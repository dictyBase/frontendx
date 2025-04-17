import { useEffect } from "react"
import { createCommand, COMMAND_PRIORITY_EDITOR } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { initializeStorage } from "./initializeStorage"
import { CONTENT_DRAFT_PREFIX } from "./namespace"

export const SAVE_LOCAL_COMMAND = createCommand()
export const RETRIEVE_LOCAL_COMMAND = createCommand()

const DraftPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const storage = initializeStorage()

  useEffect(() => {
    const unregisterSaveLocal = editor.registerCommand(
      SAVE_LOCAL_COMMAND,
      () => {
        storage.setItem()
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
    retrieveLocalStorage(editor, storageKey)
    return () => {
      unregisterSaveLocal()
    }
  }, [editor, storageKey])

  return <></>
}

export { DraftPlugin }
