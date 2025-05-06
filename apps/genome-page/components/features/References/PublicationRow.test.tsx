import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PublicationRow } from "./PublicationRow"

// Mock the useRouter hook
const mockPush = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe("PublicationRow", () => {
  const mockPublication = {
    id: "12345",
    title: "Test Publication Title",
    journal: "Test Journal",
    pages: "123-456",
    pub_type: "research-article",
    source: "source",
    authors: [
      { last_name: "Smith", rank: "1" },
      { last_name: "Johnson", rank: "2" },
    ],
    related_genes: [
      { id: "gene1", name: "geneA" },
      { id: "gene2", name: "geneB" },
      { id: "gene3", name: "geneC" },
    ],
  }

  beforeEach(() => {
    mockPush.mockClear()
  })

  it("renders publication details correctly", () => {
    render(<PublicationRow publication={mockPublication} />)

    // Check if the publication details are rendered correctly
    expect(screen.getByText(/Smith & Johnson/)).toBeInTheDocument()
    expect(screen.getByText(/Test Publication Title/)).toBeInTheDocument()
    expect(screen.getByText(/Test Journal/)).toBeInTheDocument()
    expect(screen.getByText(/123-456/)).toBeInTheDocument()

    // Check if all gene chips are rendered
    expect(screen.getByText("geneA")).toBeInTheDocument()
    expect(screen.getByText("geneB")).toBeInTheDocument()
    expect(screen.getByText("geneC")).toBeInTheDocument()
  })

  it("navigates to the correct gene route when a gene chip is clicked", async () => {
    const user = userEvent.setup()
    render(<PublicationRow publication={mockPublication} />)

    // Get gene chip and click it
    const geneChip = screen.getByText("geneB")
    await user.click(geneChip)

    // Verify router was called with the correct path
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith("/geneB")
  })

  it("navigates to different gene routes when different chips are clicked", async () => {
    const user = userEvent.setup()
    render(<PublicationRow publication={mockPublication} />)

    // Click the first gene chip
    const geneChipA = screen.getByText("geneA")
    await user.click(geneChipA)
    expect(mockPush).toHaveBeenCalledWith("/geneA")

    // Click the third gene chip
    const geneChipC = screen.getByText("geneC")
    await user.click(geneChipC)
    expect(mockPush).toHaveBeenCalledWith("/geneC")

    // Verify the router was called exactly twice
    expect(mockPush).toHaveBeenCalledTimes(2)
  })
})

