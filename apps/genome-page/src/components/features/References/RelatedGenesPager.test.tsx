import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { userEvent } from "@testing-library/user-event"
import { RelatedGenesPager } from "./RelatedGenesPager"

// Create mock data with enough genes to span multiple pages
// Pad the numbers in gene names with leading zeros to ensure proper alphanumeric sorting
const generateMockGenes = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: `gene-${index + 1}`,
    name: `Gene ${String(index + 1).padStart(2, "0")}`,
    __typename: "Gene" as const,
  }))

describe("RelatedGenesPager", () => {
  // We'll create 35 genes which will span 3 pages (16 genes per page)
  const mockGenes = generateMockGenes(35)

  test("renders the first page of genes by default", () => {
    render(
      <MemoryRouter>
        <RelatedGenesPager genes={mockGenes} />
      </MemoryRouter>,
    )

    // Check if pagination is rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument()

    // First page should contain the first 16 genes
    expect(screen.getByText("Gene 01")).toBeInTheDocument()
    expect(screen.getByText("Gene 16")).toBeInTheDocument()

    // Gene 17 should be on the next page and not visible
    expect(screen.queryByText("Gene 17")).not.toBeInTheDocument()
  })

  test("navigates to the next page when clicking next button", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <RelatedGenesPager genes={mockGenes} />
      </MemoryRouter>,
    )

    // Find the "Go to page 2" button and click it
    // Material-UI Pagination renders buttons with aria-label "Go to page X"
    const goToPage2Button = screen.getByRole("button", {
      name: /go to page 2/i,
    })
    await user.click(goToPage2Button)

    // Second page should contain genes 17-32
    expect(screen.getByText("Gene 17")).toBeInTheDocument()
    expect(screen.getByText("Gene 32")).toBeInTheDocument()

    // Gene 01 should not be visible anymore
    expect(screen.queryByText("Gene 01")).not.toBeInTheDocument()

    // Gene 33 should be on the next page
    expect(screen.queryByText("Gene 33")).not.toBeInTheDocument()
  }, 30_000)

  test("navigates to a specific page when clicking page number", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <RelatedGenesPager genes={mockGenes} />
      </MemoryRouter>,
    )

    // Find the "Go to page 3" button and click it
    const goToPage3Button = screen.getByRole("button", {
      name: /go to page 3/i,
    })
    await user.click(goToPage3Button)

    // Third page should contain genes 33-35
    expect(screen.getByText("Gene 33")).toBeInTheDocument()
    expect(screen.getByText("Gene 35")).toBeInTheDocument()

    // Gene from previous page should not be visible
    expect(screen.queryByText("Gene 32")).not.toBeInTheDocument()
  }, 30_000)

  test("resets to page 1 when filter is changed", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <RelatedGenesPager genes={mockGenes} />
      </MemoryRouter>,
    )

    // First navigate to page 2
    const goToPage2Button = screen.getByRole("button", {
      name: /go to page 2/i,
    })
    await user.click(goToPage2Button)

    // Verify we're on page 2
    expect(screen.getByText("Gene 17")).toBeInTheDocument()

    // Now change the filter
    const filterInput = screen.getByPlaceholderText("Filter Genes")
    await user.type(filterInput, "Gene 01")

    // Should reset to page 1, but since our mocks don't actually filter,
    // we'll just check that the first page genes are visible again
    expect(screen.queryByText("Gene 17")).not.toBeInTheDocument()
    expect(screen.getByText("Gene 01")).toBeInTheDocument()
  }, 30_000)

  test("resets to page 1 when group is changed", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <RelatedGenesPager genes={mockGenes} />
      </MemoryRouter>,
    )

    // First navigate to page 2
    const goToPage2Button = screen.getByRole("button", {
      name: /go to page 2/i,
    })
    await user.click(goToPage2Button)

    // Verify we're on page 2
    expect(screen.getByText("Gene 17")).toBeInTheDocument()

    // Now change the group
    const groupChangeButton = screen.getByText("All Gene Types")
    await user.click(groupChangeButton)

    await user.click(screen.getByText("Named Genes"))

    // Should reset to page 1, but since our mocks don't actually filter,
    // we'll just check that the first page genes are visible again
    expect(screen.queryByText("Gene 17")).not.toBeInTheDocument()
    expect(screen.getByText("Gene 01")).toBeInTheDocument()
  }, 30_000)

  test("shows EmptyGenesDisplay when no genes match filter", () => {
    // Create a test with empty array
    render(
      <MemoryRouter>
        <RelatedGenesPager genes={[]} />
      </MemoryRouter>,
    )

    // Should show empty genes display with its message
    expect(screen.getByText("No Matching Genes")).toBeInTheDocument()

    // First gene shouldn't be present
    expect(screen.queryByText("Gene 1")).not.toBeInTheDocument()
  })
})
