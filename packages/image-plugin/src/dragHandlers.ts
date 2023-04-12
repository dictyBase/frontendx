import {
  $getNearestNodeFromDOMNode,
  $getSelection,
  $isDecoratorNode,
  $setSelection,
  LexicalEditor,
} from "lexical"
import {
  getImageNodeFromSelection,
  getRangeSelectionFromPoint,
} from "./dragHelpers"
import { INSERT_IMAGE_COMMAND } from "./InsertImageCommand"
// On Firefox, when the image is dragged, a transparent version of the image hovers
// with the user's cursor. This can make it difficult to see where the image is
// being moved precisely. The drag image can be replaced with transparent image
// below
const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
const img = document.createElement("img")
img.src = TRANSPARENT_IMAGE

export const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setDragImage(img, 0, 0)
  return true
}

export const onDrop = (event: DragEvent, editor: LexicalEditor) => {
  event.preventDefault()
  if (!(event.target instanceof Node)) return false

  const dropTargetNode = $getNearestNodeFromDOMNode(event.target)
  if ($isDecoratorNode(dropTargetNode)) return false

  const imageNode = getImageNodeFromSelection()
  if (!imageNode) return false

  $setSelection(getRangeSelectionFromPoint(event.clientX, event.clientY))

  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
    source: imageNode.source,
    width: imageNode.width,
    height: imageNode.height,
    key: imageNode.key,
    x: event.clientX,
  })
  imageNode.remove()
  return true
}
