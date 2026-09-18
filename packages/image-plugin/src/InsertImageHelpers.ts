import {
  $createRangeSelection,
  $getNearestNodeFromDOMNode,
  $getSelection,
  $isParagraphNode,
  $isTextNode,
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
