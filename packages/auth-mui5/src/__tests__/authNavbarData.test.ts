import { test, expect } from "vitest"
import { createAuthNavbarItems } from "../data/authNavbarData"

const frontPageUrl = "https://frontpage.example.com"
const stockCenterUrl = "https://stockcenter.example.com"

/**
 * Reads the "Dicty Stock Center" dropdown of the authorized navbar data.
 *
 * @param frontPage - The base url of the front page application.
 * @param stockCenter - The base url of the stock center application.
 * @returns The items of the `dsc` navbar section.
 */
const stockCenterItems = (
  frontPage = frontPageUrl,
  stockCenter = stockCenterUrl,
) => {
  const dscSection = createAuthNavbarItems(frontPage, stockCenter).data.find(
    ({ type }) => type === "dsc",
  )
  return dscSection?.attributes.items ?? []
}

/**
 * Finds the navbar item with the given label.
 *
 * @param label - The label to look for, e.g. "Strain Catalog".
 * @returns The matching item, or `undefined` when it is absent.
 */
const itemLabeled = (label: string) =>
  stockCenterItems().find((item) => item.label === label)

test("links the strain catalog to the strains resource route", () => {
  expect(itemLabeled("Strain Catalog")?.link).toBe(`${stockCenterUrl}/strains`)
})

test("links the plasmid catalog to the plasmids resource route", () => {
  expect(itemLabeled("Plasmid Catalog")?.link).toBe(
    `${stockCenterUrl}/plasmids`,
  )
})

test("links the catalogs to their standalone resource routes", () => {
  const links = stockCenterItems().map(({ link }) => link)
  expect(links).toContain(`${stockCenterUrl}/strains`)
  expect(links).toContain(`${stockCenterUrl}/plasmids`)
})
