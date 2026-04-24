import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { QuerySection } from "./QuerySection"

vi.mock("dicty-graphql-schema", () => {
  const useGeneQuery = vi.fn()
  return { useGeneQuery }
})

test("should render QuerySection", async () => {
  render(<QuerySection />)

  expect(
    screen.getByText("Enter query sequence in FASTA format"),
  ).toBeInTheDocument()
  expect(screen.getByText("Query Sequence")).toBeInTheDocument()
})
