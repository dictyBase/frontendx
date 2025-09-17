import { vi } from "vitest"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { Box } from "@material-ui/core"
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

// Mock the PanelWrapper component
vi.mock("components/panels/PanelWrapper", () => ({
  PanelWrapper: ({ children, title }: any) => (
    <Box data-testid={PANEL_WRAPPER_TESTID}>
      <h2>{title}</h2>
      <Box>{children}</Box>
    </Box>
  ),
}))

const router = createMemoryRouter(
  [{ path: ":id/goannotations", element: <GoaQuery /> }],
  { initialEntries: ["/sadA/goannotations"] },
)

describe("features/Summary/Panels/GoaQuery", () => {
  beforeEach(() => vi.clearAllMocks())

  it("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({ loading: true })

    render(<RouterProvider router={router} />)

    // Should show title
    expect(screen.getByText("Gene Ontology Annotations")).toBeVisible()
    // Should show loader component
    expect(screen.getByTestId(PANEL_WRAPPER_TESTID)).toBeVisible()
  })

  it("should render GO annotations when query returns results", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneOntologyAnnotation: mockOntologyData.goas,
      },
    })

    render(<RouterProvider router={router} />)

    // Wait for data to load
    await screen.findByTestId(PANEL_WRAPPER_TESTID)

    // Should show title
    expect(screen.getByText("Gene Ontology Annotations")).toBeVisible()
  })

  it("should render no data panel when query returns null", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneOntologyAnnotation: undefined,
      },
    })

    render(<RouterProvider router={router} />)

    // Wait for query to complete
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
    expect(screen.getByText(/No GO Annotations for sadA/)).toBeVisible()
  })

  it("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    mockUseGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      error: new Error("An error occurred"),
    })

    render(<RouterProvider router={router} />)

    // Wait for error to appear
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
    expect(
      screen.getByText(
        "We encountered an unexpected error while processing your request.",
      ),
    ).toBeVisible()
  })
})
