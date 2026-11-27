import { concatAll as MconcatAll } from "fp-ts/Monoid"
import { expect, test } from "vitest"
import { MonoidVoid, SemigroupVoid } from "../index"

test("SemigroupVoid satisfies associativity and returns undefined", () => {
  const leftGrouped = SemigroupVoid.concat(
    SemigroupVoid.concat(undefined, undefined),
    undefined,
  )
  const rightGrouped = SemigroupVoid.concat(
    undefined,
    SemigroupVoid.concat(undefined, undefined),
  )

  expect(leftGrouped).toBeUndefined()
  expect(rightGrouped).toBe(leftGrouped)
})

test("MonoidVoid satisfies left and right identity laws", () => {
  const leftIdentity = MonoidVoid.concat(MonoidVoid.empty, undefined)
  const rightIdentity = MonoidVoid.concat(undefined, MonoidVoid.empty)

  expect(MonoidVoid.empty).toBeUndefined()
  expect(leftIdentity).toBeUndefined()
  expect(rightIdentity).toBeUndefined()
})

test("MonoidVoid folds empty and non-empty unit arrays via concatAll", () => {
  const foldVoid = MconcatAll(MonoidVoid)

  expect(foldVoid([])).toBeUndefined()
  expect(foldVoid([undefined, undefined, undefined])).toBeUndefined()
})
