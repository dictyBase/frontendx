import { $getSelection, $isNodeSelection, $createRangeSelection } from "lexical"
import { $isImageNode } from "./ImageNode"

export const getImageNodeFromSelection = () => {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) return null
  const nodes = selection.getNodes()
  return $isImageNode(nodes[0]) ? nodes[0] : null
}

export const getRangeSelectionFromPoint = (x: number, y: number) => {
  const rangeSelection = $createRangeSelection()
  let range: StaticRange | null = null
  // @ts-ignore
  if (document.caretPositionFromPoint) {
    // @ts-ignore
    const caretPosition = document.caretPositionFromPoint(x, y)
    if (!caretPosition) return null
    range = {
      startContainer: caretPosition.offsetNode,
      endContainer: caretPosition.offsetNode,
      startOffset: caretPosition.offset,
      endOffset: caretPosition.offset,
      collapsed: true,
    }
  }

  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(x, y)
  }

  if (!range) return null
  rangeSelection.applyDOMRange(range)
  return rangeSelection
}
