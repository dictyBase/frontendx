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

    // wait for data to load...
    const GeneralInfoPanel = screen.getByText(/General Information/)
    expect(GeneralInfoPanel).toBeInTheDocument()
    const LinkPanel = screen.getByText(/External Links/)
    expect(LinkPanel).toBeInTheDocument()
    const ProteinSequencePanel = screen.getAllByText(/Protein Sequence/)
    expect(ProteinSequencePanel.length).toBe(2)
  })
})
