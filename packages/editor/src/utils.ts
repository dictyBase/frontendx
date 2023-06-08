import { createEditor, $getRoot } from "lexical"

import dictyEditorConfig from "./editorConfig"

export const utilityEditor = createEditor(dictyEditorConfig)

export const parseContentToText = (jsonString: string) => {
  let contentText = ""
  utilityEditor.parseEditorState(jsonString).read(() => {
    contentText = $getRoot().getTextContent()
  })
  return contentText
}
