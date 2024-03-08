import { render, screen } from "@testing-library/react"
import React from "react"
import { BlastLoader } from "./BlastLoader"

describe("features/blast/BlastLoader", () => {
  it("should render loader", () => {
    render(<BlastLoader />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
