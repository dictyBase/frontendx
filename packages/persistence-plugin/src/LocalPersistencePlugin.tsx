import { useEffect } from "react"
import { createCommand, COMMAND_PRIORITY_EDITOR } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { saveLocalStorage, retrieveLocalStorage } from "./useLocalStorage"

type LocalStorageCommandPayload = {
  storageKey: string
}

type LocalPersistencePluginProperties = {
  currentStorageKey: string
}

export const SAVE_LOCAL_COMMAND = createCommand<LocalStorageCommandPayload>()
export const RETRIEVE_LOCAL_COMMAND =
  createCommand<LocalStorageCommandPayload>()

const LocalPersistencePlugin = ({
  currentStorageKey,
}: LocalPersistencePluginProperties) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregisterSaveLocal = editor.registerCommand(
      SAVE_LOCAL_COMMAND,
      ({ storageKey }) => {
        saveLocalStorage(editor, storageKey)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
    const unregisterRetrieveLocal = editor.registerCommand(
      RETRIEVE_LOCAL_COMMAND,
      ({ storageKey }) => {
        retrieveLocalStorage(editor, storageKey)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )

    return () => {
      unregisterSaveLocal()
      unregisterRetrieveLocal()
    }
  }, [editor])

  useEffect(() => {
    editor.dispatchCommand(RETRIEVE_LOCAL_COMMAND, {
      storageKey: currentStorageKey,
    })
  }, [currentStorageKey, editor])
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>
}

export default LocalPersistencePlugin
