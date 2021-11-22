import { render, screen } from "@testing-library/react"
import React from "react"
import PhenotypesLoader from "./PhenotypesLoader"

const gene = "sadA"

jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({
      pathname: `gene/${gene}/phenotypes`,
    }),
  }
})

describe("features/Phenotypes/PhenotypesLoader", () => {
  it("should render loader", () => {
    render(<PhenotypesLoader gene={gene} />)

    expect(screen.getByText(`Gene Phenotypes for ${gene}`)).toBeInTheDocument()
  })
})
