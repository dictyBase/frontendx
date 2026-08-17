import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { LinkNode } from "@lexical/link";
import { ImageNode } from "@dictybase/image-plugin";
import { FlexLayoutNode } from "@dictybase/flex-layout-plugin";
import { DownloadLinkNode } from "@dictybase/editor-toolbar";
import { defaultStateString, flexLayoutStateString, flexLayoutState } from "./initialStates";

const editorTheme = {
  paragraph: "editor-paragraphy",
  flexLayout: "editor-flex-layout",
  image: "editor-image",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
};

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error);
};

const dictyEditorConfig = {
  namespace: "DictyEditor",
  theme: { ...editorTheme },
  nodes: [
    HeadingNode,
    QuoteNode,
    LinkNode,
    DownloadLinkNode,
    ListItemNode,
    ListNode,
    ImageNode,
    FlexLayoutNode,
    TableNode,
    TableRowNode,
    TableCellNode,
  ],
  editorState: flexLayoutStateString,
  onError,
};

const utilityEditorConfig = {
  namespace: "utilityEditor",
  nodes: [
    HeadingNode,
    QuoteNode,
    LinkNode,
    DownloadLinkNode,
    ListItemNode,
    ListNode,
    ImageNode,
    FlexLayoutNode,
  ],
  editorState: flexLayoutState,
  onError,
};
const defaultEditorConfig: InitialConfigType = {
  namespace: "defaultEditor",
  theme: { ...editorTheme },
  nodes: [HeadingNode, QuoteNode, LinkNode, DownloadLinkNode, ListItemNode, ListNode, ImageNode],
  editorState: defaultStateString,
  onError,
};
export { dictyEditorConfig, defaultEditorConfig, utilityEditorConfig };
