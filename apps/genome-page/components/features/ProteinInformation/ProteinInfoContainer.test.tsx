import React from "react"
import { render, screen } from "@testing-library/react"
import ProteinInfoContainer from "./ProteinInfoContainer"
import { GeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"
const useRouter = jest.spyOn(require("next/router"), "useRouter")

describe("features/ProteinInformation/ProteinInfoContainer", () => {
  it("should render fetched data", () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname: `gene/sadA/proteinInformation`,
    }))
    render(<ProteinInfoContainer gene={mockGene as GeneQuery} />)

    // Tab
    expect(screen.getByText("Protein Information")).toBeInTheDocument()

    // General information
    const GeneralInfoPanel = screen.getByText(/General Information/)
    expect(GeneralInfoPanel).toBeInTheDocument()
    expect(
      screen.getByText(
        "EGF repeat-containing 9 transmembrane molecule involved in substrate adhesion",
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "*This information was obtained from UniProt manually reviewed record",
      ),
    ).toBeInTheDocument()

    // Links
    const LinkPanel = screen.getByText(/External Links/)
    expect(LinkPanel).toBeInTheDocument()
    expect(screen.getByText("UniProtKB: Q8I7T3")).toBeInTheDocument()
    expect(screen.getByText("GenBank Protein")).toBeInTheDocument()

    // Protein Sequence
    const ProteinSequencePanel = screen.getAllByText(/Protein Sequence/)
    expect(ProteinSequencePanel.length).toBe(2)
  })
})
