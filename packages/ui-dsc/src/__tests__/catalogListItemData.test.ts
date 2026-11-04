import { test, expect } from "vitest"
import { pipe } from "fp-ts/function"
import { isNone, getOrElse as OgetOrElse } from "fp-ts/Option"
import { StockSearchFieldEnum } from "dicty-graphql-schema"
import {
  fromStockSearchResult,
  fromCatalogItem,
  toEntityPath,
  matchFieldLabel,
  isExcludedMatchField,
} from "../catalog/catalogListItemData"
import {
  mockPlasmidLabelMatch,
  mockStrainAssayMatch,
  mockStrainCatalogItem,
  mockPlasmidCatalogItem,
} from "../mocks/mockCatalogListItems"

test("fromStockSearchResult maps a plasmid result to the Plasmid entity", () => {
  const data = fromStockSearchResult(mockPlasmidLabelMatch)
  expect(data.entity).toBe("Plasmid")
})

test("fromStockSearchResult maps a strain result to the Strain entity", () => {
  const data = fromStockSearchResult(mockStrainAssayMatch)
  expect(data.entity).toBe("Strain")
})

test("fromStockSearchResult carries the id, title, summary, and stock status", () => {
  const data = fromStockSearchResult(mockPlasmidLabelMatch)
  expect(data.id).toBe(mockPlasmidLabelMatch.id)
  expect(data.title).toBe(mockPlasmidLabelMatch.stock_label)
  expect(data.summary).toBe(mockPlasmidLabelMatch.summary)
  expect(data.inStock).toBe(mockPlasmidLabelMatch.in_stock)
})

test("fromStockSearchResult builds a Plasmid catalog item with the stock label as the name", () => {
  const { item } = fromStockSearchResult(mockPlasmidLabelMatch)
  expect(item).toStrictEqual({
    __typename: "Plasmid",
    id: mockPlasmidLabelMatch.id,
    name: mockPlasmidLabelMatch.stock_label,
    summary: mockPlasmidLabelMatch.summary,
    in_stock: mockPlasmidLabelMatch.in_stock,
  })
})

test("fromStockSearchResult builds a Strain catalog item with the stock label as the label", () => {
  const { item } = fromStockSearchResult(mockStrainAssayMatch)
  expect(item).toStrictEqual({
    __typename: "Strain",
    id: mockStrainAssayMatch.id,
    label: mockStrainAssayMatch.stock_label,
    summary: mockStrainAssayMatch.summary,
    in_stock: mockStrainAssayMatch.in_stock,
  })
})

test("fromStockSearchResult includes the matched field, displayed text, and score", () => {
  const { match } = fromStockSearchResult(mockPlasmidLabelMatch)
  // Falls back to a sentinel that fails the equality check below, rather
  // than conditionally skipping the assertion, if `match` were ever `none`.
  const value = pipe(
    match,
    OgetOrElse(() => ({
      field: StockSearchFieldEnum.Summary,
      displayText: "",
      score: -1,
    })),
  )
  expect(value).toStrictEqual({
    field: mockPlasmidLabelMatch.field,
    displayText: mockPlasmidLabelMatch.display_text,
    score: mockPlasmidLabelMatch.score,
  })
})

test("fromCatalogItem uses the strain label as the title", () => {
  const data = fromCatalogItem(mockStrainCatalogItem)
  expect(data.title).toBe(mockStrainCatalogItem.label)
  expect(data.entity).toBe("Strain")
})

test("fromCatalogItem uses the plasmid name as the title", () => {
  const data = fromCatalogItem(mockPlasmidCatalogItem)
  expect(data.title).toBe(mockPlasmidCatalogItem.name)
  expect(data.entity).toBe("Plasmid")
})

test("fromCatalogItem has no search match", () => {
  const { match } = fromCatalogItem(mockStrainCatalogItem)
  expect(isNone(match)).toBe(true)
})

test("fromCatalogItem forwards the original item unchanged", () => {
  const { item } = fromCatalogItem(mockStrainCatalogItem)
  expect(item).toBe(mockStrainCatalogItem)
})

test("fromCatalogItem coerces a missing summary to an empty string", () => {
  // eslint-disable-next-line unicorn/no-null
  const data = fromCatalogItem({ ...mockStrainCatalogItem, summary: null })
  expect(data.summary).toBe("")
})

test("toEntityPath returns the strains path for a strain", () => {
  expect(toEntityPath("Strain")).toBe("strains")
})

test("toEntityPath returns the plasmids path for a plasmid", () => {
  expect(toEntityPath("Plasmid")).toBe("plasmids")
})

test("matchFieldLabel formats a single-word field in sentence case", () => {
  expect(matchFieldLabel(StockSearchFieldEnum.Label)).toBe("Label")
})

test("matchFieldLabel formats a multi-word field in sentence case", () => {
  expect(matchFieldLabel(StockSearchFieldEnum.GeneticModification)).toBe(
    "Genetic modification",
  )
})

test("isExcludedMatchField excludes the summary field", () => {
  expect(isExcludedMatchField(StockSearchFieldEnum.Summary)).toBe(true)
})

test("isExcludedMatchField excludes the public note field", () => {
  expect(isExcludedMatchField(StockSearchFieldEnum.PublicNote)).toBe(true)
})

test("isExcludedMatchField does not exclude a regular field", () => {
  expect(isExcludedMatchField(StockSearchFieldEnum.Label)).toBe(false)
})
