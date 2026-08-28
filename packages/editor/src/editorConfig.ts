import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableRowNode } from "@lexical/table"
import { LinkNode } from "@lexical/link"
import { ImageNode } from "@dictybase/image-plugin"
import { FlexLayoutNode } from "@dictybase/flex-layout-plugin"
import { DownloadLinkNode } from "@dictybase/editor-toolbar"
import { WidthTableNode } from "@dictybase/width-table-plugin"
import { flexLayoutStateString, flexLayoutState } from "./initialStates"

const editorTheme = {
  paragraph: "editor-paragraphy",
  flexLayout: "editor-flex-layout",
  image: "editor-image",
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
    WidthTableNode,
    TableRowNode,
    TableCellNode,
  ],
  onError,
}

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
    WidthTableNode,
    TableRowNode,
    TableCellNode,
  ],
  editorState: flexLayoutState,
  onError,
}

export { dictyEditorConfig, utilityEditorConfig }
