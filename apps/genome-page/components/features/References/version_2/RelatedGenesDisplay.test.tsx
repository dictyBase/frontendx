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
    render(<RelatedGenesDisplay genes={mockGenes} maxCount={12} />)

    // Check if all gene chips are rendered
    mockGenes.forEach((gene) => {
      expect(screen.getByText(gene.name)).toBeInTheDocument()
    })
  })

  it("navigates to gene page when a chip is clicked", async () => {
    const user = userEvent.setup()
    render(<RelatedGenesDisplay genes={mockGenes} maxCount={12} />)

    // Click on the first gene chip
    const geneChip = screen.getByText("geneA")
    await user.click(geneChip)

    // Verify router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith("/geneA")
  })

  it("renders gene chips in a grid layout", () => {
    render(<RelatedGenesDisplay genes={mockGenes} maxCount={12} />)

    // Check if the grid container exists
    const gridContainer = document.querySelector(".MuiGrid-container")
    expect(gridContainer).toBeInTheDocument()

    // Check if all genes are rendered as grid items
    const gridItems = document.querySelectorAll(".MuiGrid-item")
    expect(gridItems.length).toBe(12) // 9 genes + 3 fillers
  })

  it("creates chips that are clickable", () => {
    render(<RelatedGenesDisplay genes={mockGenes} maxCount={12} />)

    // All gene chips should have the clickable attribute
    const chips = document.querySelectorAll(".MuiChip-clickable")
    expect(chips).toHaveLength(mockGenes.length)
  })

  it("adds filler chips to complete the grid", () => {
    render(<RelatedGenesDisplay genes={mockGenes.slice(0, 5)} maxCount={8} />)

    // There should be 5 gene chips and 3 filler chips
    const geneChips = document.querySelectorAll(".MuiChip-clickable")
    expect(geneChips).toHaveLength(5)

    // Check if filler chips are rendered (they don't have the clickable class)
    const allChips = document.querySelectorAll(".MuiChip-root")
    expect(allChips.length).toBe(8) // 5 genes + 3 fillers
  })
})
