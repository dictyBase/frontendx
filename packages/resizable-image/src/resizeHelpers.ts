type MouseMoveHandler = (event: MouseEvent) => void

export type MouseMoveCreator = (
  initialValues: {
    initialX: number
    initialY: number
    initialWidth: number
    initialHeight: number
  },
  handleResize: (width: number, height: number) => void,
) => MouseMoveHandler

export const getNewWidth = (
  initialWidth: number,
  initialX: number,
  finalX: number,
  isEast: boolean = true,
) => {
  const deltaX = finalX - initialX
  const newWidth = Math.floor(initialWidth + (isEast ? deltaX : -deltaX))
  return newWidth > 0 ? newWidth : 0
}

export const getHeightFromWidth = (width: number, aspectRatio: number) =>
  width / aspectRatio

export const initializeMouseMoveCreator =
  (isEast: boolean): MouseMoveCreator =>
  (initialValues, handleResize) =>
  (event) => {
    const { initialX, initialHeight, initialWidth } = initialValues
    const finalX = event.clientX
    const aspectRatio = initialWidth / initialHeight

    const newWidth = getNewWidth(initialWidth, initialX, finalX, isEast)
    const newHeight = getHeightFromWidth(newWidth, aspectRatio)
    handleResize(newWidth, newHeight)
  }
