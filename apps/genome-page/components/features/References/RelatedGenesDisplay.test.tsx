import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Gene } from "dicty-graphql-schema"
import { RelatedGenesDisplay } from "./RelatedGenesDisplay"

// Mock the useRouter hook
const mockPush = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe("RelatedGenesDisplay", () => {
  // Sample gene data for testing
  const mockGenes: Array<Gene> = [
    { id: "DDB_G0123456", name: "geneA" },
    { id: "DDB_G0123457", name: "geneB" },
    { id: "DDB_G0123458", name: "geneC" },
    { id: "DDB_G0123459", name: "geneD" },
    { id: "DDB_G0123460", name: "geneE" },
    { id: "DDB_G0123461", name: "geneF" },
    { id: "DDB_G0123462", name: "geneG" },
    { id: "DDB_G0123463", name: "geneH" },
    { id: "DDB_G0123464", name: "geneI" },
  ] as Array<Gene>

  beforeEach(() => {
    mockPush.mockClear()
  })

  it("renders all gene chips correctly", () => {
    render(<RelatedGenesDisplay genes={mockGenes} />)

    // Check if all gene chips are rendered
    mockGenes.forEach((gene) => {
      expect(screen.getByText(gene.name)).toBeInTheDocument()
    })
  })

  it("navigates to gene page when a chip is clicked", async () => {
    const user = userEvent.setup()
    render(<RelatedGenesDisplay genes={mockGenes} />)

    // Click on the first gene chip
    const geneChip = screen.getByText("geneA")
    await user.click(geneChip)

    // Verify router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith("/geneA")
  })

  it("arranges genes in rows with 7 genes per row", () => {
    render(<RelatedGenesDisplay genes={mockGenes} />)

    // Get all table rows
    const rows = document.querySelectorAll("tr")

    // Should have 2 rows (7 genes in first row, 2 genes in second row)
    expect(rows).toHaveLength(2)

    // First row should have 7 cells (7 genes)
    const firstRowCells = rows[0].querySelectorAll("td")
    expect(firstRowCells).toHaveLength(7)

    // Second row should have 2 cells (2 genes)
    const secondRowCells = rows[1].querySelectorAll("td")
    expect(secondRowCells).toHaveLength(2)
  })

  it("creates chips that are clickable", () => {
    render(<RelatedGenesDisplay genes={mockGenes} />)

    // All chips should have the clickable attribute
    const chips = document.querySelectorAll(".MuiChip-clickable")
    expect(chips).toHaveLength(mockGenes.length)
  })
})
