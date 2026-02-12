import { EditorState } from "lexical"
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
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { Stack } from "@mui/material"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  getOrElse as OgetOrElse,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"
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
import { TreeViewPlugin } from "./TreeViewPlugin"
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
  handleChange?: (editorState: EditorState) => void
}

const Editor = ({
  content,
  editable = false,
  toolbar,
  plugins,
  handleChange,
}: EditorProperties) => {
  const initialEditorState = pipe(
    content,
    OfromNullable,
    Omap(({ editorState }) => editorState),
    OgetOrElse(() => initialStateString as InitialEditorStateType),
  )
  const { classes: placeholderClasses } = useEditorPlaceholderStyles()
  const { classes: editorAreaClasses } = useEditorAreaStyles({ editable })

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
      <TableActionPlugin isEditing={editable} />
      <HistoryPlugin />
      {pipe(
        toolbar,
        OfromNullable,
        OgetOrElse(() => <></>),
      )}
      <Stack spacing={1}>
        {pipe(
          handleChange,
          OfromNullable,
          Omap((handler) => (
            <OnChangePlugin ignoreSelectionChange onChange={handler} />
          )),
          OgetOrElse(() => <></>),
        )}
        {pipe(
          editable,
          Bmatch(
            () => <></>,
            () => <DictybaseToolbar />,
          ),
        )}
        <div>
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={
              <ContentEditable
                id="content-editor"
                className={editorAreaClasses.container}
              />
            }
            placeholder={
              <div className={placeholderClasses.root}>Enter some text...</div>
            }
          />
        </div>
      </Stack>
      <TreeViewPlugin />
    </LexicalComposer>
  )
}

export { Editor }
