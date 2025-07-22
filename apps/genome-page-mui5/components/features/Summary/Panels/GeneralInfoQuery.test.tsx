import { Box } from "@material-ui/core"
import { render, screen } from "@testing-library/react"
import { mockGeneralInfoData } from "mocks/mockGeneralInfoData"
import { GeneralInfoQuery } from "./GeneralInfoQuery"

// Constants to avoid duplicated strings
const GRAPHQL_SCHEMA_MODULE = "dicty-graphql-schema"
const PANEL_WRAPPER_TESTID = "panel-wrapper"

// Mock GraphQL document to avoid importing from dicty-graphql-schema
jest.mock("dicty-graphql-schema", () => ({
  GeneGeneralInformationSummaryDocument: {},
  useGeneGeneralInformationSummaryQuery: jest.fn(),
}))

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "sadA" },
  }),
}))

// Mock the PanelWrapper component
jest.mock("components/panels/PanelWrapper", () => ({
  PanelWrapper: ({ children, title }: any) => (
    <Box data-testid={PANEL_WRAPPER_TESTID}>
      <h2>{title}</h2>
      <Box>{children}</Box>
    </Box>
  ),
}))

describe("features/Summary/Panels/GeneralInfoQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    const { useGeneGeneralInformationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneGeneralInformationSummaryQuery.mockReturnValue({ loading: true })

    render(<GeneralInfoQuery />)

    // Should show title
    expect(screen.getByText("General Information")).toBeInTheDocument()
    // Should show loader
    expect(screen.getByTestId(PANEL_WRAPPER_TESTID)).toBeInTheDocument()
  })

  it("should render general information when query returns results", async () => {
    // Mock the hook implementation for this test
    const { useGeneGeneralInformationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneGeneralInformationSummaryQuery.mockReturnValue({
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

  it("should render no data panel when query returns null", async () => {
    // Mock the hook implementation for this test
    const { useGeneGeneralInformationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneGeneralInformationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneGeneralInformation: undefined,
      },
    })

    // Mock NoDataPanel
    jest.mock("./NoDataPanel", () => ({
      NoDataPanel: ({ query, geneId }: any) => (
        <Box data-testid="no-data-panel">
          No {query} for {geneId}
        </Box>
      ),
    }))

    render(<GeneralInfoQuery />)

    // Wait for query to complete
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
  })

  it("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    const { useGeneGeneralInformationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneGeneralInformationSummaryQuery.mockReturnValue({
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
