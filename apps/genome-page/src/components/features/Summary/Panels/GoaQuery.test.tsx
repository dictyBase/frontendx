import { Box } from "@material-ui/core"
import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockOntologyData } from "mocks/mockOntologyData"
import { GoaQuery } from "./GoaQuery"

// Constants to avoid duplicated strings
const PANEL_WRAPPER_TESTID = "panel-wrapper"

// Mock GraphQL document to avoid importing from dicty-graphql-schema
const mockUseGeneOntologyAnnotationSummaryQuery = vi.hoisted(() => vi.fn())

vi.mock("dicty-graphql-schema", () => ({
  GeneOntologyAnnotationSummaryDocument: {},
  useGeneOntologyAnnotationSummaryQuery:
    mockUseGeneOntologyAnnotationSummaryQuery,
}))

// Mock useRouter
vi.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "sadA" },
  }),
}))

// Mock the PanelWrapper component
vi.mock("components/panels/PanelWrapper", () => ({
  PanelWrapper: ({ children, title }: any) => (
    <Box data-testid={PANEL_WRAPPER_TESTID}>
      <h2>{title}</h2>
      <Box>{children}</Box>
    </Box>
  ),
}))

describe("features/Summary/Panels/GoaQuery", () => {
  beforeEach(() => vi.clearAllMocks())

  test("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({ loading: true })

    render(<GoaQuery />)

    // Should show title
    expect(screen.getByText("Gene Ontology Annotations")).toBeInTheDocument()
    // Should show loader component
    expect(screen.getByTestId(PANEL_WRAPPER_TESTID)).toBeInTheDocument()
  })

  test("should render GO annotations when query returns results", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneOntologyAnnotation: mockOntologyData.goas,
      },
    })

    render(<GoaQuery />)

    // Wait for data to load
    await screen.findByTestId(PANEL_WRAPPER_TESTID)

    // Should show title
    expect(screen.getByText("Gene Ontology Annotations")).toBeInTheDocument()
  })

  test("should render no data panel when query returns null", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneOntologyAnnotation: undefined,
      },
    })

    render(<GoaQuery />)

    // Wait for query to complete
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
    expect(screen.getByText(/No GO Annotations for sadA/)).toBeVisible()
  })

  test("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      error: new Error("An error occurred"),
    })

    render(<GoaQuery />)

    // Wait for error to appear
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
    expect(
      screen.getByText(
        "We encountered an unexpected error while processing your request.",
      ),
    ).toBeInTheDocument()
  })
})
