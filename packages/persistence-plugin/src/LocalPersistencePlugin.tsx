import { useEffect } from "react"
import { createCommand, COMMAND_PRIORITY_EDITOR } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { saveLocalStorage, retrieveLocalStorage } from "./useLocalStorage"

type LocalPersistencePluginProperties = {
  storageKey: string
}

export const SAVE_LOCAL_COMMAND = createCommand()
export const RETRIEVE_LOCAL_COMMAND = createCommand()

const LocalPersistencePlugin = ({
  storageKey,
}: LocalPersistencePluginProperties) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregisterSaveLocal = editor.registerCommand(
      SAVE_LOCAL_COMMAND,
      () => {
        saveLocalStorage(editor, storageKey)
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

export default LocalPersistencePlugin
