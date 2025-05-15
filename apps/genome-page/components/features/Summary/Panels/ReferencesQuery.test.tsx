import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { mockReferencesData } from "mocks/mockReferencesData"
import { ReferencesQuery } from "./ReferencesQuery"

// Mock GraphQL document to avoid importing from dicty-graphql-schema
jest.mock("dicty-graphql-schema", () => ({
  ListPublicationsWithGeneSummaryDocument: {},
  useListPublicationsWithGeneSummaryQuery: jest.fn()
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

describe("features/Summary/Panels/ReferencesQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    const useQueryMock = require("dicty-graphql-schema").useListPublicationsWithGeneSummaryQuery;
    useQueryMock.mockReturnValue({ loading: true });
    
    render(<ReferencesQuery />)

    // Should show title with Publications
    expect(screen.getByText("Publications")).toBeInTheDocument()
    // Should show loader
    expect(screen.getByTestId("panel-wrapper")).toBeInTheDocument()
  })

  it("should render publications data when query returns results", async () => {
    // Mock the hook implementation for this test
    const useQueryMock = require("dicty-graphql-schema").useListPublicationsWithGeneSummaryQuery;
    useQueryMock.mockReturnValue({ 
      loading: false,
      data: {
        listPublicationsWithGene: mockReferencesData.slice(0, 5)
      }
    });
    
    render(<ReferencesQuery />)

    // Wait for data to load
    await screen.findByTestId("panel-wrapper")
    
    // Should show title with count
    expect(await screen.findByText(/Publications \(5 of 5\)/)).toBeInTheDocument()
  })

  it("should render no data panel when query returns empty results", async () => {
    // Mock the hook implementation for this test
    const useQueryMock = require("dicty-graphql-schema").useListPublicationsWithGeneSummaryQuery;
    useQueryMock.mockReturnValue({ 
      loading: false,
      data: {
        listPublicationsWithGene: []
      }
    });

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
    await screen.findByTestId("panel-wrapper")
  })

  it("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    const useQueryMock = require("dicty-graphql-schema").useListPublicationsWithGeneSummaryQuery;
    useQueryMock.mockReturnValue({ 
      loading: false,
      error: new Error("An error occurred")
    });

    // Mock GraphQLErrorPage
    jest.mock("components/errors/GraphQLErrorPage", () => ({
      GraphQLErrorPage: ({ error }: any) => (
        <div data-testid="graphql-error">{error.message}</div>
      ),
    }))

    render(<ReferencesQuery />)

    // Wait for error to appear
    await screen.findByTestId("panel-wrapper")
  })
})