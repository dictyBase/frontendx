import { createEditor } from "lexical"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import type { InitialConfigType } from "@lexical/react/LexicalComposer"
import FlexLayoutNode from "./FlexLayoutNode"

const initialEditorStateString =
  '{"root":{"children":[{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"flex-layout","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

const getInitialEditorState = () =>
  createEditor({ nodes: [FlexLayoutNode] }).parseEditorState(
    initialEditorStateString,
  )

type LexicalComposerFlexProperties = {
  initialConfig: InitialConfigType
  children: JSX.Element | string | (JSX.Element | string)[]
}

const LexicalComposerFlex = ({
  initialConfig,
  children,
}: LexicalComposerFlexProperties) => {
  let { editorState } = initialConfig
  editorState = editorState || getInitialEditorState()

  return (
    <LexicalComposer initialConfig={{ ...initialConfig, editorState }}>
      {children}
    </LexicalComposer>
  )
}

export default LexicalComposerFlex
