import React from "react"
import { render, screen } from "@testing-library/react"
import { SummaryLoader } from "./SummaryLoader"

jest.mock("next/router", () => {
  const useRouter = jest.fn(() => ({
    query: { id: "DDB_G123456" },
    pathname: "",
  }))
  return { useRouter }
})

describe("components/SummaryLoader", () => {
  it("should render skeleton loader", () => {
    render(<SummaryLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
