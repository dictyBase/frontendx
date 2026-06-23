import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { GridLayout } from "../home/GridLayout"

test("renders GridLayout with children", () => {
  render(
    <GridLayout minColumnWidth="200px">
      <div>Child 1</div>
      <div>Child 2</div>
    </GridLayout>,
  )
  expect(screen.getByText("Child 1")).toBeInTheDocument()
  expect(screen.getByText("Child 2")).toBeInTheDocument()
})

test("applies correct grid template columns", () => {
  const { container } = render(
    <GridLayout minColumnWidth="250px">
      <div>Content</div>
    </GridLayout>,
  )
  const gridBox = container.firstChild
  expect(gridBox).toHaveStyle({
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  })
})

test("uses default gap value", () => {
  const { container } = render(
    <GridLayout minColumnWidth="200px">
      <div>Content</div>
    </GridLayout>,
  )
  const gridBox = container.firstChild
  expect(gridBox).toHaveStyle({ gap: "24px" })
})

test("applies custom gap value", () => {
  const { container } = render(
    <GridLayout minColumnWidth="200px" gap={5}>
      <div>Content</div>
    </GridLayout>,
  )
  const gridBox = container.firstChild
  expect(gridBox).toHaveStyle({ gap: "40px" })
})

test("applies custom sx styles", () => {
  const { container } = render(
    <GridLayout minColumnWidth="200px" sx={{ backgroundColor: "gray" }}>
      <div>Content</div>
    </GridLayout>,
  )
  const gridBox = container.firstChild
  expect(gridBox).toHaveStyle({ backgroundColor: "gray" })
})
