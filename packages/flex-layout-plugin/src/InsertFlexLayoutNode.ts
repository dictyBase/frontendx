import {
  $isTextNode,
  $isElementNode,
  $isParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootNode,
  LexicalNode,
} from "lexical"
import { $isListItemNode } from "@lexical/list"
import { $createFlexLayoutNode } from "./FlexLayoutNode"
import { getPointAtCaret, handleTextContent } from "./helpers"

const isAHeading = (node: LexicalNode) => {
  const parent = node.getParent()
  if (!parent || $isRootNode(parent)) return false
  if ($isParagraphNode(parent)) return true
  return isAHeading(parent)
}

const isInAList = (node: LexicalNode) => {
  const parent = node.getParent()
  if (!parent || $isRootNode(parent)) return false
  if ($isListItemNode(parent)) return true
  return isInAList(parent)
}

const InsertFlexLayoutNode = () => {
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return true

  if (!selection.isCollapsed()) {
    selection.removeText()
    return true
  }
  const selectedPoint = getPointAtCaret(selection)
  if (!selectedPoint) return true

  const selectedNode = selectedPoint.getNode()

  if (isInAList(selectedNode)) return false

  const topLevelElement = selectedNode.getTopLevelElement()
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

export { InsertFlexLayoutNode }
