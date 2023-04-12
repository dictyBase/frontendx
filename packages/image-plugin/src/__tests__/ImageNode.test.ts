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
  fit: "cover",
  transition: "cubic-bezier(0.7, 0, 0.6, 1)",
  duration: 2000,
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
  let imageFit: string
  let imageTransition: string
  let imageDuration: number
  let imageAltText: string

  let imageClone: ImageNode
  let imageCloneWidth: string
  let imageCloneHeight: string
  let imageCloneSource: string
  let imageCloneFit: string
  let imageCloneTransition: string
  let imageCloneDuration: number
  let imageCloneAltText: string

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

      imageWidth = imageNode.width
      imageHeight = imageNode.height
      imageSource = imageNode.source
      imageFit = imageNode.fit
      imageTransition = imageNode.transition
      imageDuration = imageNode.duration
      imageAltText = imageNode.alt

      imageClone = ImageNode.clone(imageNode)

      imageCloneWidth = imageClone.width
      imageCloneHeight = imageClone.height
      imageCloneSource = imageClone.source
      imageCloneFit = imageClone.fit
      imageCloneTransition = imageClone.transition
      imageCloneDuration = imageClone.duration
      imageCloneAltText = imageClone.alt

      serializedImageNode = imageNode.exportJSON()
      importedImageNode = ImageNode.importJSON(data)
      imageNodeWrapperElement = imageNode.createDOM(testConfig)

      imageNode.setDimensions(nextImageWidth, nextImageHeight)

      newImageWidth = imageNode.width
      newImageHeight = imageNode.height
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
    expect(imageCloneFit).toEqual(imageFit)
    expect(imageCloneTransition).toEqual(imageTransition)
    expect(imageCloneDuration).toEqual(imageDuration)
    expect(imageCloneAltText).toEqual(imageAltText)
  })
  test("implements a static importJSON method that takes a serialized image node and returns an ImageNode instance", () => {
    expect(importedImageNode).toBeInstanceOf(ImageNode)
  })
  test("implements an exportJSON method that returns an object with the same properties as an Image Node", () => {
    expect(serializedImageNode).toHaveProperty("source")
    expect(serializedImageNode).toHaveProperty("width")
    expect(serializedImageNode).toHaveProperty("height")
    expect(serializedImageNode).toHaveProperty("fit")
    expect(serializedImageNode).toHaveProperty("transition")
    expect(serializedImageNode).toHaveProperty("duration")
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
