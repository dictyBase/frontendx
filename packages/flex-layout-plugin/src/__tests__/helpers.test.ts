import { describe, test, expect } from "vitest"
import {
  createEditor,
  $getRoot,
  ParagraphNode,
  TextNode,
  RangeSelection,
  $getSelection,
  $createParagraphNode,
  $createTextNode,
  $isRangeSelection,
  $setSelection,
  $createRangeSelection,
} from "lexical"
import {
  getTopLevelElementFromSelection,
  getTextEdges,
  handleTextContent,
} from "../helpers"
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

describe("handleTextContent", () => {
  test("Handles the text content of a given node by moving a specified portion of its text content to a new paragraph node", () => {
    const editor = createEditor()
    const testString = "This too shall pass."
    const offset = 8
    let originNodeText
    let newParagraphNodeText

    editor.update(() => {
      const originNode = $createParagraphNode().append(
        $createTextNode(testString),
      )
      const newParagraphNode = $createParagraphNode()
      const textNode = originNode.getAllTextNodes()[0]

      if (textNode) textNode.select(offset)
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return
      handleTextContent(selection.anchor, newParagraphNode)

      originNodeText = originNode.getTextContent()
      newParagraphNodeText = newParagraphNode.getTextContent()

      // This is just here to prevent an error message from Lexical warning
      // that the selection was not updated after the previously selected node
      // was removed/replaced. It does not affect the outcome of the test.
      $setSelection($createRangeSelection())
    })

    expect(originNodeText).toBe("This too")
    expect(newParagraphNodeText).toBe(" shall pass.")
  })
})
