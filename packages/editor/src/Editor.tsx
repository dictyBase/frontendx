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
import { SaveButton } from "persistence-plugin"
import { WidthTablePlugin } from "width-table-plugin"
import { FlexLayoutPlugin } from "flex-layout-plugin"
import { TableActionPlugin } from "table-action-plugin"
import { DictybaseToolbar } from "editor-toolbar"
import { dictyEditorConfig } from "./editorConfig"
import { FunctionComponent } from "react"
// import { WithEditor } from "./WithEditor"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import { usePersistencePluginStyles } from "./usePersistencePluginStyles"
import { initialStateString } from "./initialState"
import "./editor.css"

type EditorProperties = {
  content?: {
    storageKey: string | undefined
    editorState: InitialEditorStateType
  }
  editable: boolean
  handleCancel?: () => void
  handleSave?: (content: string) => void
  toolbar?: FunctionComponent<{ children: Array<JSX.Element> }>
  plugins?: Array<JSX.Element>
}

const useEditorAreaStyles = makeStyles({
  root: {
    position: "relative",
  },
})

const Editor = ({
  content,
  editable = false,
  toolbar: Toolbar,
  handleCancel,
  handleSave,
  plugins,
}: EditorProperties) => {
  // eslint-disable-next-line unicorn/no-null
  const initialEditorState = content?.editorState || initialStateString || null
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
      <>{plugins}</>
      <ListPlugin />
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
      <Grid container direction="column">
        {/* <Grid item className={persistencePluginStyles.root}> */}
        {Toolbar && handleSave && handleCancel ? (
          <Toolbar>
            <SaveButton handleSave={handleSave} />
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Toolbar>
        ) : (
          <></>
        )}
        {/* </Grid> */}
        {editable ? (
          <Grid item>
            <DictybaseToolbar />
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
      </Grid>
    </LexicalComposer>
  )
}

export { Editor }
