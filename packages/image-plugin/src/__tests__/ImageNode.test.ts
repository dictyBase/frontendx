import { describe, test, expect, beforeAll } from "vitest"
import { createEditor, EditorConfig } from "lexical"
import ImageNode, { SerializedImageNode } from "../ImageNode"

const testConfig: EditorConfig = {
  namespace: "test",
  theme: {},
}

const data: SerializedImageNode = {
  type: "image",
  source: "source.jpg",
  width: 100,
  height: 100,
  alt: "test image",
  version: 1,
}

describe("ImageNode", () => {
  const testEditor = createEditor({
    ...testConfig,
    nodes: [ImageNode],
  })
  const initialImageHeight = 150
  const initialImageWidth = 100
  const nextImageHeight = 500
  const nextImageWidth = 500
  let imageNode: ImageNode
  let nodeType: string

  let imageWidth: number
  let imageHeight: number
  let imageSource: string
  let imageAltText: string | undefined

  let imageClone: ImageNode
  let imageCloneWidth: number
  let imageCloneHeight: number
  let imageCloneSource: string
  let imageCloneAltText: string | undefined

  let serializedImageNode: SerializedImageNode
  let importedImageNode: ImageNode

  let newImageWidth: number
  let newImageHeight: number

  let imageNodeWrapperElement: HTMLElement

  beforeAll(() => {
    testEditor.update(() => {
      imageNode = new ImageNode({
        source: "test.jpg",
        width: initialImageWidth,
        height: initialImageHeight,
      })
      nodeType = imageNode.getType()

      imageWidth = imageNode.__width
      imageHeight = imageNode.__height
      imageSource = imageNode.__source
      imageAltText = imageNode.__alt

      imageClone = ImageNode.clone(imageNode)

      imageCloneWidth = imageClone.__width
      imageCloneHeight = imageClone.__height
      imageCloneSource = imageClone.__source
      imageCloneAltText = imageClone.__alt

      serializedImageNode = imageNode.exportJSON()
      importedImageNode = ImageNode.importJSON(data)
      imageNodeWrapperElement = imageNode.createDOM(testConfig)

      imageNode.setDimensions(nextImageWidth, nextImageHeight)

      newImageWidth = imageNode.__width
      newImageHeight = imageNode.__height
    })
  })
  test('implements a method called "getType", that returns string "image"', () => {
    expect(nodeType).toEqual("image")
  })
  test("it accepts a width argument of type number that initializes the image's width property with the given value", () => {
    expect(imageWidth).toEqual(initialImageWidth)
  })
  test("it accepts a height argument of type number that initializes the image's height property with the given value", () => {
    expect(imageHeight).toEqual(initialImageHeight)
  })
  test("implements a static clone method that accepts an instance of a ImageNode and returns a new ImageNode with the same properties", () => {
    expect(imageClone).toBeInstanceOf(ImageNode)
    expect(imageCloneSource).toEqual(imageSource)
    expect(imageCloneWidth).toEqual(imageWidth)
    expect(imageCloneHeight).toEqual(imageHeight)
    expect(imageCloneAltText).toEqual(imageAltText)
  })
  test("implements a static importJSON method that takes a serialized image node and returns an ImageNode instance", () => {
    expect(importedImageNode).toBeInstanceOf(ImageNode)
  })
  test("implements an exportJSON method that returns an object with the same properties as an Image Node", () => {
    expect(serializedImageNode).toHaveProperty("source")
    expect(serializedImageNode).toHaveProperty("width")
    expect(serializedImageNode).toHaveProperty("height")
    expect(serializedImageNode).toHaveProperty("alt")
  })
  test("implements a setDimensions method that accepts a width and height argument, and changes the width and height properties of the image node instance", () => {
    expect(newImageHeight).toEqual(nextImageHeight)
    expect(newImageWidth).toEqual(nextImageWidth)
  })
  test("implements a createDOM method that returns an HTMLElement", () => {
    expect(imageNodeWrapperElement).toBeInstanceOf(HTMLElement)
  })
})
