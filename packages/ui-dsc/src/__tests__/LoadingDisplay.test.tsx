import { render, screen } from "@testing-library/react"
import { LoadingDisplay } from "../LoadingDisplay"

test("should render default number of skeleton rows", () => {
  render(<LoadingDisplay />)
  const skeletons = screen.getAllByTestId("mui-skeleton")
  expect(skeletons).toHaveLength(6)
})

test("should render custom number of skeleton rows", () => {
  const customRows = 10
  render(<LoadingDisplay rows={customRows} />)
  const skeletons = screen.getAllByTestId("mui-skeleton")
  expect(skeletons).toHaveLength(customRows)
})
