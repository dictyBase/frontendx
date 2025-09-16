import { render, screen } from "@testing-library/react"
import { EmptyGenesOverlay } from "./EmptyGenesOverlay"

describe("EmptyGenesOverlay", () => {
  test("renders the overlay with correct message", () => {
    render(<EmptyGenesOverlay />)

    // Check for the "No Matching Genes" message
    expect(screen.getByText("No Matching Genes")).toBeInTheDocument()
  })
})
