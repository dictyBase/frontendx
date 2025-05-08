import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SeeAllGenesChip } from "./SeeAllGenesChip"

// Mock the useRouter hook
const mockPush = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    query: { id: "geneA" },
  }),
}))

describe("SeeAllGenesChip", () => {
  const publicationId = "pub123"
  const geneCount = 10

  beforeEach(() => {
    mockPush.mockClear()
  })

  it("renders the chip with correct text", () => {
    render(
      <SeeAllGenesChip publicationId={publicationId} geneCount={geneCount} />,
    )

    // Check if the chip with the correct text is rendered
    expect(screen.getByText("See all 10")).toBeInTheDocument()
  })

  it("navigates to the publication references page when clicked", async () => {
    const user = userEvent.setup()
    render(
      <SeeAllGenesChip publicationId={publicationId} geneCount={geneCount} />,
    )

    // Get chip and click it
    const chip = screen.getByText("See all 10")
    await user.click(chip)

    // Verify router was called with the correct path
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith("/geneA/references/pub123")
  })

  it("displays the correct count when geneCount changes", () => {
    const { rerender } = render(
      <SeeAllGenesChip publicationId={publicationId} geneCount={15} />,
    )

    expect(screen.getByText("See all 15")).toBeInTheDocument()

    // Rerender with different gene count
    rerender(<SeeAllGenesChip publicationId={publicationId} geneCount={20} />)

    expect(screen.getByText("See all 20")).toBeInTheDocument()
  })

  it("maintains the same publicationId for navigation when clicked", async () => {
    const user = userEvent.setup()
    const newPublicationId = "pub456"

    render(
      <SeeAllGenesChip
        publicationId={newPublicationId}
        geneCount={geneCount}
      />,
    )

    const chip = screen.getByText("See all 10")
    await user.click(chip)

    expect(mockPush).toHaveBeenCalledWith("/geneA/references/pub456")
  })
})

