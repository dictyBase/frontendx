import { describe, test, expect } from "vitest"
import {
  createEditor,
  $getRoot,
  ParagraphNode,
  TextNode,
  RangeSelection,
  $getSelection,
} from "lexical"
import { getTopLevelElementFromSelection, getTextEdges } from "../helpers"
import FlexLayoutNode from "../FlexLayoutNode"

describe("getTextEdges", () => {
  test("Returns an array containing two strings representing the substrings of a larger string split at a given offset", () => {
    const offset = 12
    const testString = "Some example text here"

    const [firstString, secondString] = getTextEdges(testString, offset)
    expect(firstString).toBe("Some example")
    expect(secondString).toBe(" text here")
  })
})

describe("getTopLevelElementFromSelection", () => {
  test("Retrieves the top level element from the first node in a given selection", () => {
    const editor = createEditor({ nodes: [FlexLayoutNode] })
    let retrievedElement
    let topLevelElement

    editor.update(() => {
      topLevelElement = new FlexLayoutNode()
      const paragraphNode = new ParagraphNode()
      const textNode = new TextNode("test")

      const root = $getRoot()
      paragraphNode.append(textNode)
      topLevelElement.append(paragraphNode)
      root.append(topLevelElement)

      textNode.select()
      const selection = $getSelection()
      retrievedElement = getTopLevelElementFromSelection(
        selection as RangeSelection,
      )
    })

    expect(retrievedElement).toEqual(topLevelElement)
  })
})
