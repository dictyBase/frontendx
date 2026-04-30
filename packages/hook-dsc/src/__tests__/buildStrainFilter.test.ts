import { expect, test } from "vitest"
import { StrainType } from "dicty-graphql-schema"
import { DEFAULT_STRAIN_GROUP } from "../graphql_config"
import { buildStrainListFilter } from "../functional"

const TEST_SUMMARY = "CRISPR/Cas9 mutant"
const TEST_DESCRIPTOR = "Strain A"

test("Returns a filter with the default strain group if no valid parameters are given", () => {
  const parameters = new URLSearchParams()
  expect(buildStrainListFilter(parameters)).toEqual(DEFAULT_STRAIN_GROUP)
})

test("Maps `group` parameter to a valid `filter` object for `StrainListQueryVariables`", () => {
  const parameters = new URLSearchParams({
    group: "gwdi",
  })
  expect(buildStrainListFilter(parameters)).toEqual({
    strain_type: StrainType.Gwdi,
  })
})

test("Maps `summary` parameter to a valid `filter` object for `StrainListQueryVariables`", () => {
  const parameters = new URLSearchParams({
    summary: TEST_SUMMARY,
  })
  expect(buildStrainListFilter(parameters)).toEqual({
    ...DEFAULT_STRAIN_GROUP,
    summary: TEST_SUMMARY,
  })
})

test("Handles valid multiple parameters", () => {
  const parameters = new URLSearchParams({
    summary: TEST_SUMMARY,
    descriptor: TEST_DESCRIPTOR,
  })
  expect(buildStrainListFilter(parameters)).toEqual({
    ...DEFAULT_STRAIN_GROUP,
    summary: TEST_SUMMARY,
    label: TEST_DESCRIPTOR,
  })
})

test("Handles valid multiple parameters", () => {
  const parameters = new URLSearchParams({
    summary: TEST_SUMMARY,
    descriptor: TEST_DESCRIPTOR,
  })
  expect(buildStrainListFilter(parameters)).toEqual({
    ...DEFAULT_STRAIN_GROUP,
    summary: TEST_SUMMARY,
    label: TEST_DESCRIPTOR,
  })
})

test("Ignores invalid parameters", () => {
  const parameters = new URLSearchParams({
    bad_parameter: "invalid",
  })
  expect(buildStrainListFilter(parameters)).toEqual(DEFAULT_STRAIN_GROUP)
})
