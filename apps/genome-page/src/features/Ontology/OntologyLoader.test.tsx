import React from "react"
import { render, screen } from "@testing-library/react"
import OntologyLoader from "./OntologyLoader"

const gene = "DDB_G123456"

jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({
      pathname: `gene/${gene}/goannotations`,
    }),
  }
})

describe("components/OntologyLoader", () => {
  it("should render correct page header", () => {
    render(<OntologyLoader gene={gene} />)
    expect(
      screen.getByText(`Gene Ontology Annotations for ${gene}`),
    ).toBeInTheDocument()
  })

  it("should render skeleton loader", () => {
    render(<OntologyLoader gene={gene} />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
