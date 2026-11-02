import { test, expect } from "vitest"
import { hasUsableName } from "../utils/hasUsableName"

test("hasUsableName reports false for an empty name", () => {
  expect(hasUsableName({ name: "" })).toBe(false)
})

test("hasUsableName reports false for a whitespace-only name", () => {
  expect(hasUsableName({ name: "   " })).toBe(false)
})

test("hasUsableName reports true for a named gene", () => {
  expect(hasUsableName({ name: "sadA" })).toBe(true)
})

test("hasUsableName reports true for a name with leading whitespace", () => {
  expect(hasUsableName({ name: "  sadA" })).toBe(true)
})
