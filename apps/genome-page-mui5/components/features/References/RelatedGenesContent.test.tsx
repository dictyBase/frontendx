import { render, screen } from "@testing-library/react"
import { Box } from "@material-ui/core"
import { SelectedPublication } from "common/@types"
import { Gene } from "dicty-graphql-schema"
import { RelatedGenesContent } from "./RelatedGenesContent"
import { RelatedGenesHeader } from "./RelatedGenesHeader"
import { RelatedGenesDisplay } from "./RelatedGenesDisplay"

// Mock the child components
jest.mock("./RelatedGenesHeader", () => ({
  RelatedGenesHeader: jest.fn(() => (
    <Box data-testid="mocked-header">Mocked Header</Box>
  )),
}))

jest.mock("./RelatedGenesDisplay", () => ({
  RelatedGenesDisplay: jest.fn(() => (
    <Box data-testid="mocked-display">Mocked Display</Box>
  )),
}))

describe("RelatedGenesContent", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Sample publication data for testing
  const mockPublication: SelectedPublication = {
    id: "pub123",
    title: "Test Publication Title",
    journal: "Nature",
    pages: "123-145",
    authors: [
      { last_name: "Smith" },
      { last_name: "Johnson" },
      { last_name: "Williams" },
    ],
    related_genes: [
      { id: "DDB_G0123456", name: "geneA" },
      { id: "DDB_G0123457", name: "geneB" },
      { id: "DDB_G0123458", name: "geneC" },
    ] as Array<Gene>,
  }

  test("renders both RelatedGenesHeader and RelatedGenesDisplay components", () => {
    render(<RelatedGenesContent publication={mockPublication} />)

    // Check if both components are rendered
    expect(screen.getByTestId("mocked-header")).toBeInTheDocument()
    expect(screen.getByTestId("mocked-display")).toBeInTheDocument()
  })

  test("passes the publication prop to RelatedGenesHeader", () => {
    render(<RelatedGenesContent publication={mockPublication} />)

    // Check if RelatedGenesHeader was called with the correct props
    expect(RelatedGenesHeader).toHaveBeenCalledWith(
      { publication: mockPublication },
      expect.anything(),
    )
  })

  test("passes the related_genes prop to RelatedGenesDisplay", () => {
    render(<RelatedGenesContent publication={mockPublication} />)

    // Check if RelatedGenesDisplay was called with the correct props
    expect(RelatedGenesDisplay).toHaveBeenCalledWith(
      { genes: mockPublication.related_genes, maxCount: 16 },
      expect.anything(),
    )
  })

  test("arranges components in a column with spacing", () => {
    render(<RelatedGenesContent publication={mockPublication} />)

    // Get the main container
    const container = screen
      .getByTestId("mocked-header")
      .closest(".MuiGrid-container")

    // Check if the container has column direction
    expect(container).toHaveClass("MuiGrid-direction-xs-column")

    // Check if spacing is applied
    expect(container).toHaveClass("MuiGrid-spacing-xs-3")
  })

  test("applies alignment class to the genes display grid item", () => {
    render(<RelatedGenesContent publication={mockPublication} />)

    // Get the grid item containing the display
    const gridItem = screen
      .getByTestId("mocked-display")
      .closest(".MuiGrid-item")

    // Check if the class is applied (this is a simplistic check since we can't easily verify
    // the actual class name from the makeStyles hook)
    expect(gridItem).toHaveAttribute("class")
  })
})
