import { FunctionComponent } from "react"
import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { Grid, Container, Button, makeStyles, Theme } from "@material-ui/core"
import { ImagePlugin } from "image-plugin"
import { SaveButton } from "persistence-plugin"
import { WidthTablePlugin } from "width-table-plugin"
import { FlexLayoutPlugin } from "flex-layout-plugin"
import { TableActionPlugin } from "table-action-plugin"
import { DictybaseToolbar } from "editor-toolbar"
import { TreeViewPlugin } from "./TreeViewPlugin"
import { dictyEditorConfig } from "./editorConfig"
import {
  useEditorInputStyles,
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
}

type EditProperties = {
  editable: true
  toolbar: FunctionComponent<{ children: Array<JSX.Element> }>
  handleCancel: () => void
  handleSave: (content: string) => void
}

type ReadProperties = {
  editable: false
  toolbar?: never
  handleCancel?: never
  handleSave?: never
}

const useEditorAreaStyles = makeStyles<Theme, { editable: boolean }>({
  container: {
    overflowY: ({ editable }) => (editable ? "scroll" : "initial"),
    maxHeight: ({ editable }) => (editable ? "70vh" : "auto"),
  },
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
}:
  | (EditorProperties & ReadProperties)
  | (EditorProperties & EditProperties)) => {
  // eslint-disable-next-line unicorn/no-null
  const initialEditorState = content?.editorState || initialStateString || null
  const inputClasses = useEditorInputStyles()
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
        {handleSave && handleCancel ? (
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
          {/* eslint-disable-next-line dot-notation */}
          <div className={editorAreaClasses["container"]}>
            {/* eslint-disable-next-line dot-notation */}
            <Container disableGutters className={editorAreaClasses["root"]!}>
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
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <TreeViewPlugin />
      </Grid>
    </LexicalComposer>
  )
}

export { Editor }
