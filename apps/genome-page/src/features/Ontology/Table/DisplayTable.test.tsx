import React from "react"
import { fireEvent, render, screen, within } from "@testing-library/react"
import DisplayTable from "./DisplayTable"
import mockGraphQLData from "common/mocks/mockGraphQLData"

const data = mockGraphQLData.data.gene.goas

describe("features/Ontology/Table/DisplayTable", () => {
  it("should render expected table columns", () => {
    render(<DisplayTable data={data} />)
    expect(screen.getByText(/Qualifier/)).toBeInTheDocument()
    expect(screen.getByText(/Extensions/)).toBeInTheDocument()
    expect(screen.getByText(/Evidence/)).toBeInTheDocument()
    expect(screen.getByText(/With/)).toBeInTheDocument()
    expect(screen.getByText(/Reference/)).toBeInTheDocument()
    expect(screen.getByText(/Date/)).toBeInTheDocument()
    expect(screen.getByText(/Source/)).toBeInTheDocument()
  })

  it("should sort column on click", () => {
    render(<DisplayTable data={data} />)
    // verify date column exists
    const dateCol = screen.getByText(/Date/)
    expect(dateCol).toBeInTheDocument()
    // verify newest date is listed first
    const firstRow = screen.getByTestId("table-row-0")
    expect(within(firstRow).getByText("2020-07-18")).toBeInTheDocument()
    // click column header
    fireEvent.click(dateCol)
    // verify oldest date is now listed first
    expect(within(firstRow).getByText("2003-07-23")).toBeInTheDocument()
  })
})
