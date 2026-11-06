import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StockSearchFieldEnum } from "dicty-graphql-schema"
import { CatalogListItemMatchFooter } from "../catalog/CatalogListItemMatchFooter"

test("renders the matched field label", () => {
  render(
    <CatalogListItemMatchFooter
      match={{
        field: StockSearchFieldEnum.Label,
        displayText: "pDM304",
        score: 19.4,
      }}
    />,
  )
  expect(screen.getByText("Label")).toBeInTheDocument()
})

test("renders the matched value in quotes for a regular field", () => {
  render(
    <CatalogListItemMatchFooter
      match={{
        field: StockSearchFieldEnum.Label,
        displayText: "pDM304",
        score: 19.4,
      }}
    />,
  )
  expect(screen.getByText("“pDM304”")).toBeInTheDocument()
})

test("hides the matched value for an excluded field", () => {
  render(
    <CatalogListItemMatchFooter
      match={{
        field: StockSearchFieldEnum.Summary,
        displayText: "Null mutant used in adhesion studies",
        score: 8.2,
      }}
    />,
  )
  expect(screen.getByText("Summary")).toBeInTheDocument()
  expect(
    screen.queryByText("“Null mutant used in adhesion studies”"),
  ).not.toBeInTheDocument()
})

test("renders the score to one decimal place", () => {
  render(
    <CatalogListItemMatchFooter
      match={{
        field: StockSearchFieldEnum.Label,
        displayText: "pDM304",
        score: 19.44,
      }}
    />,
  )
  expect(screen.getByText("score 19.4")).toBeInTheDocument()
})
