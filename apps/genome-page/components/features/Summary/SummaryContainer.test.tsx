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
    expect(
      screen.getByText(
        /Kamprad, Witt, Schroder, Kreis, Baumchen, Janshoff & Tarantola/,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Tarantola, Bae, Fuller, Bodenschatz, Rappel & Loomis/),
    ).toBeInTheDocument()
    expect(screen.getByText(/Wu & Janetopoulos/)).toBeInTheDocument()

    // Render Gene Product Information
    expect(
      screen.getByText(/Derived from gene prediction. Supported by mRNA./),
    ).toBeInTheDocument()
    expect(screen.getByText(/1,148 aa/)).toBeInTheDocument()
    expect(screen.getByText(/129,527.5 Da/)).toBeInTheDocument()

    // Render General Information
    expect(screen.getByText(/Name Description/)).toBeInTheDocument()
    expect(screen.getByText(/DG1117, amiA, pia, rictor/)).toBeInTheDocument()
  })
})
