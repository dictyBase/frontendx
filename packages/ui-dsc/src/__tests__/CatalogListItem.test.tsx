import type { FC } from "react"
import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CatalogListItem } from "../catalog/CatalogListItem"
import {
  fromStockSearchResult,
  fromCatalogItem,
} from "../catalog/catalogListItemData"
import {
  mockPlasmidLabelMatch,
  mockStrainAssayMatch,
  mockStrainCatalogItem,
} from "../mocks/mockCatalogListItems"
import type { CatalogItem } from "../types"

const MockAction: FC<{ item: CatalogItem }> = ({ item }) => (
  <button type="button">{`action-${item.id}`}</button>
)

const renderItem = (data: ReturnType<typeof fromStockSearchResult>) =>
  render(
    <MemoryRouter>
      <CatalogListItem data={data} actionComponent={MockAction} />
    </MemoryRouter>,
  )

test("renders the entity label, title, and summary for a search result", () => {
  renderItem(fromStockSearchResult(mockPlasmidLabelMatch))
  expect(screen.getByText("Plasmid")).toBeInTheDocument()
  expect(screen.getByText("pDM304")).toBeInTheDocument()
  expect(
    screen.getByText(
      "Extrachromosomal Dictyostelium expression vector with act15 promoter; G418 resistance",
    ),
  ).toBeInTheDocument()
})

test("renders the match footer for a search result", () => {
  renderItem(fromStockSearchResult(mockPlasmidLabelMatch))
  expect(screen.getByText("Matches Label")).toBeInTheDocument()
  expect(screen.getByText("“pDM304”")).toBeInTheDocument()
})

test("renders 'Out of stock' for an unavailable search result", () => {
  renderItem(fromStockSearchResult(mockStrainAssayMatch))
  expect(screen.getByText("Out of stock")).toBeInTheDocument()
})

test("does not render a match footer for a plain catalog item", () => {
  renderItem(fromCatalogItem(mockStrainCatalogItem))
  expect(screen.queryByText(/^Matches /)).not.toBeInTheDocument()
})

test("passes the converted catalog item to the action component", () => {
  renderItem(fromStockSearchResult(mockPlasmidLabelMatch))
  expect(
    screen.getByRole("button", { name: `action-${mockPlasmidLabelMatch.id}` }),
  ).toBeInTheDocument()
})
