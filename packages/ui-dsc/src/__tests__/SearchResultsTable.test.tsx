import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { StockEntityType, StockSearchFieldEnum } from "dicty-graphql-schema"
import type { StockSearchResult } from "dicty-graphql-schema"
import type { FC } from "react"
import type { CatalogItem } from "../types"
import {
  SearchResultsTable,
  toStockCatalogItem,
} from "../catalog/SearchResultsTable"

// ── Shared mock action components ──────────────────────────────────────────────

// eslint-disable-next-line unicorn/no-null
const NoOpAction: FC<{ item: CatalogItem }> = () => null
const MockAction: FC<{ item: CatalogItem }> = ({ item }) => (
  <button type="button">{`action-${item.id}`}</button>
)

// ── Mock data ──────────────────────────────────────────────────────────────────

/** Strain result where the label was the matched field (no subtitle expected). */
const mockStrainLabelMatch: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBS0001",
  entity: StockEntityType.Strain,
  field: StockSearchFieldEnum.Label,
  display_text: "axeA",
  strain_label: "axeA",
  summary: "Axenic growth mutant A",
  score: 1,
  in_stock: true,
}

/** Strain result where a gene name was the matched field (subtitle expected). */
const mockStrainGeneMatch: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBS0002",
  entity: StockEntityType.Strain,
  field: StockSearchFieldEnum.Genes,
  display_text: "gpaA",
  strain_label: "WT/AX2",
  summary: "Wild type axenic strain",
  score: 0.9,
  in_stock: true,
}

/** Strain result that is out of stock. */
const mockStrainOutOfStock: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBS0003",
  entity: StockEntityType.Strain,
  field: StockSearchFieldEnum.Label,
  display_text: "unavailableStrain",
  strain_label: "unavailableStrain",
  summary: "Currently out of stock",
  score: 0.8,
  in_stock: false,
}

/** Plasmid result (no subtitle expected). */
const mockPlasmidResult: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBP0001",
  entity: StockEntityType.Plasmid,
  field: StockSearchFieldEnum.Name,
  display_text: "pAXE1",
  strain_label: "",
  summary: "Expression vector for AXE1",
  score: 0.8,
  in_stock: true,
}

/** Result with a summary exceeding the 120-character truncation limit. */
const mockLongSummaryResult: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBS0004",
  entity: StockEntityType.Strain,
  field: StockSearchFieldEnum.Label,
  display_text: "longSummaryStrain",
  strain_label: "longSummaryStrain",
  summary: "A".repeat(130),
  score: 0.7,
  in_stock: true,
}

const renderTable = (
  results: Array<StockSearchResult>,
  actionComponent: FC<{ item: CatalogItem }> = NoOpAction,
) =>
  render(
    <MemoryRouter>
      <SearchResultsTable results={results} actionComponent={actionComponent} />
    </MemoryRouter>,
  )

// ── Header ─────────────────────────────────────────────────────────────────────

test("renders Stock and Summary column headers", () => {
  renderTable([mockStrainLabelMatch])
  expect(
    screen.getByRole("columnheader", { name: "Stock" }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("columnheader", { name: "Summary" }),
  ).toBeInTheDocument()
})

// ── Strain results ─────────────────────────────────────────────────────────────

test("renders a row for each result", () => {
  renderTable([mockStrainLabelMatch, mockPlasmidResult])
  expect(screen.getByRole("link", { name: "axeA" })).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "DBP0001" })).toBeInTheDocument()
})

test("links a strain result to its detail page using the strain label", () => {
  renderTable([mockStrainLabelMatch])
  const link = screen.getByRole("link", { name: "axeA" })
  expect(link).toHaveAttribute("href", `/strains/${mockStrainLabelMatch.id}`)
})

test("uses strain_label as the link text for strain results", () => {
  renderTable([mockStrainGeneMatch])
  expect(
    screen.getByRole("link", { name: mockStrainGeneMatch.strain_label }),
  ).toBeInTheDocument()
})

test("renders the strain entity badge", () => {
  renderTable([mockStrainLabelMatch])
  expect(screen.getByText("Strain")).toBeInTheDocument()
})

test("renders the stock id below the primary link text", () => {
  renderTable([mockStrainLabelMatch])
  expect(screen.getByText(mockStrainLabelMatch.id)).toBeInTheDocument()
})

test("renders the stock id for plasmid results", () => {
  renderTable([mockPlasmidResult])
  const idElements = screen.getAllByText(mockPlasmidResult.id)
  expect(idElements.length).toBeGreaterThan(0)
})

test("renders strain summary text", () => {
  renderTable([mockStrainLabelMatch])
  expect(screen.getByText(mockStrainLabelMatch.summary)).toBeInTheDocument()
})

// ── Plasmid results ────────────────────────────────────────────────────────────

test("links a plasmid result to its detail page using id", () => {
  renderTable([mockPlasmidResult])
  const link = screen.getByRole("link", { name: "DBP0001" })
  expect(link).toHaveAttribute("href", `/plasmids/${mockPlasmidResult.id}`)
})

test("renders the plasmid entity badge", () => {
  renderTable([mockPlasmidResult])
  expect(screen.getByText("Plasmid")).toBeInTheDocument()
})

test("renders plasmid summary text", () => {
  renderTable([mockPlasmidResult])
  expect(screen.getByText(mockPlasmidResult.summary)).toBeInTheDocument()
})

// ── Action component ───────────────────────────────────────────────────────────

test("renders the action component for each row", () => {
  renderTable([mockStrainLabelMatch, mockPlasmidResult], MockAction)
  expect(
    screen.getByRole("button", { name: `action-${mockStrainLabelMatch.id}` }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: `action-${mockPlasmidResult.id}` }),
  ).toBeInTheDocument()
})

test("passes the correct in_stock value to the action component via toStockCatalogItem", () => {
  const inStockItem = toStockCatalogItem(mockStrainLabelMatch)
  const outOfStockItem = toStockCatalogItem(mockStrainOutOfStock)
  expect(inStockItem.in_stock).toBe(true)
  expect(outOfStockItem.in_stock).toBe(false)
})

// ── toStockCatalogItem ─────────────────────────────────────────────────────────

test("converts a strain result to a StrainItem with strain_label as label", () => {
  const item = toStockCatalogItem(mockStrainLabelMatch)
  expect(item).toMatchObject({
    __typename: "Strain",
    id: "DBS0001",
    label: "axeA",
    summary: "Axenic growth mutant A",
    in_stock: true,
  })
})

test("converts a strain gene-match result using strain_label as the label", () => {
  const item = toStockCatalogItem(mockStrainGeneMatch)
  expect(item).toMatchObject({
    __typename: "Strain",
    id: "DBS0002",
    label: "WT/AX2",
    in_stock: true,
  })
})

test("converts a plasmid result to a PlasmidItem with display_text as name", () => {
  const item = toStockCatalogItem(mockPlasmidResult)
  expect(item).toMatchObject({
    __typename: "Plasmid",
    id: "DBP0001",
    name: "pAXE1",
    summary: "Expression vector for AXE1",
    in_stock: true,
  })
})

test("preserves in_stock false on converted out-of-stock strain", () => {
  const item = toStockCatalogItem(mockStrainOutOfStock)
  expect(item.in_stock).toBe(false)
})

// ── Mixed results ──────────────────────────────────────────────────────────────

test("renders both Strain and Plasmid badges in a mixed results list", () => {
  renderTable([mockStrainLabelMatch, mockPlasmidResult])
  expect(screen.getByText("Strain")).toBeInTheDocument()
  expect(screen.getByText("Plasmid")).toBeInTheDocument()
})

// ── Edge cases ─────────────────────────────────────────────────────────────────

test("renders headers and no rows when results array is empty", () => {
  renderTable([])
  expect(
    screen.getByRole("columnheader", { name: "Stock" }),
  ).toBeInTheDocument()
  expect(screen.queryByRole("link")).not.toBeInTheDocument()
})

test("truncates summaries longer than 120 characters", () => {
  renderTable([mockLongSummaryResult])
  expect(screen.queryByText("A".repeat(130))).not.toBeInTheDocument()
  expect(screen.getByText(/A+\.{3}/)).toBeInTheDocument()
})

// ── toStockCatalogItem edge cases ──────────────────────────────────────────────

test("converts a result with StockEntityType.All to a StrainItem", () => {
  const allEntityResult: StockSearchResult = {
    __typename: "StockSearchResult",
    id: "DBS0005",
    entity: StockEntityType.All,
    field: StockSearchFieldEnum.Label,
    display_text: "allEntityStrain",
    strain_label: "",
    summary: "Test for All entity type",
    score: 0.9,
    in_stock: true,
  }
  const item = toStockCatalogItem(allEntityResult)
  expect(item).toMatchObject({
    __typename: "Strain",
    id: "DBS0005",
    label: "allEntityStrain",
    summary: "Test for All entity type",
    in_stock: true,
  })
})
