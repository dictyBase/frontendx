import {
  flatMap as EflatMap,
  fromPredicate as EfromPredicate,
  left as Eleft,
  right as Eright,
} from "fp-ts/Either"
import { pipe } from "fp-ts/function"
import { expect, test } from "vitest"
import { constError, maxStringLength, minStringLength } from "../index"

test("constError returns the same error object on every call", () => {
  const tooShort = constError<string, "TOO_SHORT">("TOO_SHORT", "too short")
  expect(tooShort("a")).toBe(tooShort("b"))
  expect(tooShort("a")).toEqual({ type: "TOO_SHORT", message: "too short" })
})

test("constError returns a frozen error object", () => {
  const failure = constError<number, "BAD">("BAD", "bad")
  expect(Object.isFrozen(failure(1))).toBe(true)
})

const shortError = constError<string, "USERNAME">(
  "USERNAME",
  "at least 3 characters",
)
const longError = constError<string, "USERNAME">(
  "USERNAME",
  "at most 20 characters",
)

const validateUsername = (username: string) =>
  pipe(
    username,
    EfromPredicate(minStringLength(3), shortError),
    EflatMap(EfromPredicate(maxStringLength(20), longError)),
  )

test("constError works as the error factory of Either.fromPredicate", () => {
  expect(validateUsername("alice")).toEqual(Eright("alice"))
  expect(validateUsername("ab")).toEqual(Eleft(shortError("ab")))
  expect(validateUsername("a".repeat(21))).toEqual(Eleft(longError("")))
})
