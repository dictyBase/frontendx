import type { FC } from "react"
import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import {
  fromStockSearchResult,
  fromCatalogItem,
  mockPlasmidLabelMatch,
  mockStrainCatalogItem,
  CatalogItem,
} from "@dictybase/ui-dsc"
import { CatalogList } from "../components/CatalogList"

const MockAction: FC<{ item: CatalogItem }> = ({ item }) => (
  <button type="button">{`action-${item.id}`}</button>
)

test("renders a CatalogListItem for every entry", () => {
  render(
    <MemoryRouter>
      <CatalogList
        items={[
          fromCatalogItem(mockStrainCatalogItem),
          fromStockSearchResult(mockPlasmidLabelMatch),
        ]}
        actionComponent={MockAction}
      />
    </MemoryRouter>,
  )
  expect(screen.getByText(mockStrainCatalogItem.label)).toBeInTheDocument()
  expect(screen.getByText("pDM304")).toBeInTheDocument()
})

test("renders no items when the list is empty", () => {
  render(
    <MemoryRouter>
      <CatalogList items={[]} actionComponent={MockAction} />
    </MemoryRouter>,
  )
  expect(screen.queryByRole("button")).not.toBeInTheDocument()
})
