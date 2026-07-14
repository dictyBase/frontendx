import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import type { FC } from "react"
import { CatalogTable } from "../catalog/CatalogTable"
import type { CatalogItem } from "../types"

const NoOpAction: FC<{ item: CatalogItem }> = () => null

const mockStrains = [
  {
    __typename: "Strain" as const,
    id: "DBS0351791",
    summary:
      "CRISPR/Cas9 mutant of tor; contains a 60 bp insertion after residue 476 with deletion of codons 477-478",
    label: "TOR001",
    in_stock: true,
  },
  {
    __typename: "Strain" as const,
    id: "DBS0351790",
    summary:
      "CRISPR/Cas9 mutant of tor; contains an AAC insertion between residues 223 and 224",
    label: "TOR002",
    in_stock: true,
  },
  {
    __typename: "Strain" as const,
    id: "DBS0351789",
    summary:
      "CRISPR/Cas9 mutant of DDB_G0278535; contains a 2 bp deletion beginning at codon 472",
    label: "DDB001",
    in_stock: false,
  },
]

test("renders table with correct headers", () => {
  render(
    <MemoryRouter>
      <CatalogTable
        strains={mockStrains}
        nextCursor={0}
        actionComponent={NoOpAction}
      />
    </MemoryRouter>,
  )
  expect(
    screen.getByRole("columnheader", { name: "Strain Descriptor" }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("columnheader", { name: "Strain Summary" }),
  ).toBeInTheDocument()
})

test("renders a row for each strain", () => {
  render(
    <MemoryRouter>
      <CatalogTable
        strains={mockStrains}
        nextCursor={0}
        actionComponent={NoOpAction}
      />
    </MemoryRouter>,
  )
  expect(screen.getByText(mockStrains[0].label)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[1].label)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[2].label)).toBeInTheDocument()
})

test("renders strain summaries", () => {
  render(
    <MemoryRouter>
      <CatalogTable
        strains={mockStrains}
        nextCursor={0}
        actionComponent={NoOpAction}
      />
    </MemoryRouter>,
  )
  expect(screen.getByText(mockStrains[0].summary)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[1].summary)).toBeInTheDocument()
  expect(screen.getByText(mockStrains[2].summary)).toBeInTheDocument()
})

test("renders strain label as a link to the strain detail page", () => {
  render(
    <MemoryRouter>
      <CatalogTable
        strains={mockStrains}
        nextCursor={0}
        actionComponent={NoOpAction}
      />
    </MemoryRouter>,
  )
  const link = screen.getByRole("link", { name: mockStrains[0].label })
  expect(link).toHaveAttribute("href", `/strains/${mockStrains[0].id}`)
})

test("displays load-more trigger when nextCursor is non-zero", () => {
  render(
    <MemoryRouter>
      <CatalogTable
        strains={mockStrains}
        nextCursor={10}
        actionComponent={NoOpAction}
      />
    </MemoryRouter>,
  )
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})

test("hides load-more trigger when nextCursor is zero", () => {
  render(
    <MemoryRouter>
      <CatalogTable
        strains={mockStrains}
        nextCursor={0}
        actionComponent={NoOpAction}
      />
    </MemoryRouter>,
  )
  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
})

test("renders the action component for each strain row", () => {
  const MockAction: FC<{ item: CatalogItem }> = () => (
    <button type="button">Add to Cart</button>
  )
  render(
    <MemoryRouter>
      <CatalogTable
        strains={mockStrains}
        nextCursor={0}
        actionComponent={MockAction}
      />
    </MemoryRouter>,
  )
  const buttons = screen.getAllByRole("button", { name: "Add to Cart" })
  expect(buttons).toHaveLength(mockStrains.length)
})

test("renders empty table when strains array is empty", () => {
  render(
    <MemoryRouter>
      <CatalogTable strains={[]} nextCursor={0} actionComponent={NoOpAction} />
    </MemoryRouter>,
  )
  expect(
    screen.getByRole("columnheader", { name: "Strain Descriptor" }),
  ).toBeInTheDocument()
  expect(screen.queryByRole("link")).not.toBeInTheDocument()
})
