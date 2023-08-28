import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SearchResultsHeader } from "../catalog/SearchResultsHeader"

describe("Stocks/SearchResults/SearchResultsHeader", () => {
  const properties = {
    property: "Phenotype",
    description: "abolished protein phosphorylation",
  }
  render(<SearchResultsHeader {...properties} />)
  describe("initial render", () => {
    test("renders header with expected text", () => {
      const headers = screen.getAllByRole("heading")
      expect(headers[0]).toHaveTextContent("Phenotype Search Results")
      expect(headers[1]).toHaveTextContent("abolished protein phosphorylation")
    })
  })
})
