import {
  $createRangeSelection,
  $getNearestNodeFromDOMNode,
  $getSelection,
  $isParagraphNode,
  $isTextNode,
  LexicalEditor,
  LexicalNode,
  TextNode,
  ParagraphNode,
} from "lexical"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  map as Omap,
  fromNullable as OfromNullable,
  bindTo as ObindTo,
  bind as Obind,
} from "fp-ts/Option"
import {
  $isFlexLayoutNode,
  FlexLayoutNode,
} from "@dictybase/flex-layout-plugin"

const getDifference = (first: number, second: number) =>
  Math.abs(first - second)

const getFirstRangeFromSelection = (selection: Selection) =>
  selection.getRangeAt(0)

const getXCoordinateFromRange = (range: Range) =>
  range.getBoundingClientRect().x

/**
 * We need some way to represent the position of the selection caret
 * in order to determine where to insert a node. The browser Selection
 * itself has no value that we can use, but a Selection may have a number
 * of Range objects that we can get a DOMRect of. We can then use the X
 * value of the DOMRect. Since a Selection may have multiple Ranges, we
 * can simply use the first Range.
 *
 * @returns the x value of the DOMRect of the first range of the selection
 */
const getXCoordinateFromDOMSelection = () => {
  const selection = window.getSelection()
  if (!selection) return 0
  return getXCoordinateFromRange(getFirstRangeFromSelection(selection))
}

const shouldInsertLeft = (
  left: number,
  right: number,
  insertionXCoordinate: number,
) =>
  getDifference(insertionXCoordinate, left) <
  getDifference(insertionXCoordinate, right)

export const getRangeSelectionFromPoint = (x: number, y: number) => {
  const rangeSelection = $createRangeSelection()
  // @ts-ignore
  if (document.caretPositionFromPoint) {
    // @ts-ignore
    const caretPosition = document.caretPositionFromPoint(x, y)
    if (!caretPosition) return undefined
    const offsetNode = $getNearestNodeFromDOMNode(caretPosition.offsetNode)
    if (!offsetNode || !(offsetNode instanceof TextNode)) return undefined

    rangeSelection.setTextNodeRange(
      offsetNode,
      caretPosition.offset,
      offsetNode,
      caretPosition.offset,
    )
  }

  if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y)
    if (!range) return undefined
    rangeSelection.applyDOMRange(range)
  }

  return rangeSelection
}

const getElementFromLexicalNode = (editor: LexicalEditor, node: LexicalNode) =>
  editor.getElementByKey(node.getKey())

const getNearestFlexLayoutAncestor = (
  node: LexicalNode,
): FlexLayoutNode | undefined => {
  if (node.getType() === "root") return undefined
  if ($isFlexLayoutNode(node)) return node
  const parent = node.getParent()
  if (!parent) return undefined
  return getNearestFlexLayoutAncestor(parent)
}

const getNearestParagraphAncestor = (
  node: LexicalNode,
): ParagraphNode | undefined => {
  if (node.getType() === "root") return undefined
  if ($isParagraphNode(node)) return node
  const parent = node.getParent()
  if (!parent) return undefined
  return getNearestParagraphAncestor(parent)
}

const getFlexLayoutNodeFromSelection = () => {
  const selection = $getSelection()
  const node = selection?.getNodes()[0]
  if (!node) return undefined
  return getNearestFlexLayoutAncestor(node)
}

const getParagraphNodeFromSelection = () => {
  const selection = $getSelection()
  const node = selection?.getNodes()[0]
  if (!node) return undefined
  return getNearestParagraphAncestor(node)
}

const getTopLevelElementFromSelection = () => {
  const selection = $getSelection()
  const node = selection?.getNodes()[0]
  if (!node) return undefined
  return node.getTopLevelElement()
}

const getFlexParagraphNodeFromSelection = () => {
  const selection = $getSelection()
  const selectionNodes = selection?.getNodes()
  return pipe(
    selectionNodes,
    OfromNullable,
    ObindTo("nodes"),
    Obind("node", ({ nodes }) => Ahead(nodes)),
    Omap(({ node }) => node),
  )
}

const getTextNodeFromSelection = () => {
  const selection = $getSelection()
  const nodes = selection?.getNodes()
  if (!nodes) return undefined
  return nodes.find((node) => $isTextNode(node))
}

export {
  getFlexParagraphNodeFromSelection,
  getTextNodeFromSelection,
  getParagraphNodeFromSelection,
  getFlexLayoutNodeFromSelection,
  getNearestFlexLayoutAncestor,
  getTopLevelElementFromSelection,
}
