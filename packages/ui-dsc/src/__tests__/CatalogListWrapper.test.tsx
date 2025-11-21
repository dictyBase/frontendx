import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { CatalogListWrapper } from "../catalog/CatalogListWrapper"

test("should render children", () => {
  const mockReference = createRef<HTMLDivElement>()
  render(
    <CatalogListWrapper root={mockReference}>
      <div>Test Child Content</div>
    </CatalogListWrapper>,
  )
  expect(screen.getByText(/Test Child Content/)).toBeInTheDocument()
})

test("should pass the RefObject to the Paper component", () => {
  const mockReference = createRef<HTMLDivElement>()
  render(
    <CatalogListWrapper root={mockReference}>
      <div>Test Content</div>
    </CatalogListWrapper>,
  )

  // The ref should be attached to the Paper component
  expect(mockReference.current).toBeInTheDocument()
  expect(mockReference.current).toBe(
    screen.getByTestId("catalog-list-wrapper-root"),
  )
})
