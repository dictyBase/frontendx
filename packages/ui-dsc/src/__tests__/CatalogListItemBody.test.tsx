import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CatalogListItemBody } from "../catalog/CatalogListItemBody"

test("links the title to the strain detail page", () => {
  render(
    <MemoryRouter>
      <CatalogListItemBody
        id="DBS0351097"
        entity="Strain"
        title="[act15]:GFP:cbpG"
        summary="GFP-tagged cbpG overexpressed in KAX3"
      />
    </MemoryRouter>,
  )
  expect(
    screen.getByRole("link", { name: "[act15]:GFP:cbpG" }),
  ).toHaveAttribute("href", "/strains/DBS0351097")
})

test("links the title to the plasmid detail page", () => {
  render(
    <MemoryRouter>
      <CatalogListItemBody
        id="DBP0000785"
        entity="Plasmid"
        title="pDM304"
        summary="Extrachromosomal Dictyostelium expression vector"
      />
    </MemoryRouter>,
  )
  expect(screen.getByRole("link", { name: "pDM304" })).toHaveAttribute(
    "href",
    "/plasmids/DBP0000785",
  )
})

test("renders the summary", () => {
  render(
    <MemoryRouter>
      <CatalogListItemBody
        id="DBP0000785"
        entity="Plasmid"
        title="pDM304"
        summary="Extrachromosomal Dictyostelium expression vector"
      />
    </MemoryRouter>,
  )
  expect(
    screen.getByText("Extrachromosomal Dictyostelium expression vector"),
  ).toBeInTheDocument()
})

test("renders a long summary in full, without truncation", () => {
  const longSummary = "a".repeat(200)
  render(
    <MemoryRouter>
      <CatalogListItemBody
        id="DBP0000785"
        entity="Plasmid"
        title="pDM304"
        summary={longSummary}
      />
    </MemoryRouter>,
  )
  expect(screen.getByText(longSummary)).toBeInTheDocument()
})
