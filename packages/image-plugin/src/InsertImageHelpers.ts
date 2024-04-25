import {
  $createRangeSelection,
  $getNearestNodeFromDOMNode,
  $getSelection,
  $isParagraphNode,
  $isTextNode,
  LexicalEditor,
  LexicalNode,
  TextNode,
} from "lexical"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  map as Omap,
  match as Omatch,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  bindTo as ObindTo,
  bind as Obind,
  let as Olet,
} from "fp-ts/Option"
import { $isFlexLayoutNode } from "flex-layout-plugin"

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
    const offsetNode = $getNearestNodeFromDOMNode(caretPosition.offsetNode)
    if (!offsetNode || !(offsetNode instanceof TextNode)) return undefined
    if (!caretPosition) return undefined

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

const getFlexLayoutNodeFromSelection = () => {
  const selection = $getSelection()
  let node = selection?.getNodes()[0]
  while (node && node.getType() !== "root") {
    if ($isFlexLayoutNode(node)) return node
    node = node.getParentOrThrow()
  }
  return undefined
}

const getParagraphNodeFromSelection = () => {
  const selection = $getSelection()
  const nodes = selection?.getNodes()
  if (!nodes) return undefined
  const paragraphNode = nodes.find((node) => $isParagraphNode(node))
  if (paragraphNode) return paragraphNode
  return undefined
}

const getFlexParagraphNodeFromSelection = () => {
  const selection = $getSelection()
  const nodes = selection?.getNodes()
  return pipe(
    nodes,
    OfromNullable,
    ObindTo("nodes"),
    Obind("node", ({ nodes }) => Ahead(nodes)),
    //    Olet("parents", ({ node }) => node.getParents()),
    //    (a) => {
    //      console.log(a)
    //      return a
    //    },
    //    Obind("flexParagraphNode", ({ parents }) =>
    //      OfromNullable(
    //        parents.find((node) => node.getType() === "flex-paragraph"),
    //      ),
    //    ),
    //    Omap(({ flexParagraphNode }) => flexParagraphNode)
    Omap(({ node }) => node),
  )
}

const getTextNodeFromSelection = () => {
  const selection = $getSelection()
  const nodes = selection?.getNodes()
  if (!nodes) return undefined
  const textNode = nodes.find((node) => $isTextNode(node))
  return textNode
}

/**
 * If the selection caret is closer to the left boundary of the paragraph element,
 * the new node will be inserted as the first child of the paragraph. Otherwise,
 * if the selection caret is closer to the right boundary of the paragraph elmenet,
 * the new node will be inserted as the last child of the paragraph.
 *
 * 1. Get the paragraph node that the selection is currently inside of
 * 2. Get the <p> DOM element that corresponds to that paragraph node
 * 3. Get the X coordinate values of the left and right boundaries of
 *    the paragraph element's bounding box
 * 4. Compares the distance between:
 *     A - the selection caret and the left side of the paragraph element
 *     B - the selection caret and the right side of the paragraph element
 *     if A < B, insert new node as first child
 *     if A > B, insert new node as last child
 * 5. If the new node should be inserted as the first child of the paragraph,
 *    we can accomplish this by getting the current first child of the paragraph and
 *    inserting the new node before the first child.
 * 6. Likewise, if the new node should be inserted as the last child of the paragraph,
 *    we can accomplish this by getting the current last child of the paragraph and
 *    inserting the new node after the last child.
 * 7. If the paragraph node currently empty, i.e. it has no children. We can simply
 *    use the $insertNodes function to insert it into the paragraph.
 *
 * In reality, we are not comparing the X coordinate of the selection caret, but the x value of
 * the DOMRect of the first range of the selection. See getXCoordinateFromDOMSelection for
 * details.
 *
 * @param editor a lexical editor instance
 * @param node the node to be inserted
 * @returns void
 */
const insertNodeIntoFlexRow = (
  editor: LexicalEditor,
  node: LexicalNode,
  x?: number,
) => {
  const targetFlexLayoutNode = getFlexLayoutNodeFromSelection()
  const targetParagraph = targetFlexLayoutNode
    ? targetFlexLayoutNode.getParagraphNodeOrThrow()
    : getParagraphNodeFromSelection()
  if (!targetParagraph) return
  const paragraphElement = getElementFromLexicalNode(editor, targetParagraph)
  if (!paragraphElement) return
  const { left, right } = paragraphElement.getBoundingClientRect()
  const insertionXCoordinate = x || getXCoordinateFromDOMSelection()
  if (shouldInsertLeft(left, right, insertionXCoordinate)) {
    targetParagraph.insertBefore(node)
  } else {
    targetParagraph.insertAfter(node)
  }
}

export {
  insertNodeIntoFlexRow,
  getFlexParagraphNodeFromSelection,
  getTextNodeFromSelection,
}
