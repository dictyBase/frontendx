import React from "react"
import { render, screen } from "@testing-library/react"
import SummaryLoader from "./SummaryLoader"

const gene = "DDB_G123456"
jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({
      pathname: `gene/${gene}`,
    }),
  }
})

describe("common/components/SummaryLoader", () => {
  it("should render correct page header", () => {
    render(<SummaryLoader gene={gene} />)
    expect(screen.getByText(`Gene Summary for ${gene}`)).toBeInTheDocument()
  })

  it("should render skeleton loader", () => {
    render(<SummaryLoader gene={gene} />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
