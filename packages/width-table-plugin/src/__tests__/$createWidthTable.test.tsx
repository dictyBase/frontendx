import { describe, test, expect, beforeAll } from "vitest"
import { createEditor, ParagraphNode, TextNode } from "lexical"
import {
  TableCellNode,
  TableRowNode,
  TableCellHeaderStates,
  $createTableRowNode,
} from "@lexical/table"
import WidthTableNode from "../WidthTableNode"
import { testConfig } from "../LexicalTestComposer"
import $createWidthTable, {
  createParagraphWithTextNode,
  createCellWithParagraphNode,
  createHeaderCellWithParagraphNode,
  bodyCellsToAppend,
  headerCellsToAppend,
  cellsToAppend,
} from "../$createWidthTable"

describe("CreateParagraphWithTextNode", () => {
  let paragraphNode: ParagraphNode
  let textNode: TextNode | null
  beforeAll(() => {
    const testEditor = createEditor({
      ...testConfig,
      nodes: [TableCellNode, TableRowNode],
    })
    testEditor.update(() => {
      paragraphNode = createParagraphWithTextNode()
      textNode = paragraphNode.getFirstChild()
    })
  })

  test("creates and returns a paragraph node", () => {
    expect(paragraphNode).toBeInstanceOf(ParagraphNode)
  })
  test("it returns a paragraph node with a Text Node as an immediate child", () => {
    expect(textNode).toBeInstanceOf(TextNode)
  })
})

describe("createCellWithParagraphNode & createHeaderCellwithParagraphNode", () => {
  let bodyCellNode: TableCellNode
  let headerCellNode: TableCellNode
  let bodyCellParagraphNode: ParagraphNode | null
  let headerCellParagraphNode: ParagraphNode | null
  let bodyCellHeaderState: number
  let headerCellHeaderState: number
  beforeAll(() => {
    const testEditor = createEditor({
      ...testConfig,
      nodes: [TableCellNode, TableRowNode],
    })
    testEditor.update(() => {
      bodyCellNode = createCellWithParagraphNode()
      bodyCellParagraphNode = bodyCellNode.getFirstChild()
      bodyCellHeaderState = createCellWithParagraphNode().getHeaderStyles()
      headerCellNode = createHeaderCellWithParagraphNode()
      headerCellParagraphNode = headerCellNode.getFirstChild()
      headerCellHeaderState =
        createHeaderCellWithParagraphNode().getHeaderStyles()
    })
  })
  test("returns a table cell node", () => {
    expect(bodyCellNode).toBeInstanceOf(TableCellNode)
    expect(headerCellNode).toBeInstanceOf(TableCellNode)
  })

  test("returns a table cell node with a paragraph node as an immediate child", () => {
    expect(bodyCellParagraphNode).toBeInstanceOf(ParagraphNode)
    expect(headerCellParagraphNode).toBeInstanceOf(ParagraphNode)
  })

  test("returns a table cell node with the appropriate header state", () => {
    expect(bodyCellHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(headerCellHeaderState).toEqual(TableCellHeaderStates.ROW)
  })
})

describe("bodyCellsToAppend & headerCellsToAppend", () => {
  const cellCount = Math.floor(Math.random() * 10)

  let tableBodyRow: TableRowNode
  let bodyCellsInRow: number
  let firstBodyCell: TableCellNode | undefined | null
  let firstBodyCellHeaderState: number | undefined | null
  const appendNBodyCellsFunction = bodyCellsToAppend(cellCount)

  let tableHeaderRow: TableRowNode
  let headerCellsInRow: number
  let firstHeaderCell: TableCellNode | undefined | null
  let firstHeaderCellHeaderState: number | undefined | null
  const appendNHeaderCellsFunction = headerCellsToAppend(cellCount)

  beforeAll(() => {
    const testEditor = createEditor({
      ...testConfig,
      nodes: [TableCellNode, TableRowNode],
    })
    testEditor.update(() => {
      tableBodyRow = new TableRowNode()
      appendNBodyCellsFunction(tableBodyRow)
      bodyCellsInRow = tableBodyRow.getChildrenSize()
      firstBodyCell = tableBodyRow.getFirstChild() as TableCellNode
      firstBodyCellHeaderState = firstBodyCell
        ? firstBodyCell.getHeaderStyles()
        : undefined

      tableHeaderRow = new TableRowNode()
      appendNHeaderCellsFunction(tableHeaderRow)
      headerCellsInRow = tableHeaderRow.getChildrenSize()
      firstHeaderCell = tableHeaderRow.getFirstChild() as TableCellNode
      firstHeaderCellHeaderState = firstHeaderCell
        ? firstHeaderCell.getHeaderStyles()
        : undefined
    })
  })
  test("returns a function that, when called, appends a specified number of body cells to a table row ", () => {
    expect(firstBodyCell).toBeInstanceOf(TableCellNode)
    expect(firstBodyCellHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(bodyCellsInRow).toEqual(cellCount)

    expect(firstHeaderCell).toBeInstanceOf(TableCellNode)
    expect(firstHeaderCellHeaderState).toEqual(TableCellHeaderStates.ROW)
    expect(headerCellsInRow).toEqual(cellCount)
  })
})

describe("cellsToAppend & headerCellsToAppend", () => {
  const cellCount = 3
  const appendThreeCellsToEachRow = cellsToAppend(cellCount)
  let rowArray
  let firstRowChildren: TableCellNode[]
  let firstCellRowOne: TableCellNode
  let secondCellRowOne: TableCellNode
  let firstCellRowOneHeaderState: number
  let secondCellRowOneHeaderState: number

  let secondRowChildren: TableCellNode[]
  let firstCellRowTwo: TableCellNode
  let secondCellRowTwo: TableCellNode
  let firstCellRowTwoHeaderState: number
  let secondCellRowTwoHeaderState: number
  beforeAll(() => {
    const testEditor = createEditor({
      ...testConfig,
      nodes: [TableCellNode, TableRowNode],
    })
    testEditor.update(() => {
      rowArray = Array.from({ length: 2 }).map(() => $createTableRowNode())
      appendThreeCellsToEachRow(rowArray)
      firstRowChildren = (rowArray[0] as TableRowNode).getChildren()
      ;[firstCellRowOne, secondCellRowOne] = firstRowChildren as [
        TableCellNode,
        TableCellNode,
      ]
      firstCellRowOneHeaderState = firstCellRowOne.getHeaderStyles()
      secondCellRowOneHeaderState = secondCellRowOne.getHeaderStyles()

      secondRowChildren = (rowArray[1] as TableRowNode).getChildren()
      ;[firstCellRowTwo, secondCellRowTwo] = secondRowChildren as [
        TableCellNode,
        TableCellNode,
      ]
      firstCellRowTwoHeaderState = firstCellRowTwo.getHeaderStyles()
      secondCellRowTwoHeaderState = secondCellRowTwo.getHeaderStyles()
    })
  })

  test("returns a function that, when passed an array of table rows, appends a given number of children to each row", () => {
    expect(firstRowChildren).toHaveLength(cellCount)
    expect(secondRowChildren).toHaveLength(cellCount)
  })
  test("the appended children of the rows are TableCellNodes", () => {
    expect(firstCellRowTwo).toBeInstanceOf(TableCellNode)
    expect(secondCellRowTwo).toBeInstanceOf(TableCellNode)
    expect(firstCellRowOne).toBeInstanceOf(TableCellNode)
    expect(secondCellRowOne).toBeInstanceOf(TableCellNode)
  })
  test("appends header cells to the first row, and body cells to subsequent rows", () => {
    expect(firstCellRowOneHeaderState).toEqual(TableCellHeaderStates.ROW)
    expect(secondCellRowOneHeaderState).toEqual(TableCellHeaderStates.ROW)

    expect(firstCellRowTwoHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
    expect(secondCellRowTwoHeaderState).toEqual(TableCellHeaderStates.NO_STATUS)
  })
})

describe("createWidthTable", () => {
  const rowCount = Math.floor(Math.random() * 10)
  const columnCount = Math.floor(Math.random() * 10)
  const width = 500
  let tableNode: WidthTableNode
  let numberOfRows: number
  let numberOfColumns: number
  beforeAll(() => {
    const testEditor = createEditor({
      ...testConfig,
      nodes: [TableCellNode, TableRowNode],
    })
    testEditor.update(() => {
      tableNode = $createWidthTable(rowCount, columnCount, width)
      const rowNode = tableNode.getFirstChild() as TableRowNode
      numberOfRows = tableNode.getChildrenSize()
      numberOfColumns = rowNode.getChildrenSize()
    })
  })

  test("returns a tableNode", () => {
    expect(tableNode).toBeInstanceOf(WidthTableNode)
  })
  test("the tableNode has a width property of equal to the argument value passed", () => {
    expect(tableNode.__width).toEqual(width)
  })
  test("the tableNode has the given number of rows", () => {
    expect(numberOfRows).toEqual(rowCount)
  })
  test("the tableNode has the given number of columns", () => {
    expect(numberOfColumns).toEqual(columnCount)
  })
})
