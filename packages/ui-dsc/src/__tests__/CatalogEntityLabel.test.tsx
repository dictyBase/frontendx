import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CatalogEntityLabel } from "../catalog/CatalogEntityLabel"

test("renders the Strain label for a strain", () => {
  render(
    <CatalogEntityLabel
      title="[act15]:GFP:cbpG"
      entity="Strain"
      id="DBS0351097"
    />,
  )
  expect(screen.getByText("Strain")).toBeInTheDocument()
})

test("renders the Plasmid label for a plasmid", () => {
  render(<CatalogEntityLabel title="pDM304" entity="Plasmid" id="DBP0000785" />)
  expect(screen.getByText("Plasmid")).toBeInTheDocument()
})

test("renders the title", () => {
  render(<CatalogEntityLabel title="pDM304" entity="Plasmid" id="DBP0000785" />)
  expect(screen.getByText("pDM304")).toBeInTheDocument()
})

test("renders the stock id", () => {
  render(<CatalogEntityLabel title="pDM304" entity="Plasmid" id="DBP0000785" />)
  expect(screen.getByText("DBP0000785")).toBeInTheDocument()
})

test("hides the entity icon from assistive technology", () => {
  const { container } = render(
    <CatalogEntityLabel
      title="[act15]:GFP:cbpG"
      entity="Strain"
      id="DBS0351097"
    />,
  )
  expect(container.querySelector("svg[aria-hidden='true']")).toBeTruthy()
})
