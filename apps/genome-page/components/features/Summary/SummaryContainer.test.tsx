import { render, screen } from "@testing-library/react"
import SummaryContainer from "./SummaryContainer"
import { GeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

describe("features/Summary/SummaryContainer", () => {
  beforeEach(() => jest.clearAllMocks())
  it("should display data", () => {
    useRouter.mockImplementation(() => ({
      query: { id: "sadA" },
      pathname: "/gene/[gene]",
    }))
    render(<SummaryContainer gene={mockGene as GeneQuery} />)

    // Render data
    expect(screen.getByText(/Molecular Function/)).toBeInTheDocument()
    expect(screen.getByText(/Biological Process/)).toBeInTheDocument()
    expect(screen.getByText(/Cellular Component/)).toBeInTheDocument()
  })
})
