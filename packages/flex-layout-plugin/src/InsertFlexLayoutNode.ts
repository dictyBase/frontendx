import {
  $isTextNode,
  $isElementNode,
  $getSelection,
  $isRangeSelection,
  $isRootNode,
  LexicalNode,
} from "lexical"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  flatMap as OflatMap,
  fromPredicate as OfromPredicate,
} from "fp-ts/Option"
import { $isHeadingNode } from "@lexical/rich-text"
import { $isListItemNode } from "@lexical/list"
import { $createFlexLayoutNode } from "./FlexLayoutNode"
import { getPointAtCaret, handleTextContent } from "./helpers"

const isInAHeading = (node: LexicalNode) => {
  const parent = node.getParent()
  if (!parent || $isRootNode(parent)) return false
  if ($isHeadingNode(parent)) return true
  return isInAHeading(parent)
}

const isInAList = (node: LexicalNode) => {
  const parent = node.getParent()
  if (!parent || $isRootNode(parent)) return false
  if ($isListItemNode(parent)) return true
  return isInAList(parent)
}

const inspectSelection = () => {
  console.log("inspecting")
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return false
  const selectedPoint = getPointAtCaret(selection)
  if (!selectedPoint) return false
  const node = selectedPoint.getNode()
  console.log("is in a heading", isInAHeading(node))
  console.log("is in a list", isInAList(node))
  return false
}

const getFocusOption = () =>
  pipe(
    $getSelection(),
    OfromNullable,
    OflatMap(OfromPredicate($isRangeSelection)),
    Omap((rangeSelection) => {
      rangeSelection.removeText
      return rangeSelection
    }),
    Omap(({ focus }) => focus.getNode()),
  )

const InsertFlexLayoutNodeFunctional = () => {
  const focusPoint = getFocusOption()

  const validNode = pipe(focusPoint)
}

const InsertFlexLayoutNode = () => {
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return false

  if (!selection.isCollapsed()) {
    selection.removeText()
    return false
  }
  const selectedPoint = getPointAtCaret(selection)
  if (!selectedPoint) return false
  // Text Node or Element Node
  const selectedNode = selectedPoint.getNode()

  if (isInAHeading(selectedNode)) return false
  if (isInAList(selectedNode)) return false
  // Get the flex layout node
  const topLevelElement = selectedNode.getTopLevelElement()
  console.log(topLevelElement)
  if (!topLevelElement || $isRootNode(topLevelElement)) return false

  const newFlexLayoutNode = $createFlexLayoutNode()
  const newParagraphNode = newFlexLayoutNode.getParagraphNodeOrThrow()

  if ($isTextNode(selectedPoint.getNode()) && selectedPoint.offset === 0) {
    topLevelElement.insertBefore(newFlexLayoutNode)
  }

  if ($isTextNode(selectedPoint.getNode()) && selectedPoint.offset !== 0) {
    topLevelElement.insertAfter(newFlexLayoutNode)
    handleTextContent(selectedPoint, newParagraphNode)
    newParagraphNode.select(0, 0)
  }

  if ($isElementNode(selectedPoint.getNode())) {
    topLevelElement.insertAfter(newFlexLayoutNode)
    newParagraphNode.select(0, 0)
  }
  return true
}

export { InsertFlexLayoutNode, inspectSelection }
