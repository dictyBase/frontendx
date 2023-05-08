/* eslint-disable react/jsx-no-useless-fragment */
import {
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableRowNode } from "@lexical/table"
import { Grid, Paper, Button, makeStyles } from "@material-ui/core"
import { ImageNode, ImagePlugin } from "image-plugin"
import { LocalPersistencePlugin, SaveButton } from "persistence-plugin"
import { WidthTablePlugin, WidthTableNode } from "width-table-plugin"
import { FlexLayoutNode, FlexLayoutPlugin } from "flex-layout-plugin"
import { TableActionPlugin } from "table-action-plugin"
import Toolbar from "editor-toolbar"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import usePersistencePluginStyles from "./usePersistencePluginStyles"
import "./editor.css"

type EditorProperties = {
  content: { id: string; editorState: InitialEditorStateType }
  editable: boolean
  handleCancelClick?: () => void
  handleSaveClick?: (content: string) => void
}

const usePaperStyles = makeStyles({
  root: {
    position: "relative",
  },
})

const editorTheme = {
  paragraph: "editor-paragraph",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
  table: "editor-table",
  tableCell: "editor-tablecell",
  tableCellHeader: "editor-tablecell-head",
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const initialConfig = {
  namespace: "DictyEditor",
  theme: { ...editorTheme },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    ImageNode,
    TableCellNode,
    TableRowNode,
    WidthTableNode,
    FlexLayoutNode,
  ],
  onError,
}

const Editor = ({
  content,
  editable = false,
  handleCancelClick,
  handleSaveClick,
}: EditorProperties) => {
  // eslint-disable-next-line unicorn/no-null
  const initialEditorState = content?.editorState || null
  const inputClasses = useEditorInputStyles()
  const placeholderClasses = useEditorPlaceholderStyles()
  const persistencePluginStyles = usePersistencePluginStyles()
  const paperClasses = usePaperStyles()

  return (
    <LexicalComposer
      initialConfig={{
        ...initialConfig,
        editorState: initialEditorState,
        editable,
      }}>
      <ListPlugin />
      <ImagePlugin />
      <FlexLayoutPlugin />
      <WidthTablePlugin />
      <TableActionPlugin />
      <LocalPersistencePlugin currentStorageKey={content.id} />
      <Grid container direction="column">
        <Grid item>{editable ? <Toolbar /> : <></>}</Grid>
        <Grid item>
          <Paper className={paperClasses.root}>
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
          </Paper>
        </Grid>
        <Grid item className={persistencePluginStyles.root}>
          {handleSaveClick ? (
            <SaveButton storageKey={content.id} handleSave={handleSaveClick} />
          ) : (
            <></>
          )}
          {handleCancelClick ? (
            <Button variant="contained" onClick={handleCancelClick}>
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
