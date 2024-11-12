import { describe, test, expect } from "vitest"
import { render, screen, getDefaultNormalizer } from "@testing-library/react"
import { PlasmidDetailsCard } from "../catalog/PlasmidDetailsCard"
import { mockPlasmid } from "../mocks/mockPlasmid"
import { getDepositorName } from "../utils/getDepositorName"

describe("PlasmidDetailsCard", () => {
  test("renders plasmid descriptor correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(mockPlasmid.name)).toBeInTheDocument()
  })

  test("renders plasmid summary correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(mockPlasmid.summary)).toBeInTheDocument()
  })

  test("renders GenBank accession number correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(mockPlasmid.genbank_accession)).toBeInTheDocument()
  })

  test("renders depositor name correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(
      screen.getByText(getDepositorName(mockPlasmid.depositor)),
    ).toBeInTheDocument()
  })

  test("renders associated genes correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    mockPlasmid.genes.forEach((gene) => {
      expect(screen.getByText(gene.name)).toBeInTheDocument()
    })
  })

  test("renders plasmid sequence correctly if available", async () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(/^Sequence$/)).toBeInTheDocument()
    expect(
      screen.getByText(mockPlasmid.sequence, {
        normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
      }),
    ).toBeInTheDocument()
  })

  test("renders references correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    mockPlasmid.publications.forEach((pub) => {
      expect(screen.getByText(new RegExp(pub.title))).toBeInTheDocument()
    })
  })

  test("handles missing genes gracefully", () => {
    // eslint-disable-next-line unicorn/no-null
    const plasmidWithoutGenes = { ...mockPlasmid, genes: null }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutGenes} />)
    expect(screen.getByText("Associated Gene(s)")).toBeInTheDocument()
  })

  test("handles missing sequence gracefully", () => {
    // eslint-disable-next-line unicorn/no-null
    const plasmidWithoutSequence = { ...mockPlasmid, sequence: null }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutSequence} />)
    expect(screen.getByText("Sequence")).toBeInTheDocument()
    expect(screen.queryByText(mockPlasmid.sequence)).not.toBeInTheDocument()
  })

  test("handles missing publications gracefully", () => {
    const plasmidWithoutPublications = { ...mockPlasmid, publications: [] }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutPublications} />)
    expect(screen.queryByText(/reference\(s\)/i)).toBeInTheDocument()
    // Further assertions to ensure no publications are displayed
  })
})
