import { render, screen } from "@testing-library/react"
import SummaryContainer from "./SummaryContainer"
import { GeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

describe("features/Summary/SummaryContainer", () => {
  beforeEach(() => jest.clearAllMocks())
  it("should display data for sadA", async () => {
    await new Promise(process.nextTick)
    useRouter.mockImplementation(() => ({
      query: { id: "sadA" },
      pathname: "/gene/[gene]",
    }))
    render(<SummaryContainer gene={mockGene as GeneQuery} />)

    // Render General Information
    expect(screen.getByText(/Name Description/)).toBeInTheDocument()
    expect(screen.getByText(/sadA = Substrate ADhesion/)).toBeInTheDocument()

    expect(screen.getByText(/Gene ID/)).toBeInTheDocument()
    expect(screen.getByText(/DDB_G0288511/)).toBeInTheDocument()

    expect(screen.getByText(/substrate adhesion molecule/)).toBeInTheDocument()

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
    expect(screen.getByText(/952 aa/)).toBeInTheDocument()
    expect(screen.getByText(/104,673.8 Da/)).toBeInTheDocument()

    // Render Associated Sequences
    expect(screen.getByText(/GenBank Genomic Fragment/)).toBeInTheDocument()
    expect(screen.getByText(/AY178767/)).toBeInTheDocument()
    expect(screen.getByText(/ESTs/)).toBeInTheDocument()
    expect(screen.getByText(/DDB0024552/)).toBeInTheDocument()

    // Render Links
    expect(screen.getByText(/Expression/)).toBeInTheDocument()

    expect(screen.getByText(/dictyBase Colleagues/)).toBeInTheDocument()
    expect(screen.getByText(/sadA Researchers/)).toBeInTheDocument()

    expect(screen.getByText(/External Resources/)).toBeInTheDocument()
  })
})
