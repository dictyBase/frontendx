import { test, expect } from "vitest"
import { renderHook } from "@testing-library/react-hooks"
import { useGenotypes } from "./useGenotypes"

/**
 * Drug resistances are ["neoR", "bsR", "hygR", "tetR", "phleoR", "bleoR"]
 */
test("should separate drug resistances", () => {
  const genotypes = "neoR,abc1,test2,phleoR,costanza"
  const { result } = renderHook(() => useGenotypes(genotypes))
  expect(result.current.drugResistances).toStrictEqual(["neoR", "phleoR"])
  expect(result.current.nonDrugResistances).toStrictEqual([
    "abc1",
    "test2",
    "costanza",
  ])
})
