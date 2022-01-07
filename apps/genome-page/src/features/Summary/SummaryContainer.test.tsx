import { render, screen } from "@testing-library/react"
import SummaryContainer from "features/Summary/SummaryContainer"
import { useGeneQuery } from "dicty-graphql-schema"
import { BrowserRouter } from "react-router-dom"
import mockGene from "mocks/mockGene"

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useLocation: () => ({
      pathname: "testdb.dictybase.org/gene/sadA",
    }),
    useParams: () => ({
      gene: "sadA",
    }),
  }
})

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/Summary/SummaryContainer", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should display loading state", async () => {
    ;(useGeneQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: undefined,
      data: {},
    })

    render(
      <BrowserRouter>
        <SummaryContainer />
      </BrowserRouter>,
    )
    // Display loading
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should display data", () => {
    ;(useGeneQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockGene,
    })

    render(
      <BrowserRouter>
        <SummaryContainer />
      </BrowserRouter>,
    )

    // Render data
    expect(screen.getByText(/Molecular Function/)).toBeInTheDocument()
    expect(screen.getByText(/Biological Process/)).toBeInTheDocument()
    expect(screen.getByText(/Cellular Component/)).toBeInTheDocument()
  })

  it("should display apollo error")
})
