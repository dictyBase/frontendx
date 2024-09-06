/* eslint-disable dot-notation */
import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { Grid } from "@material-ui/core"
import { ImagePlugin } from "@dictybase/image-plugin"
import { WidthTablePlugin } from "@dictybase/width-table-plugin"
import { FlexLayoutPlugin } from "@dictybase/flex-layout-plugin"
import { TableActionPlugin } from "@dictybase/table-action-plugin"
import { DictybaseToolbar } from "@dictybase/editor-toolbar"
import { dictyEditorConfig } from "./editorConfig"
import {
  useEditorAreaStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import { initialStateString } from "./initialState"
import "./editor.css"

type EditorProperties = {
  content?: {
    storageKey: string | undefined
    editorState: InitialEditorStateType
  }
  plugins?: Array<JSX.Element>
  editable?: boolean
  toolbar?: JSX.Element
}

const Editor = ({
  content,
  editable = false,
  toolbar,
  plugins,
}: EditorProperties) => {
  // eslint-disable-next-line unicorn/no-null
  const initialEditorState = content?.editorState || initialStateString || null
  const placeholderClasses = useEditorPlaceholderStyles()
  // const persistencePluginStyles = usePersistencePluginStyles()
  const editorAreaClasses = useEditorAreaStyles({ editable })

  return (
    <LexicalComposer
      initialConfig={{
        ...dictyEditorConfig,
        editorState: initialEditorState,
        editable,
      }}>
      <>{plugins}</>
      <ListPlugin />
      <LinkPlugin />
      <ImagePlugin />
      <FlexLayoutPlugin />
      <WidthTablePlugin />
      <TableActionPlugin />
      <HistoryPlugin />
      {/* {content?.storageKey ? (
        <LocalPersistencePlugin storageKey={content.storageKey} />
      ) : (
        <></>
      )} */}
      <Grid container spacing={1} direction="column">
        {/* <Grid item className={persistencePluginStyles.root}> */}
        {toolbar ? <Grid item>{toolbar}</Grid> : <></>}
        {editable ? (
          <Grid item>
            <DictybaseToolbar />
          </Grid>
        ) : (
          <></>
        )}
        <Grid item>
          <div>
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable className={editorAreaClasses["container"]} />
              }
              placeholder={
                <div className={placeholderClasses.root}>
                  Enter some text...
                </div>
              }
            />
          </div>
        </Grid>
      </Grid>
    </LexicalComposer>
  )
}

export { Editor }
