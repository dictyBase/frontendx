import { describe, test, expect, beforeAll } from "vitest"
import { createEditor, SerializedElementNode } from "lexical"
import { testConfig } from "../LexicalTestComposer"
import WidthTableNode, { SerializedWidthTableNode } from "../WidthTableNode"

const width = Math.random() * 500

const data: SerializedWidthTableNode = {
  children: [],
  // eslint-disable-next-line unicorn/no-null
  direction: null,
  format: "",
  indent: 0,
  type: "table",
  version: 1,
  width,
}

describe("WidthTableNode", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [WidthTableNode],
  })
  let tableNode

  let nodeType: string

  let tableWidth: number

  let tableNodeKey: string
  let tableNodeClone: WidthTableNode
  let tableNodeCloneKey: string
  let tableNodeCloneWidth: number

  let serializedTableNode: SerializedElementNode

  let importedTableNode: WidthTableNode
  let importedTableNodeWidth: number

  let tableDOM: HTMLTableElement

  beforeAll(() => {
    testEditor.update(() => {
      tableNode = new WidthTableNode(width)
      nodeType = tableNode.getType()

      tableWidth = tableNode.__width

      tableNodeKey = tableNode.getKey()
      tableNodeClone = WidthTableNode.clone(tableNode)
      tableNodeCloneKey = tableNodeClone.getKey()
      tableNodeCloneWidth = tableNodeClone.__width

      serializedTableNode = tableNode.exportJSON()

      importedTableNode = WidthTableNode.importJSON(data)
      importedTableNodeWidth = importedTableNode.__width

      tableDOM = tableNode.createDOM(testConfig)
    })
  })
  test('implements a method called "getType", that returns string "table"', () => {
    expect(nodeType).toEqual("table")
  })
  test("it accepts a width argument of type number that initializes the table node's width property with the given value", () => {
    expect(tableWidth).toEqual(width)
  })
  test("implements a static clone method that accepts an instance of a WidthTableNode and returns a new WidthTableNode with the same width and key", () => {
    expect(tableNodeClone).toBeInstanceOf(WidthTableNode)
    expect(tableNodeCloneWidth).toEqual(width)
    expect(tableNodeCloneKey).toEqual(tableNodeKey)
  })
  test("implements an exportJSON method that returns an object with a width property", () => {
    expect(serializedTableNode).toHaveProperty("width")
  })
  test("implements a static importJSON method that takes a serialized custom table node and returns a WidthTableNode instance", () => {
    expect(importedTableNode).toBeInstanceOf(WidthTableNode)
    expect(importedTableNodeWidth).toEqual(width)
  })
  test("implements a createDOM method that returns an HTMLTableElement", () => {
    expect(tableDOM).toBeInstanceOf(HTMLTableElement)
  })
})
