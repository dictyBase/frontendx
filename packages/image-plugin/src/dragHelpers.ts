import { $getSelection, $isNodeSelection, $createRangeSelection } from "lexical"
import { $isImageNode } from "./ImageNode"

export const getImageNodeFromSelection = () => {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) return undefined
  const nodes = selection.getNodes()
  return nodes[0] && $isImageNode(nodes[0]) ? nodes[0] : undefined
}

export const getRangeSelectionFromPoint = (x: number, y: number) => {
  const rangeSelection = $createRangeSelection()
  // eslint-disable-next-line unicorn/no-null
  let range: StaticRange | null = null
  // @ts-ignore
  if (document.caretPositionFromPoint) {
    // @ts-ignore
    const caretPosition = document.caretPositionFromPoint(x, y)
    if (!caretPosition) return undefined
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

  if (!range) return undefined
  rangeSelection.applyDOMRange(range)
  return rangeSelection
}
