import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CatalogTable } from "../catalog/CatalogTable"

const mockStrains = [
  {
    __typename: "Strain" as const,
    id: "DBS0351791",
    descriptor: "tor(1-476:MTRSLRKVEKLKNSEPTLCTK:479-2380)",
    summary:
      "CRISPR/Cas9 mutant of tor; contains a 60 bp insertion after residue 476 with deletion of codons 477-478",
    label: "TOR001",
    in_stock: true,
  },
  {
    __typename: "Strain" as const,
    id: "DBS0351790",
    descriptor: "tor(1-223:N:224-2380)",
    summary:
      "CRISPR/Cas9 mutant of tor; contains an AAC insertion between residues 223 and 224",
    label: "TOR002",
    in_stock: true,
  },
  {
    __typename: "Strain" as const,
    id: "DBS0351789",
    descriptor: "DDB_G0278535(1-471)",
    summary:
      "CRISPR/Cas9 mutant of DDB_G0278535; contains a 2 bp deletion beginning at codon 472",
    label: "DDB001",
    in_stock: false,
  },
]

test("renders table with correct headers", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={mockStrains} />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole("columnheader", { name: "Strain Descriptor" }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("columnheader", { name: "Strain Summary" }),
  ).toBeInTheDocument()
})

test("renders all strain rows", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={mockStrains} />
    </MemoryRouter>,
  )

  expect(screen.getByText(mockStrains[0].descriptor)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[1].descriptor)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[2].descriptor)).toBeInTheDocument()
})

test("renders strain summaries", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={mockStrains} />
    </MemoryRouter>,
  )

  expect(screen.getByText(mockStrains[0].summary)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[1].summary)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[2].summary)).toBeInTheDocument()
})

test("renders descriptor as link to strain details page", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={mockStrains} />
    </MemoryRouter>,
  )

  const link = screen.getByRole("link", { name: mockStrains[0].descriptor })
  expect(link).toHaveAttribute("href", `/strains/${mockStrains[0].id}`)
})

test("displays loading indicator when isLoading is true", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={mockStrains} isLoading />
    </MemoryRouter>,
  )

  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})

test("does not display loading indicator when isLoading is false", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={mockStrains} isLoading={false} />
    </MemoryRouter>,
  )

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
})

test("renders custom action cell content when renderActions is provided", () => {
  const mockRenderActions = () => <button type="button">Add to Cart</button>

  render(
    <MemoryRouter>
      <CatalogTable strains={mockStrains} renderActions={mockRenderActions} />
    </MemoryRouter>,
  )

  const buttons = screen.getAllByRole("button", { name: "Add to Cart" })
  expect(buttons).toHaveLength(mockStrains.length)
})

test("handles strains with null summary", () => {
  const strainsWithNullSummary = [
    {
      ...mockStrains[0],
      summary: null,
    },
  ]

  render(
    <MemoryRouter>
      <CatalogTable strains={strainsWithNullSummary} />
    </MemoryRouter>,
  )

  expect(screen.getByText(strainsWithNullSummary[0].descriptor)).toBeInTheDocument()
})

test("renders empty table when strains array is empty", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={[]} />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole("columnheader", { name: "Strain Descriptor" }),
  ).toBeInTheDocument()
  expect(screen.queryByRole("link")).not.toBeInTheDocument()
})
