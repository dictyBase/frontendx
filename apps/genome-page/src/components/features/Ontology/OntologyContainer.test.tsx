import React from "react"
import { render, screen } from "@testing-library/react"
import { mockOntologyData } from "mocks/mockOntologyData"
import { OntologyContainer } from "./OntologyContainer"

test("should render fetched data", () => {
  render(<OntologyContainer goas={mockOntologyData.goas} />)

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
