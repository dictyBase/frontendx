import { render, screen } from "@testing-library/react"
import PhenotypesContainer from "./PhenotypesContainer"
import { GeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/Phenotypes/PhenotypesContainer", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render phenotypes page", async () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname: pathname,
    }))
    render(<PhenotypesContainer gene={mockGene as GeneQuery} />)

    expect(screen.getByText("Strain")).toBeInTheDocument()
    expect(screen.getByText("Characteristics")).toBeInTheDocument()
    expect(screen.getByText("Phenotype")).toBeInTheDocument()
    expect(screen.getByText("Reference(s)")).toBeInTheDocument()

    expect(
      screen.getByText("aberrant actin filament organization"),
    ).toBeInTheDocument()
  })
})
