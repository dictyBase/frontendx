import React from "react"
import { render, screen } from "@testing-library/react"
import SummaryLoader from "./SummaryLoader"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "DDB_G123456"

describe("components/SummaryLoader", () => {
  it("should render skeleton loader", () => {
    useRouter.mockImplementation(() => ({
      query: { id: gene },
    }))
    render(<SummaryLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
