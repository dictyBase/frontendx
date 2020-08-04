import React from "react"
import { render, screen } from "@testing-library/react"
import SummaryLoader from "./SummaryLoader"
import { useLocation } from "react-router-dom"

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useLocation: jest.fn(),
    useParams: jest.fn(),
    useRouteMatch: jest.fn(),
  }
})

describe("common/components/SummaryLoader", () => {
  const gene = "DDB_G123456"
  beforeEach(() =>
    (useLocation as jest.Mock).mockReturnValue({
      pathname: `testdb.dictybase.org/gene/${gene}`,
    }),
  )

  it("should render correct page header", () => {
    render(<SummaryLoader gene={gene} />)
    expect(screen.getByText(/Gene Summary for DDB_G123456/)).toBeInTheDocument()
  })

  it("should render skeleton loader", () => {
    render(<SummaryLoader gene={gene} />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
