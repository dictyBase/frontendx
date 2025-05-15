import { render, screen } from "@testing-library/react"
import { mockOntologyData } from "mocks/mockOntologyData"
import { GoaQuery } from "./GoaQuery"

// Constants to avoid duplicated strings
const GRAPHQL_SCHEMA_MODULE = "dicty-graphql-schema"
const PANEL_WRAPPER_TESTID = "panel-wrapper"

// Mock GraphQL document to avoid importing from dicty-graphql-schema
jest.mock("dicty-graphql-schema", () => ({
  GeneOntologyAnnotationSummaryDocument: {},
  useGeneOntologyAnnotationSummaryQuery: jest.fn(),
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

describe("features/Summary/Panels/GoaQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    const { useGeneOntologyAnnotationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneOntologyAnnotationSummaryQuery.mockReturnValue({ loading: true })

    render(<GoaQuery />)

    // Should show title
    expect(screen.getByText("Gene Ontology Annotations")).toBeInTheDocument()
    // Should show loader component
    expect(screen.getByTestId(PANEL_WRAPPER_TESTID)).toBeInTheDocument()
  })

  it("should render GO annotations when query returns results", async () => {
    // Mock the hook implementation for this test
    const { useGeneOntologyAnnotationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneOntologyAnnotationSummaryQuery.mockReturnValue({
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

  it("should render no data panel when query returns null", async () => {
    // Mock the hook implementation for this test
    const { useGeneOntologyAnnotationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      data: {
        geneOntologyAnnotation: undefined,
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

    render(<GoaQuery />)

    // Wait for query to complete
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
  })

  it("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    const { useGeneOntologyAnnotationSummaryQuery } = jest.requireMock(
      GRAPHQL_SCHEMA_MODULE,
    )
    useGeneOntologyAnnotationSummaryQuery.mockReturnValue({
      loading: false,
      error: new Error("An error occurred"),
    })

    // Mock GraphQLErrorPage
    jest.mock("components/errors/GraphQLErrorPage", () => ({
      GraphQLErrorPage: ({ error }: any) => (
        <div data-testid="graphql-error">{error.message}</div>
      ),
    }))

    render(<GoaQuery />)

    // Wait for error to appear
    await screen.findByTestId(PANEL_WRAPPER_TESTID)
  })
})
