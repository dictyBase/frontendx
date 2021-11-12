import React from "react"
import { render, screen } from "@testing-library/react"
import Loader from "common/components/Loader"

describe("common/components/Loader", () => {
  it("should render Loader", () => {
    render(<Loader />)
    expect(screen.getByRole("loader")).toBeInTheDocument()
  })
})
