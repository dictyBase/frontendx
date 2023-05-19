import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { Grid, Container, Button, makeStyles } from "@material-ui/core"
import { ImagePlugin } from "image-plugin"
import { LocalPersistencePlugin, SaveButton } from "persistence-plugin"
import { WidthTablePlugin } from "width-table-plugin"
import { FlexLayoutPlugin } from "flex-layout-plugin"
import { TableActionPlugin } from "table-action-plugin"
import Toolbar from "editor-toolbar"
import dictyEditorConfig from "./editorConfig"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import usePersistencePluginStyles from "./usePersistencePluginStyles"
import "./editor.css"

type EditorProperties = {
  content?: { storageKey: string; editorState: InitialEditorStateType }
  editable: boolean
  handleCancel?: () => void
  handleSave?: (content: string) => void
}

const useEditorAreaStyles = makeStyles({
  root: {
    position: "relative",
  },
})

const Editor = ({
  content,
  editable = false,
  handleCancel,
  handleSave,
}: EditorProperties) => {
  // eslint-disable-next-line unicorn/no-null
  const initialEditorState = content?.editorState || null
  const inputClasses = useEditorInputStyles()
  const placeholderClasses = useEditorPlaceholderStyles()
  const persistencePluginStyles = usePersistencePluginStyles()
  const editorAreaClasses = useEditorAreaStyles()

  return (
    <LexicalComposer
      initialConfig={{
        ...dictyEditorConfig,
        editorState: initialEditorState,
        editable,
      }}>
      <ListPlugin />
      <ImagePlugin />
      <FlexLayoutPlugin />
      <WidthTablePlugin />
      <TableActionPlugin />
      <HistoryPlugin />
      {content?.storageKey ? (
        <LocalPersistencePlugin storageKey={content.storageKey} />
      ) : (
        <></>
      )}
      <Grid container direction="column">
        {editable ? (
          <Grid item>
            <Toolbar />
          </Grid>
        ) : (
          <></>
        )}
        <Grid item>
          <Container disableGutters className={editorAreaClasses.root}>
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable className={inputClasses.root} />
              }
              placeholder={
                <div className={placeholderClasses.root}>
                  Enter some text...
                </div>
              }
            />
          </Container>
        </Grid>
        <Grid item className={persistencePluginStyles.root}>
          {handleSave ? <SaveButton handleSave={handleSave} /> : <></>}
          {handleCancel ? (
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </LexicalComposer>
  )
}

export default Editor
