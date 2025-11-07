import { render, screen } from "@testing-library/react"
import { mockPhenotypesData } from "mocks/mockPhenotypesData"
import { PhenotypesContainer } from "./PhenotypesContainer"

vi.mock("dicty-graphql-schema", () => {
  const useGeneQuery = vi.fn()
  return { useGeneQuery }
})

test("should render phenotypes page", async () => {
  render(<PhenotypesContainer strains={mockPhenotypesData.strains} />)

  expect(screen.getByText("Strain")).toBeInTheDocument()
  expect(screen.getByText("Characteristics")).toBeInTheDocument()
  expect(screen.getByText("Phenotype")).toBeInTheDocument()
  expect(screen.getByText("Reference(s)")).toBeInTheDocument()

  expect(
    screen.getByText("aberrant actin filament organization"),
  ).toBeInTheDocument()
})
