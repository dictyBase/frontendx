import { vi } from "vitest"
import { Box } from "@material-ui/core"
import { render, screen } from "@testing-library/react"
import { mockOntologyData } from "mocks/mockOntologyData"
import { GoAnnotation } from "dicty-graphql-schema"
import { GoaPanel } from "./GoaPanel"

// Mock any GraphQL schema types that might be imported
vi.mock("dicty-graphql-schema", () => ({
  GeneOntologyAnnotationSummaryQuery: {},
}))

// Mock the ItemDisplay component
vi.mock("components/panels/ItemDisplay", () => ({
  ItemDisplay: ({ children }: any) => (
    <Box data-testid="item-display">{children}</Box>
  ),
}))

// Mock the LeftDisplay component
vi.mock("components/panels/LeftDisplay", () => ({
  LeftDisplay: ({ children }: any) => (
    <Box data-testid="left-display">{children}</Box>
  ),
}))

// Mock the RightDisplay component
vi.mock("components/panels/RightDisplay", () => ({
  RightDisplay: ({ children }: any) => (
    <Box data-testid="right-display">{children}</Box>
  ),
}))

// Mock the GoaPanelContent component
vi.mock("./GoaPanelContent", () => ({
  GoaPanelContent: ({ goa }: any) => (
    <Box data-testid="goa-panel-content">{goa.go_term}</Box>
  ),
}))

describe("features/Summary/Panels/GoaPanel", () => {
  it("should render all GO sections if present", () => {
    render(<GoaPanel goas={mockOntologyData.goas} />)

    // Check that we have all three GO sections
    expect(screen.getByText("Molecular Function")).toBeInTheDocument()
    expect(screen.getByText("Biological Process")).toBeInTheDocument()
    expect(screen.getByText("Cellular Component")).toBeInTheDocument()

    // Check that ItemDisplay components were rendered
    expect(screen.getAllByTestId("item-display")).toHaveLength(3)

    // Check that LeftDisplay components were rendered
    expect(screen.getAllByTestId("left-display")).toHaveLength(3)

    // Check that RightDisplay components were rendered
    expect(screen.getAllByTestId("right-display")).toHaveLength(3)
  })

  it("should not display a GO section if there are no goas for it", () => {
    render(<GoaPanel goas={[]} />)
    // Check that no GO sections are rendered
    expect(screen.queryByText("Molecular Function")).toBeNull()
    expect(screen.queryByText("Biological Process")).toBeNull()
    expect(screen.queryByText("Cellular Component")).toBeNull()
  })
  it("should filter and display molecular function annotations", () => {
    render(<GoaPanel goas={mockOntologyData.goas} />)

    // There is one molecular function annotation with evidence code IPI in test data
    expect(screen.getByText("protein binding")).toBeInTheDocument()
  })

  it("should filter and display biological process annotations", () => {
    render(<GoaPanel goas={mockOntologyData.goas} />)

    // There are multiple biological process annotations with evidence code IMP, should display 5 most recent
    const bioProcessItems = mockOntologyData.goas
      .filter(
        (item) =>
          item.type === "biological_process" &&
          ["IMP", "IGI", "IDA", "IPI", "IEP", "EXP"].includes(
            item.evidence_code,
          ),
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
      .map((item) => item.go_term)

    // Check that at least one biological process term is displayed
    expect(screen.getByText(bioProcessItems[0])).toBeInTheDocument()
  })

  it("should filter and display cellular component annotations", () => {
    render(<GoaPanel goas={mockOntologyData.goas} />)

    // There are cellular component annotations with evidence code IDA, should display them
    const cellularItems = mockOntologyData.goas
      .filter(
        (item) =>
          item.type === "cellular_component" &&
          ["IMP", "IGI", "IDA", "IPI", "IEP", "EXP"].includes(
            item.evidence_code,
          ),
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
      .map((item) => item.go_term)

    // Check that at least one cellular component term is displayed
    expect(screen.getByText(cellularItems[0])).toBeInTheDocument()
  })

  it("should use manual annotations if no experimental annotations", () => {
    // Create mock data with no experimental annotations for molecular function
    const mockDataNoExp = {
      goas: [
        {
          id: "test1",
          type: "molecular_function",
          date: "20211010",
          evidence_code: "ISS", // not experimental
          go_term: "test manual annotation",
          qualifier: "enables",
          publication: "PMID:12345678",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
          __typename: "GOAnnotation",
        } as GoAnnotation,
        ...mockOntologyData.goas.filter((g) => g.type !== "molecular_function"),
      ],
    }

    render(<GoaPanel goas={mockDataNoExp.goas} />)

    // Should show the manual annotation since there's no experimental one
    expect(screen.getByText("test manual annotation")).toBeInTheDocument()
  })
})
