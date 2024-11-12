import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PlasmidDetails } from "../catalog/PlasmidDetailsContainer"
import { mockPlasmid } from "../mocks/mockPlasmid"

describe("PlasmidDetails", () => {
  test("Renders name of plasmid", () => {
    render(<PlasmidDetails plasmid={mockPlasmid} />)
  })
  expect(screen.getByText(mockPlasmid.name)).toBeInTheDocument()
})
