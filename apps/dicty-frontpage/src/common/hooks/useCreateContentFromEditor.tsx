import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAuthorizedCreateContent } from "./useAuthorizedCreateContent"

type CreateButtonProperties = {
  namespace: string
  name: string
}

const useCreateContentFromEditor = ({
  namespace,
  name,
}: CreateButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const authorizedCreateContent = useAuthorizedCreateContent(namespace, name)

  return async () => {
    const contentValue = JSON.stringify(editor.getEditorState().toJSON())
    return authorizedCreateContent(contentValue)
  }
}

export { useCreateContentFromEditor }
