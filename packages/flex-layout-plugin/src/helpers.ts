import {
  $createTextNode,
  ParagraphNode,
  RangeSelection,
  NodeSelection,
  GridSelection,
} from "lexical"
import { PointType } from "lexical/LexicalSelection"

/**
 * Retrieves the top level element from the first node in a given selection.
 * @param selection - The selection whose first node should be used to find its top level element.
 * @returns The top level element of the first node in the given selection, or null if the selection has no nodes.
 */
export const getTopLevelElementFromSelection = (
  selection: RangeSelection | NodeSelection | GridSelection,
) => {
  const node = selection.getNodes()[0]
  return node ? node.getTopLevelElement() : undefined
}

/**
 * Gets the node at the current caret position in the provided range selection.
 *
 * @param {RangeSelection} selection - The range selection object containing the caret position.
 * @returns {Node|undefined} - The node at the caret position, or undefined if the selection is not collapsed.
 */
export const getPointAtCaret = (selection: RangeSelection) => {
  if (!selection.isCollapsed()) return undefined
  return selection.focus
}

/**
 * Returns an array containing two strings representing the substrings of a larger string split at a given offset.
 * @param nodeText - The larger string to split into substrings.
 * @param offset - The index within nodeText at which to perform the split.
 * @returns An array containing two strings. The first represents nodeText up to the split point, and the second represents nodeText after the split point.
 */
export const getTextEdges = (
  nodeText: string,
  offset: number,
): [string, string] => [nodeText.slice(0, offset), nodeText.slice(offset)]

/**
 * Handles the text content of a given node by moving a specified portion of its text content to a new paragraph node.
 * @param nodeWithText - The point type that represents the lexical node and offset at which to split the text content.
 * @param paragraphNode - The paragraph node to append the new text node to.
 */
export const handleTextContent = (
  nodeWithText: PointType,
  paragraphNode: ParagraphNode,
) => {
  const [textToRemain, textToMove] = getTextEdges(
    nodeWithText.getNode().getTextContent(),
    nodeWithText.offset,
  )
  nodeWithText.getNode().setTextContent(textToRemain)
  paragraphNode.append($createTextNode(textToMove))
}
