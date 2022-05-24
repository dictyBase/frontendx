import { render, screen } from "@testing-library/react"
import BlastContainer from "./BlastContainer"
import { GeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"
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
      pathname: pathname,
    }))
    render(<BlastContainer gene={mockGene as GeneQuery} />)

    expect(screen.getAllByText("BLAST").length).toBe(2)

    expect(screen.getByText("Query Sequence")).toBeInTheDocument()
    expect(screen.getByText("Gene or Gene Model ID")).toBeInTheDocument()
    expect(screen.getByText("BLAST Program")).toBeInTheDocument()
    expect(screen.getByText("BLAST at NCBI")).toBeInTheDocument()
    expect(screen.getByText("Options")).toBeInTheDocument()
  })
})
