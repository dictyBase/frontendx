import { test, expect } from "vitest"
import { buildNavItems } from "../features/NewHome/useCatalogSearch"

const mockStrain: { id: string; label: string; summary?: string } = {
  id: "DBS0001",
  label: "strain one",
  summary: "a strain",
}
const mockPlasmid: { id: string; name: string; summary?: string } = {
  id: "DBP0001",
  name: "plasmid one",
  summary: "a plasmid",
}

const strainFooterHref = "/strains"
const strainFooterLabel = "Advanced Strain Search"
const plasmidFooterHref = "/plasmids"
const plasmidFooterLabel = "Advanced Plasmid Search"

const build = (strains = [mockStrain], plasmids = [mockPlasmid]) =>
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

test("maps strain fields correctly", () => {
  const result = build([mockStrain], [])
  const strain = result.find((item) => item.type === "strain")
  expect(strain).toMatchObject({
    type: "strain",
    id: mockStrain.id,
    descriptor: mockStrain.label,
    summary: mockStrain.summary,
    to: `/strains/${mockStrain.id}`,
  })
})

test("maps plasmid fields correctly", () => {
  const result = build([], [mockPlasmid])
  const plasmid = result.find((item) => item.type === "plasmid")
  expect(plasmid).toMatchObject({
    type: "plasmid",
    id: mockPlasmid.id,
    descriptor: mockPlasmid.name,
    summary: mockPlasmid.summary,
    to: `/plasmids/${mockPlasmid.id}`,
  })
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

test("treats missing summary as undefined", () => {
  const result = build([{ id: mockStrain.id, label: mockStrain.label }], [])
  const strain = result.find((item) => item.type === "strain")
  expect(strain).toMatchObject({ summary: undefined })
})
