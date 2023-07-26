import {
  $isTextNode,
  $isElementNode,
  $getSelection,
  $isRangeSelection,
} from "lexical"
import { $isListItemNode } from "@lexical/list"
import { $createFlexLayoutNode } from "./FlexLayoutNode"
import {
  getTopLevelElementFromSelection,
  getPointAtCaret,
  handleTextContent,
} from "./helpers"

const InsertFlexLayoutNode = () => {
  const selection = $getSelection()
  if (!selection || !$isRangeSelection(selection)) return true

  if (!selection.isCollapsed()) {
    selection.removeText()
    return true
  }
  const selectedPoint = getPointAtCaret(selection)
  if (!selectedPoint) return true

  const textParent = selectedPoint.getNode().getParent()
  if ($isListItemNode(textParent)) return false

  const selectedFlexLayoutNode = getTopLevelElementFromSelection(selection)
  if (!selectedFlexLayoutNode) return true

  const newFlexLayoutNode = $createFlexLayoutNode()
  const newParagraphNode = newFlexLayoutNode.getParagraphNodeOrThrow()

  if ($isTextNode(selectedPoint.getNode()) && selectedPoint.offset === 0) {
    selectedFlexLayoutNode.insertBefore(newFlexLayoutNode)
  }

  if ($isTextNode(selectedPoint.getNode()) && selectedPoint.offset !== 0) {
    selectedFlexLayoutNode.insertAfter(newFlexLayoutNode)
    handleTextContent(selectedPoint, newParagraphNode)
    newParagraphNode.select(0, 0)
  }

  if ($isElementNode(selectedPoint.getNode())) {
    selectedFlexLayoutNode.insertAfter(newFlexLayoutNode)
    newParagraphNode.select(0, 0)
  }
  return true
}

export { InsertFlexLayoutNode }
