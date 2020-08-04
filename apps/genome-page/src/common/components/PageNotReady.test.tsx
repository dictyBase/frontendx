import React from "react"
import { render, screen } from "@testing-library/react"
import PageNotReady from "./PageNotReady"

describe("common/components/PageNotReady", () => {
  it("should render sad dicty image", () => {
    render(<PageNotReady />)
    expect(
      screen.getByRole("img", { name: "Sad Dicty Logo" }),
    ).toBeInTheDocument()
  })

  it("should display header text", () => {
    render(<PageNotReady />)
    expect(screen.getByText(/Content Not Ready/)).toBeInTheDocument()
  })
})
