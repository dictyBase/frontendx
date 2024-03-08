import { render, screen } from "@testing-library/react"
import React from "react"
import { OrthologsLoader } from "./OrthologsLoader"

describe("features/Orthologs/OrthologsLoader", () => {
  it("should render loader", () => {
    render(<OrthologsLoader />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
