/* eslint-disable unicorn/no-null */
import { describe, test, expect, beforeAll, vi, afterEach } from "vitest"
import { $createNodeSelection, $setSelection, createEditor } from "lexical"
import { ALIGNMENT } from "@dictybase/resizable-image"
import {
  getImageNodeFromSelection,
  getRangeSelectionFromPoint,
} from "../dragHelpers"
import { ImageNode } from "../ImageNode"

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
        alignment: ALIGNMENT.LEFT,
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

describe("getRangeSelectionFromPoint", () => {
  const testEditor = createEditor(testConfig)

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test("returns undefined when both caretPositionFromPoint and caretRangeFromPoint are unavailable", () => {
    // jsdom doesn't implement either — by default both are undefined/absent
    let result: unknown
    testEditor.update(() => {
      result = getRangeSelectionFromPoint(10, 10)
    })
    expect(result).toBeUndefined()
  })

  test("returns a range selection when caretRangeFromPoint is available", () => {
    const mockRange = {
      startContainer: document.createElement("div"),
      endContainer: document.createElement("div"),
      startOffset: 0,
      endOffset: 0,
      collapsed: true,
    } as unknown as Range

    // jsdom doesn't define caretRangeFromPoint, so assign it directly
    Object.defineProperty(document, "caretRangeFromPoint", {
      value: () => mockRange,
      writable: true,
      configurable: true,
    })

    let result: unknown
    testEditor.update(() => {
      result = getRangeSelectionFromPoint(10, 10)
    })
    expect(result).not.toBeUndefined()
  })

  test("returns a range selection when caretPositionFromPoint is available", () => {
    const offsetNode = document.createElement("div")
    const mockCaretPosition = { offsetNode, offset: 0 }

    Object.defineProperty(document, "caretPositionFromPoint", {
      value: () => mockCaretPosition,
      writable: true,
      configurable: true,
    })
    // Remove caretRangeFromPoint so only caretPositionFromPoint path runs
    Object.defineProperty(document, "caretRangeFromPoint", {
      value: undefined,
      writable: true,
      configurable: true,
    })

    let result: unknown
    testEditor.update(() => {
      result = getRangeSelectionFromPoint(10, 10)
    })
    expect(result).not.toBeUndefined()
  })

  test("returns undefined when caretPositionFromPoint returns null", () => {
    Object.defineProperty(document, "caretPositionFromPoint", {
      value: () => null,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(document, "caretRangeFromPoint", {
      value: undefined,
      writable: true,
      configurable: true,
    })

    let result: unknown
    testEditor.update(() => {
      result = getRangeSelectionFromPoint(10, 10)
    })
    expect(result).toBeUndefined()
  })

  test("returns undefined when caretRangeFromPoint returns null", () => {
    Object.defineProperty(document, "caretRangeFromPoint", {
      value: () => null,
      writable: true,
      configurable: true,
    })

    let result: unknown
    testEditor.update(() => {
      result = getRangeSelectionFromPoint(10, 10)
    })
    expect(result).toBeUndefined()
  })
})
