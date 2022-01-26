import { render, screen } from "@testing-library/react"
import SummaryContainer from "./SummaryContainer"
import { useGeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"
import { ApolloError } from "@apollo/client"

jest.mock("next/router", () => {
  const useRouter = () => ({
    push: (value: string) => value,
  })
  return {
    useRouter,
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

    render(<SummaryContainer />)
    // Display loading
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should display data", () => {
    ;(useGeneQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockGene,
    })

    render(<SummaryContainer />)

    // Render data
    expect(screen.getByText(/Molecular Function/)).toBeInTheDocument()
    expect(screen.getByText(/Biological Process/)).toBeInTheDocument()
    expect(screen.getByText(/Cellular Component/)).toBeInTheDocument()
  })

  it("should display apollo error", () => {
    ;(useGeneQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: new ApolloError({}),
      data: undefined,
    })
    render(<SummaryContainer />)
  })
})
