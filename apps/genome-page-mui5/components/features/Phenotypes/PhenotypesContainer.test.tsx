import { render, screen } from "@testing-library/react"
import { mockPhenotypesData } from "mocks/mockPhenotypesData"
import { PhenotypesContainer } from "./PhenotypesContainer"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
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
      pathname,
    }))
    render(<PhenotypesContainer strains={mockPhenotypesData.strains} />)

    expect(screen.getByText("Strain")).toBeInTheDocument()
    expect(screen.getByText("Characteristics")).toBeInTheDocument()
    expect(screen.getByText("Phenotype")).toBeInTheDocument()
    expect(screen.getByText("Reference(s)")).toBeInTheDocument()

    expect(
      screen.getByText("aberrant actin filament organization"),
    ).toBeInTheDocument()
  })
})
