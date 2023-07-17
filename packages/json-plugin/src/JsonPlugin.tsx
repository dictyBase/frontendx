import Button from "@material-ui/core/Button"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { SerializedEditorState, SerializedLexicalNode } from "lexical"

/**
 * The props for {@link JsonPluginProperties} component
 */
type JsonPluginProperties = {
  callback: (json: SerializedEditorState<SerializedLexicalNode>) => void
}

const JsonPlugin = ({ callback }: JsonPluginProperties) => {
  const [editor] = useLexicalComposerContext()
  const onClick = () => {
    callback(editor.getEditorState().toJSON())
  }
  return <Button onClick={onClick}> Save </Button>
}

export { JsonPlugin }
