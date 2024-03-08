import { render, screen } from "@testing-library/react"
import React from "react"
import { PhenotypesLoader } from "./PhenotypesLoader"

describe("features/Phenotypes/PhenotypesLoader", () => {
  it("should render loader", () => {
    render(<PhenotypesLoader />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
