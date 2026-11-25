import { type ReactElement } from "react"
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { Box, Stack } from "@mui/material"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { ImagePlugin } from "@dictybase/image-plugin"
import { BlockSpacingPlugin, DebugToolbar } from "@dictybase/editor-toolbar"
import { WidthTablePlugin } from "@dictybase/width-table-plugin"
import { TableActionPlugin } from "@dictybase/table-action-plugin"
import { getEditorAreaStyles, editorPlaceholderStyles } from "./useEditorStyles"
import "./editor.css"
import { TreeViewPlugin } from "./TreeViewPlugin"
import { dictyEditorConfig } from "./editorConfig"
import { flexLayoutStateString } from "./initialStates"

type EditorProperties = {
  config: InitialConfigType
  plugins?: Array<ReactElement>
  editable?: boolean
  editorState?: string
}

const DebugEditor = ({
  config = dictyEditorConfig,
  editorState = flexLayoutStateString,
  editable = true,
  plugins,
}: EditorProperties) => (
  <LexicalComposer
    initialConfig={{
      ...config,
      editorState,
      editable,
    }}>
    <>{plugins}</>
    <ListPlugin />
    <LinkPlugin />
    <ImagePlugin />
    <WidthTablePlugin />
    <TableActionPlugin isEditing={editable} />
    <HistoryPlugin />
    <BlockSpacingPlugin />
    <Stack direction="row">
      <Stack spacing={1} flexBasis="70%">
        {pipe(
          editable,
          Bmatch(
            () => <></>,
            () => <DebugToolbar />,
          ),
        )}
        <Box sx={getEditorAreaStyles(editable)}>
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable id="content-editor" />}
            placeholder={
              <Box sx={editorPlaceholderStyles}>Enter some text...</Box>
            }
          />
        </Box>
      </Stack>
      <TreeViewPlugin />
    </Stack>
  </LexicalComposer>
)

export { DebugEditor }
