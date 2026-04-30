import { expect, test } from "vitest"
import { PlasmidType } from "dicty-graphql-schema"
import { DEFAULT_PLASMID_GROUP } from "../graphql_config"
import { buildPlasmidListFilter } from "../functional"

const TEST_SUMMARY = "CRISPR/Cas9 mutant"
const TEST_DESCRIPTOR = "Plasmid A"

test("Returns a filter with the default plasmid group if no valid parameters are given", () => {
  const parameters = new URLSearchParams()
  expect(buildPlasmidListFilter(parameters)).toEqual(DEFAULT_PLASMID_GROUP)
})

test("Maps `group` parameter to a valid `filter` object for `PlasmidListQueryVariables`", () => {
  const parameters = new URLSearchParams({
    group: "goldenbraid",
  })
  expect(buildPlasmidListFilter(parameters)).toEqual({
    plasmid_type: PlasmidType.GoldenBraid,
  })
})

test("Maps `summary` parameter to a valid `filter` object for `PlasmidListQueryVariables`", () => {
  const parameters = new URLSearchParams({
    summary: TEST_SUMMARY,
  })
  expect(buildPlasmidListFilter(parameters)).toEqual({
    ...DEFAULT_PLASMID_GROUP,
    summary: TEST_SUMMARY,
  })
})

test("Handles valid multiple parameters", () => {
  const parameters = new URLSearchParams({
    summary: TEST_SUMMARY,
    descriptor: TEST_DESCRIPTOR,
  })
  expect(buildPlasmidListFilter(parameters)).toEqual({
    ...DEFAULT_PLASMID_GROUP,
    summary: TEST_SUMMARY,
    name: TEST_DESCRIPTOR,
  })
})

test("Handles valid multiple parameters", () => {
  const parameters = new URLSearchParams({
    summary: TEST_SUMMARY,
    descriptor: TEST_DESCRIPTOR,
  })
  expect(buildPlasmidListFilter(parameters)).toEqual({
    ...DEFAULT_PLASMID_GROUP,
    summary: TEST_SUMMARY,
    name: TEST_DESCRIPTOR,
  })
})

test("Ignores invalid parameters", () => {
  const parameters = new URLSearchParams({
    bad_parameter: "invalid",
  })
  expect(buildPlasmidListFilter(parameters)).toEqual(DEFAULT_PLASMID_GROUP)
})
