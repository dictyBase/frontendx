import React from "react"
import { render, screen } from "@testing-library/react"
import PhenotypesContainer from "./PhenotypesContainer"
import { useGeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"
import { ApolloError } from "@apollo/client"

const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

jest.mock("react-router-dom", () => {
  const useParams = () => ({ gene })
  return {
    useParams,
    useLocation: () => ({ pathname }),
  }
})

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/Phenotypes/PhenotypesContainer", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render phenotypes page", () => {
    ;(useGeneQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        __typename: "Gene",
        allStrains: { ...mockGene.allStrains },
        gene: { ...mockGene.gene },
      },
    })
    render(<PhenotypesContainer />)

    expect(screen.getByText(`Gene Phenotypes for ${gene}`)).toBeInTheDocument()

    expect(screen.getByText("Strain")).toBeInTheDocument()
    expect(screen.getByText("Characteristics")).toBeInTheDocument()
    expect(screen.getByText("Phenotype")).toBeInTheDocument()
    expect(screen.getByText(/Reference/)).toBeInTheDocument()

    expect(
      screen.getByText("aberrant actin filament organization"),
    ).toBeInTheDocument()
  })

  it("should render loading", () => {
    ;(useGeneQuery as jest.Mock).mockReturnValue({
      loading: true,
    })
    render(<PhenotypesContainer />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo error component", () => {
    ;(useGeneQuery as jest.Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<PhenotypesContainer />)
  })
})
