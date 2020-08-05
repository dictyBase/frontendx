import React from "react"
import { render, screen } from "@testing-library/react"
import OntologyLoader from "./OntologyLoader"
import { useLocation } from "react-router-dom"

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useLocation: jest.fn(),
    useParams: jest.fn(),
  }
})

describe("common/components/OntologyLoader", () => {
  const gene = "DDB_G123456"
  beforeEach(() =>
    (useLocation as jest.Mock).mockReturnValue({
      pathname: `testdb.dictybase.org/gene/${gene}/goannotations`,
    }),
  )

  it("should render correct page header", () => {
    render(<OntologyLoader gene={gene} />)
    expect(
      screen.getByText(/Gene Ontology Annotations for DDB_G123456/),
    ).toBeInTheDocument()
  })

  it("should render skeleton loader", () => {
    render(<OntologyLoader gene={gene} />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
