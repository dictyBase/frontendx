import React from "react"
import { fireEvent, render, screen, within } from "@testing-library/react"
import GoaDisplayTable from "./GoaDisplayTable"

const mockData = [
  {
    id: "UniProtKB:Q8I7T3!118751973",
    type: "biological_process",
    date: "20120926",
    evidence_code: "IMP",
    go_term: "phagocytosis",
    qualifier: "acts_upstream_of_or_within",
    publication: "PMID:22219373",
    assigned_by: "dictyBase",
    with: [],
    extensions: [],
  },
  {
    id: "UniProtKB:Q8I7T3!118751974",
    type: "biological_process",
    date: "20030723",
    evidence_code: "IMP",
    go_term: "phagocytosis",
    qualifier: "acts_upstream_of_or_within",
    publication: "PMID:12499361",
    assigned_by: "dictyBase",
    with: [],
    extensions: [],
  },
  {
    id: "UniProtKB:Q8I7T3!118751975",
    type: "cellular_component",
    date: "20181129",
    evidence_code: "IDA",
    go_term: "plasma membrane",
    qualifier: "part_of",
    publication: "PMID:21441344",
    assigned_by: "dictyBase",
    with: [],
    extensions: [],
  },
  {
    id: "UniProtKB:Q8I7T3!118751976",
    type: "biological_process",
    date: "20051219",
    evidence_code: "IMP",
    go_term: "cell morphogenesis",
    qualifier: "acts_upstream_of_or_within",
    publication: "PMID:12499361",
    assigned_by: "dictyBase",
    with: [],
    extensions: [],
  },
]

describe("features/Ontology/Table/GoaDisplayTable", () => {
  it("should render expected table columns", () => {
    render(<GoaDisplayTable data={mockData} />)
    expect(screen.getByText(/Qualifier/)).toBeInTheDocument()
    expect(screen.getByText(/Extensions/)).toBeInTheDocument()
    expect(screen.getByText(/Evidence/)).toBeInTheDocument()
    expect(screen.getByText(/With/)).toBeInTheDocument()
    expect(screen.getByText(/Reference/)).toBeInTheDocument()
    expect(screen.getByText(/Date/)).toBeInTheDocument()
    expect(screen.getByText(/Source/)).toBeInTheDocument()
  })

  it("should sort column on click", () => {
    // here we are sorting by date, four elements with these values:
    // "20120926", "20030723", "20181129", "20051219"

    render(<GoaDisplayTable data={mockData} />)
    // verify date column exists
    const dateCol = screen.getByText(/Date/)
    expect(dateCol).toBeInTheDocument()
    // get each table row
    const firstRow = screen.getAllByTestId("table-row")[0]
    const secondRow = screen.getAllByTestId("table-row")[1]
    const thirdRow = screen.getAllByTestId("table-row")[2]
    const lastRow = screen.getAllByTestId("table-row")[3]
    // verify newest date is listed first
    // followed by rows in correct order
    expect(within(firstRow).getByText("2018-11-29")).toBeInTheDocument()
    expect(within(secondRow).getByText("2012-09-26")).toBeInTheDocument()
    expect(within(thirdRow).getByText("2005-12-19")).toBeInTheDocument()
    expect(within(lastRow).getByText("2003-07-23")).toBeInTheDocument()
    // click column header
    fireEvent.click(dateCol)
    // verify oldest date is now listed first
    expect(within(firstRow).getByText("2003-07-23")).toBeInTheDocument()
    expect(within(secondRow).getByText("2005-12-19")).toBeInTheDocument()
    expect(within(thirdRow).getByText("2012-09-26")).toBeInTheDocument()
    expect(within(lastRow).getByText("2018-11-29")).toBeInTheDocument()
    // now click to flip the list again
    fireEvent.click(dateCol)
    expect(within(firstRow).getByText("2018-11-29")).toBeInTheDocument()
    expect(within(secondRow).getByText("2012-09-26")).toBeInTheDocument()
    expect(within(thirdRow).getByText("2005-12-19")).toBeInTheDocument()
    expect(within(lastRow).getByText("2003-07-23")).toBeInTheDocument()
  })
})
