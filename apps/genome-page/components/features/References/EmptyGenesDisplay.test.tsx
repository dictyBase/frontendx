import { render, screen } from "@testing-library/react"
import { EmptyGenesDisplay } from "./EmptyGenesDisplay"

describe("EmptyGenesDisplay", () => {
  test("renders the correct number of filler chips based on maxCount", () => {
    const maxCount = 12
    render(<EmptyGenesDisplay maxCount={maxCount} />)

    // Check that the overlay is rendered
    expect(screen.getByTestId("empty-genes-overlay")).toBeInTheDocument()
    // Check that there are exactly maxCount GeneChipFiller components
    const fillers = screen.getAllByTestId("gene-chip-filler")
    expect(fillers).toHaveLength(maxCount)
  })

  test("renders with zero fillers when maxCount is 0", () => {
    render(<EmptyGenesDisplay maxCount={0} />)

    // Check that the overlay is still rendered
    expect(screen.getByTestId("empty-genes-overlay")).toBeInTheDocument()

    // Check that there are no fillers
    const fillers = screen.queryAllByTestId("gene-chip-filler")
    expect(fillers).toHaveLength(0)
  })
})

