import { render, screen } from "@testing-library/react"
import React from "react"
import { PhenotypesLoader } from "./PhenotypesLoader"

jest.mock("next/router", () => {
  const useRouter = jest.fn(() => ({
    query: { id: "DDB_G123456" },
    pathname: "",
  }))
  return { useRouter }
})

describe("features/Phenotypes/PhenotypesLoader", () => {
  it("should render loader", () => {
    render(<PhenotypesLoader />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
