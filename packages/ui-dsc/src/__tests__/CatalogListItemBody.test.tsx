import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CatalogListItemBody } from "../catalog/CatalogListItemBody"

test("renders the summary", () => {
  render(
    <CatalogListItemBody summary="Extrachromosomal Dictyostelium expression vector" />,
  )
  expect(
    screen.getByText("Extrachromosomal Dictyostelium expression vector"),
  ).toBeInTheDocument()
})

test("renders a long summary in full, without truncation", () => {
  const longSummary = "a".repeat(200)
  render(<CatalogListItemBody summary={longSummary} />)
  expect(screen.getByText(longSummary)).toBeInTheDocument()
})
