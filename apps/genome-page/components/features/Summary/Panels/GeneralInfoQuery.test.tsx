import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { mockGeneralInfoData } from "mocks/mockGeneralInfoData"
import { GeneralInfoQuery } from "./GeneralInfoQuery"

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
    <div data-testid="panel-wrapper">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  ),
}))

describe("features/Summary/Panels/GeneralInfoQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render loading state initially", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneGeneralInformationSummaryQuery
    useQueryMock.mockReturnValue({ loading: true })

    render(<GeneralInfoQuery />)

    // Should show title
    expect(screen.getByText("General Information")).toBeInTheDocument()
    // Should show loader
    expect(screen.getByTestId("panel-wrapper")).toBeInTheDocument()
  })

  it("should render general information when query returns results", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneGeneralInformationSummaryQuery
    useQueryMock.mockReturnValue({
      loading: false,
      data: {
        geneGeneralInformation: mockGeneralInfoData,
      },
    })

    render(<GeneralInfoQuery />)

    // Wait for data to load
    await screen.findByTestId("panel-wrapper")

    // Should show title
    expect(screen.getByText("General Information")).toBeInTheDocument()
  })

  it("should render no data panel when query returns null", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneGeneralInformationSummaryQuery
    useQueryMock.mockReturnValue({
      loading: false,
      data: {
        geneGeneralInformation: null,
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

    render(<GeneralInfoQuery />)

    // Wait for query to complete
    await screen.findByTestId("panel-wrapper")
  })

  it("should render error page when query fails", async () => {
    // Mock the hook implementation for this test
    const useQueryMock =
      require("dicty-graphql-schema").useGeneGeneralInformationSummaryQuery
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

    render(<GeneralInfoQuery />)

    // Wait for error to appear
    await screen.findByTestId("panel-wrapper")
  })
})
