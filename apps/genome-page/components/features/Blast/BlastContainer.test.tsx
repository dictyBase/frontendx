import { render, screen } from "@testing-library/react"
import { mockGene } from "mocks/mockGene"
import { BlastContainer } from "./BlastContainer"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = jest.spyOn(require("next/router"), "useRouter")

const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/blast/BlastContainer", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render blast page", async () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname,
    }))
    render(<BlastContainer />)
    
    // Blast Database Row
    expect(screen.getByText("BLAST Database")).toBeInTheDocument()
    expect(screen.getByText("Select Organism")).toBeInTheDocument()
    expect(screen.getByText("Select Database")).toBeInTheDocument()

    // Blast Program Row
    expect(screen.getByText("BLAST Program")).toBeInTheDocument()
    expect(screen.getByText("Select Program")).toBeInTheDocument()

    // Blast GeneOrID
    expect(screen.getByText("Gene or Gene Model ID")).toBeInTheDocument()
    expect(screen.getByText("Enter gene or gene model ID")).toBeInTheDocument()
    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByText("Select Sequence")).toBeInTheDocument()

    expect(screen.getByText("Query Sequence")).toBeInTheDocument()
    expect(screen.getByText("BLAST Program")).toBeInTheDocument()
    expect(screen.getByText("BLAST at NCBI")).toBeInTheDocument()
    expect(screen.getByText("Options")).toBeInTheDocument()
  })
})
