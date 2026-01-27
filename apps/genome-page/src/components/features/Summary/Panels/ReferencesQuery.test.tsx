import { Box } from "@material-ui/core"
import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockReferencesData } from "mocks/mockReferencesData"
import { ReferencesQuery } from "./ReferencesQuery"

// Constants to avoid duplicated strings
const PANEL_WRAPPER_TESTID = "panel-wrapper"

const mockUseListPublicationsWithGeneSummaryQuery = vi.hoisted(() => vi.fn())

// Mock GraphQL document to avoid importing from dicty-graphql-schema
vi.mock("dicty-graphql-schema", () => ({
  ListPublicationsWithGeneSummaryDocument: {},
  useListPublicationsWithGeneSummaryQuery:
    mockUseListPublicationsWithGeneSummaryQuery,
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

describe("features/Summary/Panels/ReferencesQuery", () => {
  beforeEach(() => vi.clearAllMocks())

  test("should render loading state initially", async () => {
    // Mock the hook implementation for this test

    mockUseListPublicationsWithGeneSummaryQuery.mockReturnValue({
      loading: true,
    })

    render(<ReferencesQuery />)

    // Should show title with Publications
    expect(screen.getByText("Publications")).toBeInTheDocument()
    // Should show loader
    expect(screen.getByTestId(PANEL_WRAPPER_TESTID)).toBeInTheDocument()
  })

  test("should render publications data when query returns results", async () => {
    // Mock the hook implementation for this test
    mockUseListPublicationsWithGeneSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        listPublicationsWithGene: mockReferencesData.slice(0, 5),
      },
    })

    render(<ReferencesQuery />)

    // Wait for data to load
    await screen.findByTestId(PANEL_WRAPPER_TESTID)

    // Should show title with count
    expect(
      await screen.findByText(/Publications \(5 of 5\)/),
    ).toBeInTheDocument()
  })

  test("should render no data panel when query returns empty results", async () => {
    // Mock the hook implementation for this test
    mockUseListPublicationsWithGeneSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        listPublicationsWithGene: [],
      },
    })

    // Mock NoDataPanel
    vi.mock("./NoDataPanel", () => ({
      NoDataPanel: ({ query, geneId }: any) => (
        <Box data-testid="no-data-panel">
          No {query} for {geneId}
        </Box>
      ),
    }))

    render(<ReferencesQuery />)

    // Wait for query to complete
    expect(await screen.findByText(/No References/)).toBeInTheDocument()
  })

  test("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    mockUseListPublicationsWithGeneSummaryQuery.mockReturnValue({
      loading: false,
      error: new Error("An error occurred"),
    })

    render(<ReferencesQuery />)

    // Wait for error to appear
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
    expect(
      screen.getByText(
        "We encountered an unexpected error while processing your request.",
      ),
    ).toBeInTheDocument()
  })
})
