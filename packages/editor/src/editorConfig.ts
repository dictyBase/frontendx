import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableRowNode } from "@lexical/table"
import { LinkNode } from "@lexical/link"
import { ImageNode } from "@dictybase/image-plugin"
import { WidthTableNode } from "@dictybase/width-table-plugin"
import { FlexLayoutNode } from "@dictybase/flex-layout-plugin"

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

const dictyEditorConfig = {
  namespace: "DictyEditor",
  theme: { ...editorTheme },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    LinkNode,
    ImageNode,
    TableCellNode,
    TableRowNode,
    WidthTableNode,
    FlexLayoutNode,
  ],
  onError,
}

export { dictyEditorConfig }
