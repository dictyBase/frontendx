import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { BlastContainer } from "./BlastContainer"

vi.mock("dicty-graphql-schema", () => {
  const useGeneQuery = vi.fn()
  return { useGeneQuery }
})

describe("features/blast/BlastContainer", () => {
  beforeEach(() => vi.clearAllMocks())

  it("should render blast page", async () => {
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
