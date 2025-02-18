import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { StockCenterInfoDisplay } from "../home/StockCenterInfoDisplay"
import { mockContent, sampleText } from "../mocks/mockContent"

describe("StockCenterInfoDisplay", () => {
  it("renders the mock content text", () => {
    render(
      <StockCenterInfoDisplay
        content={JSON.stringify(mockContent)}
        slug="mock-slug"
      />,
    )
    expect(screen.getByText(sampleText)).toBeInTheDocument()
  })

  it("renders the heading text", () => {
    render(
      <StockCenterInfoDisplay
        content={JSON.stringify(mockContent)}
        slug="mock-slug"
      />,
    )
    expect(screen.getByText("Welcome to Dicty Stock Center (DSC)")).toBeInTheDocument()
  })
})
