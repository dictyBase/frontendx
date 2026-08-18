import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { Stack } from "@mui/material";
import { pipe } from "fp-ts/function";
import { match as Bmatch } from "fp-ts/boolean";
import { getOrElse as OgetOrElse, fromNullable as OfromNullable } from "fp-ts/Option";
import { ImagePlugin } from "@dictybase/image-plugin";
import { DictybaseToolbar } from "@dictybase/editor-toolbar";
import { useEditorAreaStyles, useEditorPlaceholderStyles } from "./useEditorStyles";
import "./editor.css";
import { FlexLayoutPlugin } from "@dictybase/flex-layout-plugin";
import { WidthTablePlugin } from "@dictybase/width-table-plugin";
import { TableActionPlugin } from "@dictybase/table-action-plugin";
import { TreeViewPlugin } from "./TreeViewPlugin";
import { dictyEditorConfig } from "./editorConfig";

type EditorProperties = {
  config: InitialConfigType;
  plugins?: Array<JSX.Element>;
  editable?: boolean;
  toolbar?: JSX.Element;
};

const Editor = ({
  config = dictyEditorConfig,
  editable = false,
  toolbar,
  plugins,
}: EditorProperties) => {
  const { classes: placeholderClasses } = useEditorPlaceholderStyles();
  const { classes: editorAreaClasses } = useEditorAreaStyles({ editable });

  return (
    <LexicalComposer
      initialConfig={{
        ...config,
        editable,
      }}
    >
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
      <Stack direction="row">
        <Stack spacing={1} flexBasis="70%">
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
                <ContentEditable id="content-editor" className={editorAreaClasses.container} />
              }
              placeholder={<div className={placeholderClasses.root}>Enter some text...</div>}
            />
          </div>
        </Stack>
        <TreeViewPlugin />
      </Stack>
    </LexicalComposer>
  );
};

export { Editor };
