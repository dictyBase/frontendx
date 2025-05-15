import { render, screen } from "@testing-library/react"
import { mockReferencesData } from "mocks/mockReferencesData"
import { ReferencesQuery } from "./ReferencesQuery"

// Constants to avoid duplicated strings
const GRAPHQL_SCHEMA_MODULE = "dicty-graphql-schema"
const PANEL_WRAPPER_TESTID = "panel-wrapper"

// Mock GraphQL document to avoid importing from dicty-graphql-schema
jest.mock(GRAPHQL_SCHEMA_MODULE, () => ({
  ListPublicationsWithGeneSummaryDocument: {},
  useListPublicationsWithGeneSummaryQuery: jest.fn(),
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
    <div data-testid={PANEL_WRAPPER_TESTID}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  ),
}))

describe("features/Summary/Panels/ReferencesQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    const { useListPublicationsWithGeneSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useListPublicationsWithGeneSummaryQuery.mockReturnValue({ loading: true })

    render(<ReferencesQuery />)

    // Should show title with Publications
    expect(screen.getByText("Publications")).toBeInTheDocument()
    // Should show loader
    expect(screen.getByTestId(PANEL_WRAPPER_TESTID)).toBeInTheDocument()
  })

  it("should render publications data when query returns results", async () => {
    // Mock the hook implementation for this test
    const { useListPublicationsWithGeneSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useListPublicationsWithGeneSummaryQuery.mockReturnValue({
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

  it("should render no data panel when query returns empty results", async () => {
    // Mock the hook implementation for this test
    const { useListPublicationsWithGeneSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useListPublicationsWithGeneSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        listPublicationsWithGene: [],
      },
    })

    // Mock NoDataPanel
    jest.mock("./NoDataPanel", () => ({
      NoDataPanel: ({ query, geneId }: any) => (
        <div data-testid="no-data-panel">
          No {query} for {geneId}
        </div>
      ),
    }))

    render(<ReferencesQuery />)

    // Wait for query to complete
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
  })

  it("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    const { useListPublicationsWithGeneSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useListPublicationsWithGeneSummaryQuery.mockReturnValue({
      loading: false,
      error: new Error("An error occurred"),
    })

    // Mock GraphQLErrorPage
    jest.mock("components/errors/GraphQLErrorPage", () => ({
      GraphQLErrorPage: ({ error }: any) => (
        <div data-testid="graphql-error">{error.message}</div>
      ),
    }))

    render(<ReferencesQuery />)

    // Wait for error to appear
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
  })
})
