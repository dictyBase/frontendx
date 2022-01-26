import { render, screen } from "@testing-library/react"
import React from "react"
import PhenotypesLoader from "./PhenotypesLoader"

const gene = "sadA"

jest.mock("next/router", () => {
  const useRouter = () => {
    push: (value: string) => value
  }
  return {
    useRouter,
  }
})

describe("features/Phenotypes/PhenotypesLoader", () => {
  it("should render loader", () => {
    render(<PhenotypesLoader />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
