import React, { useRef } from "react"
import { useAtom, useSetAtom } from "jotai"
import { ImageDimensionsAtom, isResizingAtom } from "./state"
import { initializeMouseMoveCreator } from "./resizeHelpers"

export type Direction = "ne" | "nw" | "se" | "sw"

const handlerCreators = {
  ne: initializeMouseMoveCreator(true),
  se: initializeMouseMoveCreator(true),
  nw: initializeMouseMoveCreator(false),
  sw: initializeMouseMoveCreator(false),
}
/**
 * A React hook that returns a mousedown event handler used to resize elements
 *
 * @category Hooks
 * @param onResize a function for side effects - Used to update ImageNode width and height
 * @param imageContainer a reference to the parent container
 * @returns an event handler for mousedown events
 */
export const useResize = (
  onResize: (width: number, height: number) => void,
) => {
  // moveHandlerReference is used to track which moveHandler is currently registered
  // so it can be removed by onMouseUp.
  const moveHandlerReference = useRef<{
    handler: ((event: MouseEvent) => void) | null | undefined
  }>({ handler: undefined })
  const [dimensions, setDimensions] = useAtom(ImageDimensionsAtom)
  const setIsResizing = useSetAtom(isResizingAtom)

  const onMouseUp = () => {
    if (!moveHandlerReference.current.handler) return
    document.removeEventListener(
      "mousemove",
      moveHandlerReference.current.handler,
    )
    // setTimeout here allows other resize-related click event listeners
    // to run before isResizing is set to false. This prevents the ImageComponent
    // from being deselected immediately after resizing the image.
    setTimeout(() => setIsResizing(false), 0)
  }

  // Initializes values used for calculating new image dimensions during mousemove
  // and adds the appropriate mousemove and mouseup event listeners
  const onMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    direction: Direction,
  ) => {
    event.preventDefault()
    setIsResizing(true)

    const { width: initialWidth, height: initialHeight } = dimensions
    const initialValues = {
      initialY: event.clientY,
      initialX: event.clientX,
      initialWidth,
      initialHeight,
    }

    const createMoveHandler = handlerCreators[direction]
    if (!createMoveHandler) return

    const handleResize = (width: number, height: number) => {
      onResize(width, height)
      setDimensions({ width, height })
    }

    const onMouseMove = createMoveHandler(initialValues, handleResize)

    moveHandlerReference.current.handler = onMouseMove
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp, { once: true })
  }

  return {
    onMouseDown,
  }
}
