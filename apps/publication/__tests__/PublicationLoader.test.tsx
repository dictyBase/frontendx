import React from "react"
import { render, screen } from "@testing-library/react"
import PublicationLoader from "../components/PublicationLoader"

describe("components/PublicationLoader", () => {
  it("should render publication loader", () => {
    render(<PublicationLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
