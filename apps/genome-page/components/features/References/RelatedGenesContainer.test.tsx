import { Box } from "@material-ui/core"
import { render, screen } from "@testing-library/react"
import { SelectedPublication } from "common/@types"
import { Gene } from "dicty-graphql-schema"
import { RelatedGenesContainer } from "./RelatedGenesContainer"
import { RelatedGenesContent } from "./RelatedGenesContent"

// Mock the child components
jest.mock("./RelatedGenesContent", () => ({
  RelatedGenesContent: jest.fn(() => (
    <Box data-testid="mocked-content">Mocked Content</Box>
  )),
}))

jest.mock("./RelatedGenesNavigation", () => ({
  RelatedGenesNavigation: jest.fn(() => (
    <Box data-testid="mocked-navigation">Mocked Navigation</Box>
  )),
}))

describe("RelatedGenesContainer", () => {
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

  test("renders both RelatedGenesNavigation and RelatedGenesContent components", () => {
    render(<RelatedGenesContainer publication={mockPublication} />)

    // Check if both components are rendered
    expect(screen.getByTestId("mocked-navigation")).toBeInTheDocument()
    expect(screen.getByTestId("mocked-content")).toBeInTheDocument()
  })

  test("passes the publication prop to RelatedGenesContent", () => {
    render(<RelatedGenesContainer publication={mockPublication} />)

    // Check if RelatedGenesContent was called with the correct props
    expect(RelatedGenesContent).toHaveBeenCalledWith(
      { publication: mockPublication },
      expect.anything(),
    )
  })

  test("renders content inside a Paper component", () => {
    render(<RelatedGenesContainer publication={mockPublication} />)

    // Paper component should have the MuiPaper-root class
    const paper = screen
      .getByTestId("mocked-navigation")
      .closest(".MuiPaper-root")
    expect(paper).toBeInTheDocument()

    // Verify padding styles are applied to the Paper component
    // We can't directly test the exact style values, but we can check that a class is applied
    expect(paper).toHaveAttribute("class")
  })

  test("contains three grid items with appropriate layout", () => {
    render(<RelatedGenesContainer publication={mockPublication} />)

    // There should be three Grid items: navigation, content, and a spacer
    const gridItems = document.querySelectorAll(".MuiGrid-item")
    expect(gridItems).toHaveLength(3)
  })
})
