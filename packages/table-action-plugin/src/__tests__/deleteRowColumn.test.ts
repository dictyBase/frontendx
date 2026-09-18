import { describe, test, expect, beforeEach } from "vitest"
import { LexicalEditor, $getRoot, createEditor } from "lexical"
import {
  TableNode,
  TableRowNode,
  TableCellNode,
  $createTableNodeWithDimensions,
  $getTableColumnIndexFromTableCellNode,
} from "@lexical/table"
import { deleteRow, deleteColumn } from "../tableActions"

const testConfig = {
  namespace: "testEditor",
  theme: {},
}

let testEditor: LexicalEditor
let tableNode: TableNode
let targetTableCell: TableCellNode

beforeEach(() => {
  testEditor = createEditor({
    ...testConfig,
    nodes: [TableNode, TableRowNode, TableCellNode],
  })
  testEditor.setRootElement(document.createElement("div"))
  testEditor.update(() => {
    tableNode = $createTableNodeWithDimensions(5, 5)
    $getRoot().append(tableNode)
    const targetTableRow = tableNode.getFirstChild() as TableRowNode
    targetTableCell = targetTableRow.getFirstChild() as TableCellNode
  })
})

describe("deleteRow", () => {
  test("removes the row containing the target table cell", () => {
    let initialRowCount: number | undefined
    let finalRowCount: number | undefined

    testEditor.getEditorState().read(() => {
      initialRowCount = tableNode.getChildrenSize()
    })

    deleteRow(testEditor, targetTableCell.getKey())

    testEditor.update(() => {
      finalRowCount = tableNode.getChildrenSize()
    })

    expect(finalRowCount).toBe((initialRowCount as number) - 1)
  })

  test("does not remove other rows when deleting the first row", () => {
    let initialRowCount: number | undefined
    let finalRowCount: number | undefined

    testEditor.getEditorState().read(() => {
      initialRowCount = tableNode.getChildrenSize()
    })

    deleteRow(testEditor, targetTableCell.getKey())

    testEditor.update(() => {
      finalRowCount = tableNode.getChildrenSize()
    })

    expect(finalRowCount).toBe((initialRowCount as number) - 1)
    expect(finalRowCount).toBe(4)
  })
})

describe("deleteColumn", () => {
  test("removes the column containing the target table cell from all rows", () => {
    let initialCellCount: number | undefined
    let finalCellCount: number | undefined

    testEditor.getEditorState().read(() => {
      const firstRow = tableNode.getFirstChild() as TableRowNode
      initialCellCount = firstRow.getChildrenSize()
    })

    deleteColumn(testEditor, targetTableCell.getKey())

    testEditor.update(() => {
      const firstRow = tableNode.getFirstChild() as TableRowNode
      finalCellCount = firstRow.getChildrenSize()
    })

    expect(finalCellCount).toBe((initialCellCount as number) - 1)
  })

  test("deletes the first column when target is the first cell", () => {
    let initialColumnIndex: number | undefined
    let finalCellCount: number | undefined

    testEditor.getEditorState().read(() => {
      initialColumnIndex =
        $getTableColumnIndexFromTableCellNode(targetTableCell)
    })

    expect(initialColumnIndex).toBe(0)

    deleteColumn(testEditor, targetTableCell.getKey())

    testEditor.update(() => {
      const firstRow = tableNode.getFirstChild() as TableRowNode
      finalCellCount = firstRow.getChildrenSize()
    })

    // After deleting one column from a 5-column table, 4 columns remain
    expect(finalCellCount).toBe(4)
  })
})
