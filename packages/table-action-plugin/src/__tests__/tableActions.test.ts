import { describe, test, expect, beforeEach } from "vitest"
import { LexicalEditor, $getRoot, createEditor, NodeKey } from "lexical"
import {
  TableNode,
  TableRowNode,
  TableCellNode,
  $createTableNodeWithDimensions,
  $getTableRowNodeFromTableCellNodeOrThrow,
  $getTableColumnIndexFromTableCellNode,
} from "@lexical/table"
import { deleteTable, insertRow, insertColumn } from "../tableActions"

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

describe("deleteTable", () => {
  let isTableAttached: boolean | undefined
  test("Given a TableCellNode, the function will remove the given cell from the table", () => {
    testEditor.getEditorState().read(() => {
      isTableAttached = tableNode.isAttached()
    })
    expect(isTableAttached).toBeDefined()
    expect(isTableAttached).toBeTruthy()

    deleteTable(testEditor, targetTableCell)

    testEditor.update(() => {
      isTableAttached = tableNode.isAttached()
    })
    expect(isTableAttached).toBeDefined()
    expect(isTableAttached).toBeFalsy()
  })
})

describe("insertRow", () => {
  test("if insertAfter is true, the function will create a new row below the given table cell's row", () => {
    let initialRowCount: unknown
    let finalRowCount
    let initialTargetRowIndex: unknown
    let finalTargetRowIndex: unknown
    let targetRowKey: NodeKey
    let newRowIndex
    let initialRowKeyArray: NodeKey[]
    let finalRowKeyArray

    testEditor.getEditorState().read(() => {
      initialRowCount = tableNode.getChildrenSize()
      const tableRows = tableNode.getChildren()
      initialRowKeyArray = tableRows.map((row) => row.getKey())
      targetRowKey =
        $getTableRowNodeFromTableCellNodeOrThrow(targetTableCell).getKey()
      initialTargetRowIndex = initialRowKeyArray.indexOf(targetRowKey)
    })

    insertRow(testEditor, targetTableCell, { insertAfter: true })

    testEditor.update(() => {
      finalRowCount = tableNode.getChildrenSize()
      const tableRows = tableNode.getChildren()
      finalRowKeyArray = tableRows.map((row) => row.getKey())
      const newRowKey = finalRowKeyArray.find(
        (key) => !initialRowKeyArray.includes(key),
      )
      newRowIndex = newRowKey ? finalRowKeyArray.indexOf(newRowKey) : undefined
      finalTargetRowIndex = finalRowKeyArray.indexOf(targetRowKey)
    })
    expect(finalRowCount).toEqual((initialRowCount as number) + 1)
    expect(newRowIndex).toEqual((initialTargetRowIndex as number) + 1)
    expect(finalTargetRowIndex).toEqual(initialTargetRowIndex)
  })

  test("if insertAfter is false, the function will create a new row above the given table cell's row", () => {
    let initialRowCount: unknown
    let finalRowCount
    let initialTargetRowIndex: unknown
    let finalTargetRowIndex: unknown
    let targetRowKey: NodeKey
    let newRowIndex
    let initialRowKeyArray: NodeKey[]
    let finalRowKeyArray

    testEditor.getEditorState().read(() => {
      initialRowCount = tableNode.getChildrenSize()
      const tableRows = tableNode.getChildren()
      initialRowKeyArray = tableRows.map((row) => row.getKey())
      targetRowKey =
        $getTableRowNodeFromTableCellNodeOrThrow(targetTableCell).getKey()
      initialTargetRowIndex = initialRowKeyArray.indexOf(targetRowKey)
    })

    insertRow(testEditor, targetTableCell, { insertAfter: false })

    testEditor.update(() => {
      finalRowCount = tableNode.getChildrenSize()
      const tableRows = tableNode.getChildren()
      finalRowKeyArray = tableRows.map((row) => row.getKey())
      const newRowKey = finalRowKeyArray.find(
        (key) => !initialRowKeyArray.includes(key),
      )
      newRowIndex = newRowKey ? finalRowKeyArray.indexOf(newRowKey) : undefined
      finalTargetRowIndex = finalRowKeyArray.indexOf(targetRowKey)
    })
    expect(finalRowCount).toEqual((initialRowCount as number) + 1)
    expect(newRowIndex).toEqual(initialTargetRowIndex)
    expect(finalTargetRowIndex).toEqual((initialTargetRowIndex as number) + 1)
  })
})

describe("insertColumn", () => {
  test.todo(
    "if insertAfter is false, the function will create a column before the given table cell's column",
    () => {
      let initialRowLengths: unknown
      let finalRowLengths: unknown
      let initialtargetColumnIndex
      let newColumnCellIndex

      testEditor.getEditorState().read(() => {
        initialtargetColumnIndex =
          $getTableColumnIndexFromTableCellNode(targetTableCell)

        initialRowLengths =
          $getTableRowNodeFromTableCellNodeOrThrow(
            targetTableCell,
          ).getChildrenSize()
      })

      insertColumn(testEditor, targetTableCell, { insertAfter: false })

      // testEditor.update(() => {
      //   const tableCellKeyArray = tableNode
      //     .getChildren()
      //     .map((row) =>
      //       row.getChildren().map((cell: TableCellNode) => cell.getKey()),
      //     )
      //   finalRowLengths =
      //     $getTableRowNodeFromTableCellNodeOrThrow(
      //       targetTableCell,
      //     ).getChildrenSize()
      // })

      expect(finalRowLengths).toEqual((initialRowLengths as number) + 1)
      expect(newColumnCellIndex).toEqual(initialtargetColumnIndex)
    },
  )
})
