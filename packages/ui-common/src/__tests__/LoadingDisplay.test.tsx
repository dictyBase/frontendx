import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LoadingDisplay } from "../LoadingDisplay"

test("By default, the LoadingDisplay component renders a single loading skeleton", () => {
  render(<LoadingDisplay />)

  expect(screen.getByTestId("skeleton")).toBeInTheDocument()
  expect(screen.getAllByTestId("skeleton")).toHaveLength(1)
})

test(`Displays a number of loading skeletons equal to the value of the "rows" argument`, () => {
  render(<LoadingDisplay rows={5} />)

  expect(screen.getAllByTestId("skeleton")).toHaveLength(5)
})
