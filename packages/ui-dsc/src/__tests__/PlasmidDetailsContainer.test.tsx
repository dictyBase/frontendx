import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PlasmidDetails } from "../catalog/PlasmidDetailsContainer"
import { mockPlasmid } from "../mocks/mockPlasmid"

describe("PlasmidDetails", () => {
  test("Renders heading with name of plasmid", () => {
    render(<PlasmidDetails plasmid={mockPlasmid} />)
    expect(
      screen.getByRole("heading", { name: mockPlasmid.name }),
    ).toBeInTheDocument()
  })
})
