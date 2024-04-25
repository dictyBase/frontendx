import { ParagraphNode } from "lexical"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableRowNode } from "@lexical/table"
import { LinkNode } from "@lexical/link"
import { ImageNode } from "image-plugin"
import { WidthTableNode } from "width-table-plugin"
import { FlexParagraphNode } from "./FlexParagraphNode"

const editorTheme = {
  paragraph: "editor-paragraph",
  text: {
    base: "editor-text-base",
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
  table: "editor-table",
  tableCell: "editor-tablecell",
  tableCellHeader: "editor-tablecell-head",
  flexLayout: "editor-flex-layout",
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
    FlexParagraphNode,
    { replace: ParagraphNode, with: () => new FlexParagraphNode() },
  ],
  onError,
}

export { dictyEditorConfig }
