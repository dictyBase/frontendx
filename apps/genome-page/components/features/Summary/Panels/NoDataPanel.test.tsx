import { render, screen } from "@testing-library/react"
import { NoDataPanel } from "./NoDataPanel"

describe("features/Summary/Panels/NoDataPanel", () => {
  it("should render with correct message for a gene", () => {
    render(<NoDataPanel query="References" geneId="sadA" />)
    
    // Check text with gene and query params
    expect(screen.getByText("No References for sadA")).toBeInTheDocument()
  })

  it("should render with correct message for different query", () => {
    render(<NoDataPanel query="GO Annotations" geneId="piaA" />)
    
    // Check text with gene and query params
    expect(screen.getByText("No GO Annotations for piaA")).toBeInTheDocument()
  })

  it("should render with correct message for Gene Summary", () => {
    render(<NoDataPanel query="Gene Summary" geneId="ctxA" />)
    
    // Check text with gene and query params
    expect(screen.getByText("No Gene Summary for ctxA")).toBeInTheDocument()
  })
})
