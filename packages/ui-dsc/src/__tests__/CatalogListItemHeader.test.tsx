import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CatalogListItemHeader } from "../catalog/CatalogListItemHeader"

test("renders the entity label and id", () => {
  render(
    <CatalogListItemHeader
      entity="Plasmid"
      id="DBP0000785"
      inStock
      action={<button type="button">Add</button>}
    />,
  )
  expect(screen.getByText("Plasmid")).toBeInTheDocument()
  expect(screen.getByText("DBP0000785")).toBeInTheDocument()
})

test("renders the availability indicator", () => {
  render(
    <CatalogListItemHeader
      entity="Strain"
      id="DBS0351097"
      inStock={false}
      action={<button type="button">Add</button>}
    />,
  )
  expect(screen.getByText("Out of stock")).toBeInTheDocument()
})

test("renders the provided action", () => {
  render(
    <CatalogListItemHeader
      entity="Strain"
      id="DBS0351097"
      inStock
      action={<button type="button">Add to cart</button>}
    />,
  )
  expect(
    screen.getByRole("button", { name: "Add to cart" }),
  ).toBeInTheDocument()
})
