import { pipe } from "fp-ts/function"
import { none as Onone, some as Osome } from "fp-ts/Option"
import { and as Pand } from "fp-ts/Predicate"
import { map as RAmap } from "fp-ts/ReadonlyArray"
import { expect, test, vi } from "vitest"
import {
  type Case,
  containsMatch,
  match,
  matchCase,
  matchConst,
  matchDefault,
  maxStringLength,
  minStringLength,
} from "../index"

const isMedium = pipe(
  minStringLength(8),
  Pand(containsMatch(/[A-Z]/)),
  Pand(containsMatch(/[a-z]/)),
)
const isStrong = pipe(isMedium, Pand(containsMatch(/\d/)))

const classifyPassword = match<string, string>("unknown", [
  matchConst(isStrong, "strong"),
  matchConst(isMedium, "medium"),
  matchConst(maxStringLength(7), "weak"),
])

test("match returns the value of the first case that holds", () => {
  expect(
    pipe(
      ["123", "Password", "Password123", "password123"],
      RAmap(classifyPassword),
    ),
  ).toEqual(["weak", "medium", "strong", "unknown"])
})

test("match does not call a case after the first match", () => {
  const later = vi.fn((): ReturnType<Case<number, string>> => Osome("later"))
  const classify = match<number, string>("none", [
    matchConst(() => true, "first"),
    later,
  ])
  expect(classify(1)).toBe("first")
  expect(later).not.toHaveBeenCalled()
})

test("match returns the fallback when there are no cases", () => {
  expect(match<number, string>("fallback", [])(1)).toBe("fallback")
})

test("matchCase applies the function only when the predicate holds", () => {
  const double = matchCase(
    (n: number) => n > 0,
    (n: number) => n * 2,
  )
  expect([double(2), double(-1)]).toEqual([Osome(4), Onone])
})

test("matchDefault always matches", () => {
  expect(matchDefault((n: number) => `n=${n}`)(3)).toEqual(Osome("n=3"))
})
