import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { GridLayout } from "../home/GridLayout"

test("renders GridLayout with children", () => {
  render(
    <GridLayout>
      <div>Child 1</div>
      <div>Child 2</div>
    </GridLayout>,
  )
  expect(screen.getByText("Child 1")).toBeInTheDocument()
  expect(screen.getByText("Child 2")).toBeInTheDocument()
})
