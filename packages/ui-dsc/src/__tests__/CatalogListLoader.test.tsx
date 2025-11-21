import { render, screen } from "@testing-library/react"
import { CatalogListLoader } from "../catalog/CatalogListLoader"

test("should render 12 skeleton rows", () => {
  render(<CatalogListLoader />)
  const skeletons = screen.getAllByTestId("mui-skeleton")
  expect(skeletons).toHaveLength(12)
})
