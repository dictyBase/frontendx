type MouseMoveHandler = (event: MouseEvent) => void

type MouseMoveCreator = (
  initialValues: {
    initialX: number
    initialY: number
    initialWidth: number
    initialHeight: number
  },
  handleResize: (width: number, height: number) => void,
) => MouseMoveHandler

const getNewWidth = (
  initialWidth: number,
  initialX: number,
  finalX: number,
  isEast: boolean = true,
) => {
  const deltaX = finalX - initialX
  const newWidth = Math.floor(initialWidth + (isEast ? deltaX : -deltaX))
  return newWidth > 0 ? newWidth : 0
}

const getHeightFromWidth = (width: number, aspectRatio: number) =>
  width / aspectRatio

const initializeMouseMoveCreator =
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

export {
  type MouseMoveHandler,
  type MouseMoveCreator,
  getNewWidth,
  getHeightFromWidth,
  initializeMouseMoveCreator,
}
