import { render, screen } from "@testing-library/react"
import { GeneQuery } from "dicty-graphql-schema"
import { mockGene } from "mocks/mockGene"
import { OrthologsContainer } from "./OrthologsContainer"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = jest.spyOn(require("next/router"), "useRouter")

const gene = "sadA"
const pathname = `gene/${gene}/orthologs`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/Orthologs/OrthologsContainer", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render orthologs page", () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname,
    }))
    render(<OrthologsContainer gene={mockGene as GeneQuery} />)

    expect(screen.getByText("Species")).toBeInTheDocument()
    expect(screen.getByText("ID")).toBeInTheDocument()
    expect(screen.getByText("UniProtKB")).toBeInTheDocument()
    expect(screen.getByText("Gene Product")).toBeInTheDocument()
    expect(screen.getByText("Source(s)")).toBeInTheDocument()

    expect(screen.getByText("Dictyostelium purpureum")).toBeInTheDocument()
  })
})
