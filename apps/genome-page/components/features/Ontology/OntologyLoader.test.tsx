import React from "react"
import { render, screen } from "@testing-library/react"
import { OntologyLoader } from "./OntologyLoader"

jest.mock("next/router", () => {
  const useRouter = jest.fn(() => ({
    query: { id: "DDB_G123456" },
    pathname: "",
  }))
  return { useRouter }
})

describe("components/OntologyLoader", () => {
  it("should render skeleton loader", () => {
    render(<OntologyLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
