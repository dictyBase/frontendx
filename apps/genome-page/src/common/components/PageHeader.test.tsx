import React from "react"
import { render, screen } from "@testing-library/react"
import PageHeader from "./PageHeader"
import { useLocation } from "react-router-dom"

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useLocation: jest.fn(),
  }
})

describe("common/components/PageHeader", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render gene summary header", () => {
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: "testdb.dictybase.org/gene/sadA",
    })
    render(<PageHeader gene="sadA" />)
    expect(screen.getByText(/Gene Summary for sadA/)).toBeInTheDocument()
  })

  it("should render go annotations header", () => {
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: "testdb.dictybase.org/gene/sadA/goannotations",
    })
    render(<PageHeader gene="sadA" />)
    expect(
      screen.getByText(/Gene Ontology Annotations for sadA/),
    ).toBeInTheDocument()
  })
})
