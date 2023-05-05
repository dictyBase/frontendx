import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

// if data exists in persistence plugin, get persistence plugin data
//
const useLocalStorage = (storageKey: string | undefined) => {
  const [editor] = useLexicalComposerContext()

  const saveLocalStorage = useCallback(() => {
    if (!storageKey) return
    const editorState = editor.getEditorState()
    const editorStateString = JSON.stringify(editorState)
    localStorage.setItem(`DFP-${storageKey}`, editorStateString)
  }, [editor, storageKey])

  const retrieveLocalStorage = useCallback(() => {
    if (!storageKey) return
    const editorString = localStorage.getItem(`DFP-${storageKey}`)
    if (editorString) {
      const editorState = editor.parseEditorState(editorString)
      editor.setEditorState(editorState)
    }
  }, [editor, storageKey])

  return { saveLocalStorage, retrieveLocalStorage }
}

export default useLocalStorage
