import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { CapitalizeButton } from "./CapitalizeButton"
import { CapitalizePlugin } from "./CapitalizePlugin"

/**
 * Example Lexical editor that demonstrates the capitalize feature
 */
const ExampleEditor = () => {
  const initialConfig = {
    namespace: "CapitalizeExample",
    theme: {},
    onError: () => {},
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <div className="editor-toolbar">
          <CapitalizeButton />
        </div>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text </div>}
        />
        {/* Register the capitalize plugin */}
        <CapitalizePlugin />
      </div>
    </LexicalComposer>
  )
}

export { ExampleEditor }
