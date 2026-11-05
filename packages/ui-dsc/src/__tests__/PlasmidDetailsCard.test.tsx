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

  test("does not render an 'Associated Gene(s)' row when genes is null", () => {
    // eslint-disable-next-line unicorn/no-null
    const plasmidWithoutGenes = { ...mockPlasmid, genes: null }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutGenes} />)
    expect(screen.queryByText("Associated Gene(s)")).not.toBeInTheDocument()
  })

  test("does not render a 'Sequence' row when sequence is null", () => {
    // eslint-disable-next-line unicorn/no-null
    const plasmidWithoutSequence = { ...mockPlasmid, sequence: null }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutSequence} />)
    expect(screen.queryByText("Sequence")).not.toBeInTheDocument()
  })

  test("does not render a 'Reference(s)' row when publications is empty", () => {
    const plasmidWithoutPublications = { ...mockPlasmid, publications: [] }
    render(<PlasmidDetailsCard plasmid={plasmidWithoutPublications} />)
    expect(screen.queryByText(/reference\(s\)/i)).not.toBeInTheDocument()
  })
})

describe("PlasmidDetailsCard gene filtering", () => {
  test("does not render an 'Associated Gene(s)' row when all genes have blank names", () => {
    const plasmidWithBlankGene = {
      ...mockPlasmid,
      genes: [{ __typename: "Gene", name: "" }],
    } as typeof mockPlasmid
    const { container } = render(
      <PlasmidDetailsCard plasmid={plasmidWithBlankGene} />,
    )
    expect(screen.queryByText("Associated Gene(s)")).not.toBeInTheDocument()
    expect(container.querySelector('a[href="/gene/"]')).toBeNull()
  })

  test("renders a gene tag for every named gene", () => {
    const plasmidWithGenes = {
      ...mockPlasmid,
      genes: [
        { __typename: "Gene", name: "sadA" },
        { __typename: "Gene", name: "gflB" },
      ],
    } as typeof mockPlasmid
    const { container } = render(
      <PlasmidDetailsCard plasmid={plasmidWithGenes} />,
    )
    expect(container.querySelector('a[href="/gene/sadA"]')).not.toBeNull()
    expect(container.querySelector('a[href="/gene/gflB"]')).not.toBeNull()
  })
})
