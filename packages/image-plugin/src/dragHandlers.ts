import {
  $getNearestNodeFromDOMNode,
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

export const onDragStart = (event: DragEvent) => {
  const TRANSPARENT_IMAGE =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  const img = document.createElement("img")
  img.src = TRANSPARENT_IMAGE
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

  const selection = getRangeSelectionFromPoint(event.clientX, event.clientY)
  if (!selection) return false
  $setSelection(selection)
  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
    source: imageNode.__source,
    width: imageNode.__width,
    height: imageNode.__height,
    key: imageNode.__key,
    alignment: "left",
  })
  return true
}
