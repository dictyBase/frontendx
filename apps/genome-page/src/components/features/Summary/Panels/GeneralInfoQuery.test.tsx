import { Box } from "@material-ui/core"
import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockGeneralInfoData } from "mocks/mockGeneralInfoData"
import { GeneralInfoQuery } from "./GeneralInfoQuery"

// Constants to avoid duplicated strings
const PANEL_WRAPPER_TESTID = "panel-wrapper"
const TEST_GENE = "sadA"

const mockUseGeneGeneralInformationSummaryQuery = vi.hoisted(() => vi.fn())

// Mock GraphQL documenconst mock t to avoid importing from dicty-graphql-schema
vi.mock("dicty-graphql-schema", () => ({
  GeneGeneralInformationSummaryDocument: {},
  useGeneGeneralInformationSummaryQuery:
    mockUseGeneGeneralInformationSummaryQuery,
}))

// Mock useRouter
vi.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: TEST_GENE },
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

describe("features/Summary/Panels/GeneralInfoQuery", () => {
  beforeEach(() => vi.clearAllMocks())

  test("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    mockUseGeneGeneralInformationSummaryQuery.mockReturnValue({ loading: true })

    render(<GeneralInfoQuery />)

    // Should show title
    expect(screen.getByText("General Information")).toBeInTheDocument()
    // Should show loader
    expect(screen.getByTestId(PANEL_WRAPPER_TESTID)).toBeInTheDocument()
  })

  test("should query with the gene id in the provided in the route parameters", () => {
    render(<GeneralInfoQuery />)

    expect(mockUseGeneGeneralInformationSummaryQuery).toHaveBeenCalledWith({
      variables: {
        gene: TEST_GENE,
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
      errorPolicy: "all",
    })
  })

  test("should render general information when query returns results", async () => {
    // Mock the hook implementation for this test
    mockUseGeneGeneralInformationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneGeneralInformation: mockGeneralInfoData,
      },
    })

    render(<GeneralInfoQuery />)

    // Wait for data to load
    await screen.findByTestId(PANEL_WRAPPER_TESTID)

    // Should show title
    expect(screen.getByText("General Information")).toBeInTheDocument()
  })

  test("should render no data panel when query returns null", async () => {
    // Mock the hook implementation for this test
    mockUseGeneGeneralInformationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneGeneralInformation: undefined,
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

    render(<GeneralInfoQuery />)

    // Wait for query to complete
    const panelWrapper = await screen.findByTestId(PANEL_WRAPPER_TESTID)
    expect(panelWrapper).toHaveTextContent(/No Gene Summary for sadA/)
  })

  test("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    mockUseGeneGeneralInformationSummaryQuery.mockReturnValue({
      loading: false,
      error: new Error("An error occurred"),
    })

    render(<GeneralInfoQuery />)

    // Wait for error to appear
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
    expect(
      screen.getByText(
        "We encountered an unexpected error while processing your request.",
      ),
    ).toBeInTheDocument()
  })
})
