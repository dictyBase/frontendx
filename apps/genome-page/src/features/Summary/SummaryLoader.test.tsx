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

describe("components/SummaryLoader", () => {
  it("should render skeleton loader", () => {
    render(<SummaryLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
