import { TreeView } from "@lexical/react/LexicalTreeView"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const TreeViewPlugin = () => {
  const [editor] = useLexicalComposerContext()
  // @ts-ignore
  return <TreeView editor={editor} />
}

export { TreeViewPlugin }
