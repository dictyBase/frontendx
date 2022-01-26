import React from "react"
import { render, screen } from "@testing-library/react"
import OntologyContainer from "./OntologyContainer"
import { GeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"
const useRouter = jest.spyOn(require("next/router"), "useRouter")

describe("features/Ontology/OntologyContainer", () => {
  it("should render fetched data", () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname: "testdb.dictybase.org/gene/sadA/goannotations",
    }))
    render(<OntologyContainer gene={mockGene as GeneQuery} />)

    // wait for data to load...
    const molecularPanel = screen.getByText(/Molecular Function/)
    expect(molecularPanel).toBeInTheDocument()
    const biologicalPanel = screen.getByText(/Biological Process/)
    expect(biologicalPanel).toBeInTheDocument()
    const cellularPanel = screen.getByText(/Cellular Component/)
    expect(cellularPanel).toBeInTheDocument()
    const innerTab = screen.getByText(/All GO/)
    expect(innerTab).toBeInTheDocument()
  })
})
