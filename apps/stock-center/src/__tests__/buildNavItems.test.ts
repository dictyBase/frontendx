import { test, expect } from "vitest"
import { buildNavItems } from "../features/NewHome/useComprehensiveSearch"
import type { SuggestionItem } from "../features/NewHome/useComprehensiveSearch"

const mockStrain: SuggestionItem = {
  id: "DBS0001",
  display_text: "strain one",
}

const mockPlasmid: SuggestionItem = {
  id: "DBP0001",
  display_text: "plasmid one",
}

const strainFooterHref = "/strains"
const strainFooterLabel = "Advanced Strain Search"
const plasmidFooterHref = "/plasmids"
const plasmidFooterLabel = "Advanced Plasmid Search"

const build = (
  strains: Array<SuggestionItem> = [mockStrain],
  plasmids: Array<SuggestionItem> = [mockPlasmid],
) =>
  buildNavItems(
    strains,
    plasmids,
    strainFooterHref,
    strainFooterLabel,
    plasmidFooterHref,
    plasmidFooterLabel,
  )

test("returns empty array when both lists are empty", () => {
  const result = build([], [])
  expect(result).toHaveLength(0)
})

test("returns strain items and footer with no divider when only strains are present", () => {
  const result = build([mockStrain], [])
  const types = result.map((item) => item.type)
  expect(types).toEqual(["strain", "strainFooter"])
  expect(types).not.toContain("divider")
})

test("returns plasmid items and footer with no divider when only plasmids are present", () => {
  const result = build([], [mockPlasmid])
  const types = result.map((item) => item.type)
  expect(types).toEqual(["plasmid", "plasmidFooter"])
  expect(types).not.toContain("divider")
})

test("inserts a divider between strain and plasmid sections when both are present", () => {
  const result = build([mockStrain], [mockPlasmid])
  const types = result.map((item) => item.type)
  expect(types).toEqual([
    "strain",
    "strainFooter",
    "divider",
    "plasmid",
    "plasmidFooter",
  ])
})

test("maps strain display_text to descriptor", () => {
  const result = build([mockStrain], [])
  const strain = result.find((item) => item.type === "strain")
  expect(strain).toMatchObject({
    type: "strain",
    id: mockStrain.id,
    descriptor: mockStrain.display_text,
    summary: undefined,
    to: `/strains/${mockStrain.id}`,
  })
})

test("maps plasmid display_text to descriptor", () => {
  const result = build([], [mockPlasmid])
  const plasmid = result.find((item) => item.type === "plasmid")
  expect(plasmid).toMatchObject({
    type: "plasmid",
    id: mockPlasmid.id,
    descriptor: mockPlasmid.display_text,
    summary: undefined,
    to: `/plasmids/${mockPlasmid.id}`,
  })
})

test("strain nav item always has undefined summary", () => {
  const result = build([mockStrain], [])
  const strain = result.find((item) => item.type === "strain")
  expect(strain).toMatchObject({ summary: undefined })
})

test("plasmid nav item always has undefined summary", () => {
  const result = build([], [mockPlasmid])
  const plasmid = result.find((item) => item.type === "plasmid")
  expect(plasmid).toMatchObject({ summary: undefined })
})

test("includes correct strain footer href and label", () => {
  const result = build([mockStrain], [])
  const footer = result.find((item) => item.type === "strainFooter")
  expect(footer).toMatchObject({
    to: strainFooterHref,
    label: strainFooterLabel,
  })
})

test("includes correct plasmid footer href and label", () => {
  const result = build([], [mockPlasmid])
  const footer = result.find((item) => item.type === "plasmidFooter")
  expect(footer).toMatchObject({
    to: plasmidFooterHref,
    label: plasmidFooterLabel,
  })
})

test("handles multiple strains with a single footer", () => {
  const strains: Array<SuggestionItem> = [
    { id: "DBS0001", display_text: "axeA" },
    { id: "DBS0002", display_text: "axeB" },
  ]
  const result = build(strains, [])
  const strainItems = result.filter((item) => item.type === "strain")
  const footers = result.filter((item) => item.type === "strainFooter")
  expect(strainItems).toHaveLength(2)
  expect(footers).toHaveLength(1)
})

test("handles multiple plasmids with a single footer", () => {
  const plasmids: Array<SuggestionItem> = [
    { id: "DBP0001", display_text: "pAXE1" },
    { id: "DBP0002", display_text: "pAXE2" },
  ]
  const result = build([], plasmids)
  const plasmidItems = result.filter((item) => item.type === "plasmid")
  const footers = result.filter((item) => item.type === "plasmidFooter")
  expect(plasmidItems).toHaveLength(2)
  expect(footers).toHaveLength(1)
})

test("produces correct to path for each strain", () => {
  const strains: Array<SuggestionItem> = [
    { id: "DBS0001", display_text: "axeA" },
    { id: "DBS0002", display_text: "axeB" },
  ]
  const result = build(strains, [])
  const strainItems = result.filter((item) => item.type === "strain")
  expect(strainItems[0]).toMatchObject({ to: "/strains/DBS0001" })
  expect(strainItems[1]).toMatchObject({ to: "/strains/DBS0002" })
})

test("produces correct to path for each plasmid", () => {
  const plasmids: Array<SuggestionItem> = [
    { id: "DBP0001", display_text: "pAXE1" },
    { id: "DBP0002", display_text: "pAXE2" },
  ]
  const result = build([], plasmids)
  const plasmidItems = result.filter((item) => item.type === "plasmid")
  expect(plasmidItems[0]).toMatchObject({ to: "/plasmids/DBP0001" })
  expect(plasmidItems[1]).toMatchObject({ to: "/plasmids/DBP0002" })
})
