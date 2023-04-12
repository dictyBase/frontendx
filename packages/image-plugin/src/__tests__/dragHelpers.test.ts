import { describe, test, expect, beforeAll } from "vitest"
import { $createNodeSelection, $setSelection, createEditor } from "lexical"
import { getImageNodeFromSelection } from "../dragHelpers"
import ImageNode from "../ImageNode"

const testConfig = {
  nodes: [ImageNode],
}

describe("getImageNodeFromSelection", () => {
  const testEditor = createEditor(testConfig)
  let selectedImageNode: unknown
  beforeAll(() => {
    testEditor.update(() => {
      const imageNode = new ImageNode({
        source: "source.jpg",
        width: 500,
        height: 500,
      })
      const imageNodeSelection = $createNodeSelection()
      imageNodeSelection.add(imageNode.getKey())
      $setSelection(imageNodeSelection)
      selectedImageNode = getImageNodeFromSelection()
    })
  })
  test("returns an image node if it is the selected node", () => {
    expect(selectedImageNode).toBeInstanceOf(ImageNode)
  })
})
