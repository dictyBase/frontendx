import React from "react"
import { render, screen } from "@testing-library/react"
import { Loader } from "components/Loader"

describe("components/Loader", () => {
  it("should render Loader", () => {
    render(<Loader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
