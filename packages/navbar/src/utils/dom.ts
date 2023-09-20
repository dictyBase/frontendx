/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
// @flow
export const transitionFromAuto = (element: any, endHeight: number) => {
  element.style.height = getComputedStyle(element).height
  // Force repaint
  // eslint-disable-next-line no-unused-expressions
  element.offsetHeight
  element.style.height = `${endHeight}px`
  // el.style.overflow = 'hidden'
}

export const transitionToAuto = (element: HTMLElement) => {
  const previousHeight = element.style.height
  element.style.height = "auto"
  const endHeight = getComputedStyle(element).height
  element.style.height = previousHeight
  // Force repaint
  // eslint-disable-next-line no-unused-expressions
  element.offsetHeight
  element.style.height = endHeight
}

export const wasClicked = (event: MouseEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const minX: number = rect.left + element.clientLeft
  const x: number = event.clientX
  const minY: number = rect.top + element.clientTop
  const y: number = event.clientY

  if (x < minX || x >= minX + element.clientWidth) {
    return false
  }
  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  if (y < minY || y >= minY + element.clientHeight) {
    return false
  }

  return true
}

export const calcTextWidth = (
  text: string,
  size: any = "16px",
  family: string = "sans-serif",
) => {
  const c = document.createElement("canvas")
  const context = c.getContext("2d")
  if (!context) return 0
  context.font = `${size} ${family}`
  return context.measureText(text).width
}
