import { describe, test, expect } from "vitest"
import { getHeightFromWidth, getNewWidth } from "../resizeHelpers"

describe("getNewWidth", () => {
  const initialWidth = 100
  const initialX = 50
  test("Given finalX > initialX and isEast = true, returns a whole number value greater than initialWidth", () => {
    const deltaX = 50
    const newWidth = getNewWidth(
      initialWidth,
      initialX,
      initialX + deltaX,
      true,
    )
    expect(newWidth).toBeGreaterThan(initialWidth)
    expect(newWidth).toEqual(Math.floor(initialWidth + deltaX))
  })
  test("Given finalX < initialX and isEast = true, returns a whole number value less than initialWidth", () => {
    const deltaX = -50
    const newWidth = getNewWidth(
      initialWidth,
      initialX,
      initialX + deltaX,
      true,
    )
    expect(newWidth).toBeLessThan(initialWidth)
    expect(newWidth).toEqual(Math.floor(initialWidth + deltaX))
  })
  test("Given finalX > initialX and isEast = false, returns a whole number value less than initialWidth", () => {
    const deltaX = 50
    const newWidth = getNewWidth(
      initialWidth,
      initialX,
      initialX + deltaX,
      false,
    )
    expect(newWidth).toBeLessThan(initialWidth)
    expect(newWidth).toEqual(Math.floor(initialWidth - deltaX))
  })
  test("Given finalX < initialX and isEast = false, returns a whole number value greater than initialWidth", () => {
    const deltaX = -50
    const newWidth = getNewWidth(
      initialWidth,
      initialX,
      initialX + deltaX,
      false,
    )
    expect(newWidth).toBeGreaterThan(initialWidth)
    expect(newWidth).toEqual(Math.floor(initialWidth - deltaX))
  })
  test("the lowest value that it can return is 0", () => {
    expect(getNewWidth(initialWidth, initialX, -1000, true)).toEqual(0)
    expect(getNewWidth(initialWidth, initialX, 1000, false)).toEqual(0)
  })
  test("If no value is provided for the `isEast` argument, it is true by default", () => {
    expect(getNewWidth(initialWidth, initialX, 500, true)).toEqual(
      getNewWidth(initialWidth, initialX, 500),
    )
  })
})

describe("getHeightFromWidth", () => {
  const width = 150
  const aspectRatio = 1 / 3
  test("Given a width and an aspect ratio, returns the corresponding height", () => {
    expect(getHeightFromWidth(width, aspectRatio)).toEqual(450)
  })
})
