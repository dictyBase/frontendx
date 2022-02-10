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

    // Render Latest Gene Ontology Annotations
    expect(screen.getByText(/Molecular Function/)).toBeInTheDocument()
    expect(screen.getByText(/Biological Process/)).toBeInTheDocument()
    expect(screen.getByText(/Cellular Component/)).toBeInTheDocument()

    // Render Latest References
    expect(screen.getByText(/Kamprad, Witt, Schroder, Kreis, Baumchen, Janshoff & Tarantola/)).toBeInTheDocument()
    expect(screen.getByText(/Tarantola, Bae, Fuller, Bodenschatz, Rappel & Loomis/)).toBeInTheDocument()
    expect(screen.getByText(/Wu & Janetopoulos/)).toBeInTheDocument()
  })
})
