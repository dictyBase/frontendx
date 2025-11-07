import { render, screen } from "@testing-library/react"
import { BlastButtonsRow } from "./BlastButtonsRow"

vi.mock("dicty-graphql-schema", () => {
  const useGeneQuery = vi.fn()
  return { useGeneQuery }
})

test("should render blast buttons row", async () => {
  render(<BlastButtonsRow />)

  expect(screen.getByText("BLAST")).toBeInTheDocument()
  expect(screen.getByText("Reset")).toBeInTheDocument()
  expect(screen.getByText("BLAST at NCBI")).toBeInTheDocument()
})
