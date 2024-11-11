import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PlasmidDetailsCard } from "../catalog/PlasmidDetailsCard"
import { mockPlasmid } from "../mocks/mockPlasmid"

describe("PlasmidDetailsCard", () => {
  it("renders plasmid descriptor correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(mockPlasmid.name)).toBeInTheDocument()
  })

  it("renders plasmid summary correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(mockPlasmid.summary)).toBeInTheDocument()
  })

  it("renders GenBank accession number correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(mockPlasmid.genbank_accession)).toBeInTheDocument()
  })

  it("renders depositor name correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(mockPlasmid.depositor.name)).toBeInTheDocument()
  })

  it("renders associated genes correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    mockPlasmid.genes.forEach((gene) => {
      expect(screen.getByText(gene.name)).toBeInTheDocument()
    })
  })

  it("renders plasmid sequence correctly if available", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    expect(screen.getByText(/Sequence/i)).toBeInTheDocument()
    expect(screen.getByText(mockPlasmid.sequence)).toBeInTheDocument()
  })

  it("renders references correctly", () => {
    render(<PlasmidDetailsCard plasmid={mockPlasmid} />)
    mockPlasmid.publications.forEach((pub) => {
      expect(screen.getByText(pub.title)).toBeInTheDocument()
    })
  })

  it("handles missing genes gracefully", () => {
    const plasmidWithoutGenes = { ...mockPlasmid, genes: null }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutGenes} />)
    expect(screen.getByText("Associated Gene(s)")).toBeInTheDocument()
    // Add more assertions if necessary
  })

  it("handles missing sequence gracefully", () => {
    const plasmidWithoutSequence = { ...mockPlasmid, sequence: null }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutSequence} />)
    expect(screen.getByText("Sequence")).toBeInTheDocument()
    expect(screen.queryByText(mockPlasmid.sequence)).not.toBeInTheDocument()
  })

  it("handles missing publications gracefully", () => {
    const plasmidWithoutPublications = { ...mockPlasmid, publications: [] }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutPublications} />)
    expect(screen.queryByText(/Reference\(s\)/i)).toBeInTheDocument()
    // Further assertions to ensure no publications are displayed
  })
})
