import { expect, test } from "vitest"
import { pipe } from "fp-ts/function"
import { Some, isNone, isSome } from "fp-ts/Option"
import { get } from "../functional/UrlSearchParameters"

test("returns `None` when parameter does not exist", () => {
  const parameters = new URLSearchParams()
  const result = pipe(parameters, get("testValue"))
  expect(isNone(result)).toBe(true)
})

test("returns `Some` when parameter does not exist", () => {
  const parameters = new URLSearchParams({ name: "test" })
  const result = pipe(parameters, get("name"))
  expect(isSome(result)).toBe(true)
  expect((result as Some<string>).value).toBe("test")
})
