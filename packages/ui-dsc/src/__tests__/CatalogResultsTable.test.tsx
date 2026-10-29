import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import type { FC } from "react"
import type { CatalogItem } from "../types"
import { CatalogResultsTable } from "../catalog/CatalogResultsTable"

// ── Mock action components ──────────────────────────────────────────────

const NoOpAction: FC<{ item: CatalogItem }> = () => <></>
const MockAction: FC<{ item: CatalogItem }> = ({ item }) => (
  <button type="button">{`action-${item.id}`}</button>
)

// ── Mock data ──────────────────────────────────────────────────────────

const mockStrainItem: CatalogItem = {
  __typename: "Strain",
  id: "DBS0001",
  label: "axeA",
  summary: "Axenic growth mutant A",
  in_stock: true,
}

const mockPlasmidItem: CatalogItem = {
  __typename: "Plasmid",
  id: "DBP0001",
  name: "pAXE1",
  summary: "Expression vector for AXE1",
  in_stock: true,
}

const mockStrainWithoutSummary: CatalogItem = {
  __typename: "Strain",
  id: "DBS0002",
  label: "testStrain",
  summary: "",
  in_stock: true,
}

const mockLongSummaryItem: CatalogItem = {
  __typename: "Strain",
  id: "DBS0003",
  label: "longSummaryStrain",
  summary: "A".repeat(130),
  in_stock: false,
}

const renderTable = (
  items: Array<CatalogItem>,
  actionComponent: FC<{ item: CatalogItem }> = NoOpAction,
) =>
  render(
    <MemoryRouter>
      <CatalogResultsTable items={items} actionComponent={actionComponent} />
    </MemoryRouter>,
  )

// ── Header ─────────────────────────────────────────────────────────────

test("renders Stock and Summary column headers", () => {
  renderTable([mockStrainItem])
  expect(
    screen.getByRole("columnheader", { name: "Stock" }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("columnheader", { name: "Summary" }),
  ).toBeInTheDocument()
})

test("does not render a Matching Field column header", () => {
  renderTable([mockStrainItem])
  expect(
    screen.queryByRole("columnheader", { name: /matching/i }),
  ).not.toBeInTheDocument()
})

// ── Strain items ───────────────────────────────────────────────────────

test("renders a row for each catalog item", () => {
  renderTable([mockStrainItem, mockPlasmidItem])
  expect(screen.getByRole("link", { name: "axeA" })).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "pAXE1" })).toBeInTheDocument()
})

test("links a strain item to its detail page using the strain label", () => {
  renderTable([mockStrainItem])
  const link = screen.getByRole("link", { name: "axeA" })
  expect(link).toHaveAttribute("href", `/strains/${mockStrainItem.id}`)
})

test("uses label as the link text for strain items", () => {
  renderTable([mockStrainItem])
  expect(
    screen.getByRole("link", { name: mockStrainItem.label }),
  ).toBeInTheDocument()
})

test("renders the strain entity badge", () => {
  renderTable([mockStrainItem])
  expect(screen.getByText("Strain")).toBeInTheDocument()
})

test("renders the stock id below the primary link text", () => {
  renderTable([mockStrainItem])
  expect(screen.getByText(mockStrainItem.id)).toBeInTheDocument()
})

test("renders strain summary text", () => {
  renderTable([mockStrainItem])
  expect(screen.getByText(mockStrainItem.summary)).toBeInTheDocument()
})

test("handles empty summary gracefully", () => {
  renderTable([mockStrainWithoutSummary])
  expect(screen.getByRole("link", { name: "testStrain" })).toBeInTheDocument()
  expect(screen.getByText("DBS0002")).toBeInTheDocument()
})

// ── Plasmid items ──────────────────────────────────────────────────────

test("links a plasmid item to its detail page using the name", () => {
  renderTable([mockPlasmidItem])
  const link = screen.getByRole("link", { name: "pAXE1" })
  expect(link).toHaveAttribute("href", `/plasmids/${mockPlasmidItem.id}`)
})

test("uses name as the link text for plasmid items", () => {
  renderTable([mockPlasmidItem])
  expect(
    screen.getByRole("link", { name: mockPlasmidItem.name }),
  ).toBeInTheDocument()
})

test("renders the plasmid entity badge", () => {
  renderTable([mockPlasmidItem])
  expect(screen.getByText("Plasmid")).toBeInTheDocument()
})

test("renders the plasmid stock id", () => {
  renderTable([mockPlasmidItem])
  const idElements = screen.getAllByText(mockPlasmidItem.id)
  expect(idElements.length).toBeGreaterThan(0)
})

test("renders plasmid summary text", () => {
  renderTable([mockPlasmidItem])
  expect(screen.getByText(mockPlasmidItem.summary)).toBeInTheDocument()
})

// ── Action component ───────────────────────────────────────────────────

test("renders the action component for each row", () => {
  renderTable([mockStrainItem, mockPlasmidItem], MockAction)
  expect(
    screen.getByRole("button", { name: `action-${mockStrainItem.id}` }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: `action-${mockPlasmidItem.id}` }),
  ).toBeInTheDocument()
})

// ── Mixed items ────────────────────────────────────────────────────────

test("renders both Strain and Plasmid badges in a mixed items list", () => {
  renderTable([mockStrainItem, mockPlasmidItem])
  expect(screen.getByText("Strain")).toBeInTheDocument()
  expect(screen.getByText("Plasmid")).toBeInTheDocument()
})

// ── Edge cases ─────────────────────────────────────────────────────────

test("renders headers and no rows when items array is empty", () => {
  renderTable([])
  expect(
    screen.getByRole("columnheader", { name: "Stock" }),
  ).toBeInTheDocument()
  expect(screen.queryByRole("link")).not.toBeInTheDocument()
})

test("truncates summaries longer than 120 characters", () => {
  renderTable([mockLongSummaryItem])
  expect(screen.queryByText("A".repeat(130))).not.toBeInTheDocument()
  expect(screen.getByText(/A+\.{3}/)).toBeInTheDocument()
})
