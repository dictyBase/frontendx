import { EditorState } from "lexical"
import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { Stack } from "@mui/material"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  getOrElse as OgetOrElse,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"
import { ImagePlugin } from "@dictybase/image-plugin"
import { DictybaseToolbar } from "@dictybase/editor-toolbar"
import {
  useEditorAreaStyles,
  useEditorPlaceholderStyles,
} from "./useEditorStyles"
import "./editor.css"
import { WidthTablePlugin } from "@dictybase/width-table-plugin"
import { TableActionPlugin } from "@dictybase/table-action-plugin"
import { dictyEditorConfig } from "./editorConfig"
import { flexLayoutStateString } from "./initialStates"

type EditorProperties = {
  config?: InitialConfigType
  initialState?: InitialEditorStateType
  plugins?: Array<JSX.Element>
  editable?: boolean
  toolbar?: JSX.Element
  handleChange?: (editorState: EditorState) => void
}

const Editor = ({
  config = dictyEditorConfig,
  initialState = flexLayoutStateString,
  editable = false,
  toolbar,
  plugins,
  handleChange,
}: EditorProperties) => {
  const { classes: placeholderClasses } = useEditorPlaceholderStyles()
  const { classes: editorAreaClasses } = useEditorAreaStyles({ editable })

  return (
    <LexicalComposer
      initialConfig={{
        ...config,
        editorState: initialState,
        editable,
      }}>
      <>{plugins}</>
      <ListPlugin />
      <LinkPlugin />
      <ImagePlugin />
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
        <div style={{ position: "relative" }}>
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
    </LexicalComposer>
  )
}

export { Editor }
