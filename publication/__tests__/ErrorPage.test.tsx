import React from "react"
import { render, screen } from "@testing-library/react"
import ErrorPage from "../components/errors/ErrorPage"

describe("components/errors/ErrorPage", () => {
  it("should render error component", () => {
    render(<ErrorPage />)

    expect(screen.getByText(/Error/)).toBeInTheDocument()
  })
})
