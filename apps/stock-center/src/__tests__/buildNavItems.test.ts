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

const build = (
  strains: Array<SuggestionItem> = [mockStrain],
  plasmids: Array<SuggestionItem> = [mockPlasmid],
) => buildNavItems(strains, plasmids)

test("returns empty array when both lists are empty", () => {
  expect(build([], [])).toHaveLength(0)
})

test("returns only strain items with no divider when only strains are present", () => {
  const result = build([mockStrain], [])
  const types = result.map((item) => item.type)
  expect(types).toEqual(["strain"])
  expect(types).not.toContain("divider")
})

test("returns only plasmid items with no divider when only plasmids are present", () => {
  const result = build([], [mockPlasmid])
  const types = result.map((item) => item.type)
  expect(types).toEqual(["plasmid"])
  expect(types).not.toContain("divider")
})

test("lists strain items followed by plasmid items when both are present", () => {
  const result = build([mockStrain], [mockPlasmid])
  const types = result.map((item) => item.type)
  expect(types).toEqual(["strain", "plasmid"])
  expect(types).not.toContain("divider")
})

test("does not add any footer items", () => {
  const result = build([mockStrain], [mockPlasmid])
  const types = result.map((item) => item.type)
  expect(types).not.toContain("strainFooter")
  expect(types).not.toContain("plasmidFooter")
  expect(types).not.toContain("catalogFooter")
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

test("handles multiple strains and produces one item per strain", () => {
  const strains: Array<SuggestionItem> = [
    { id: "DBS0001", display_text: "axeA" },
    { id: "DBS0002", display_text: "axeB" },
  ]
  const result = build(strains, [])
  const strainItems = result.filter((item) => item.type === "strain")
  expect(strainItems).toHaveLength(2)
})

test("handles multiple plasmids and produces one item per plasmid", () => {
  const plasmids: Array<SuggestionItem> = [
    { id: "DBP0001", display_text: "pAXE1" },
    { id: "DBP0002", display_text: "pAXE2" },
  ]
  const result = build([], plasmids)
  const plasmidItems = result.filter((item) => item.type === "plasmid")
  expect(plasmidItems).toHaveLength(2)
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
