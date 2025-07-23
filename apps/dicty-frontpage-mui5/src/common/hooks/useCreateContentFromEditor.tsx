import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAuthorizedCreateContent } from "./useAuthorizedCreateContent"

const useCreateContentFromEditor = () => {
  const [editor] = useLexicalComposerContext()
  const authorizedCreateContent = useAuthorizedCreateContent()

  return async (namespace: string, slug: string) => {
    const contentValue = JSON.stringify(editor.getEditorState().toJSON())
    return authorizedCreateContent(contentValue, namespace, slug)
  }
}

export { useCreateContentFromEditor }
