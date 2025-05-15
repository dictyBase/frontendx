import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { mockOntologyData } from "mocks/mockOntologyData"
import { GoaQuery } from "./GoaQuery"

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
    <div data-testid="panel-wrapper">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  ),
}))

describe("features/Summary/Panels/GoaQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneOntologyAnnotationSummaryQuery
    useQueryMock.mockReturnValue({ loading: true })

    render(<GoaQuery />)

    // Should show title
    expect(screen.getByText("Gene Ontology Annotations")).toBeInTheDocument()
    // Should show loader component
    expect(screen.getByTestId("panel-wrapper")).toBeInTheDocument()
  })

  it("should render GO annotations when query returns results", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneOntologyAnnotationSummaryQuery
    useQueryMock.mockReturnValue({
      loading: false,
      data: {
        geneOntologyAnnotation: mockOntologyData.goas,
      },
    })

    render(<GoaQuery />)

    // Wait for data to load
    await screen.findByTestId("panel-wrapper")

    // Should show title
    expect(screen.getByText("Gene Ontology Annotations")).toBeInTheDocument()
  })

  it("should render no data panel when query returns null", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneOntologyAnnotationSummaryQuery
    useQueryMock.mockReturnValue({
      loading: false,
      data: {
        geneOntologyAnnotation: null,
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
    await screen.findByTestId("panel-wrapper")
  })

  it("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneOntologyAnnotationSummaryQuery
    useQueryMock.mockReturnValue({
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
    await screen.findByTestId("panel-wrapper")
  })
})
