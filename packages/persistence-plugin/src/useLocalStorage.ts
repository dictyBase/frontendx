import { LexicalEditor } from "lexical"

export const saveLocalStorage = (editor: LexicalEditor, storageKey: string) => {
  const editorState = editor.getEditorState()
  const editorStateString = JSON.stringify(editorState)
  localStorage.setItem(`DFP-${storageKey}`, editorStateString)
}

export const retrieveLocalStorage = (
  editor: LexicalEditor,
  storageKey: string,
) => {
  const editorString = localStorage.getItem(`DFP-${storageKey}`)
  if (editorString) {
    const editorState = editor.parseEditorState(editorString)
    editor.setEditorState(editorState)
  }
}
