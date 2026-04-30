import { expect, test } from "vitest"
import { capitalizeFirst } from "../utils"

test("capitalizes the first character of a lowercase string", () => {
  expect(capitalizeFirst("hello")).toBe("Hello")
})

test("returns the same string when first character is already capitalized", () => {
  expect(capitalizeFirst("Hello")).toBe("Hello")
})

test("capitalizes only the first character, leaving rest unchanged", () => {
  expect(capitalizeFirst("hello world")).toBe("Hello world")
})

test("handles single character string", () => {
  expect(capitalizeFirst("a")).toBe("A")
})

test("handles already capitalized single character", () => {
  expect(capitalizeFirst("A")).toBe("A")
})

test("returns empty string when given empty string", () => {
  expect(capitalizeFirst("")).toBe("")
})

test("handles string with numbers at start", () => {
  expect(capitalizeFirst("123abc")).toBe("123abc")
})

test("handles string with special characters at start", () => {
  expect(capitalizeFirst("@hello")).toBe("@hello")
})

test("handles all uppercase string", () => {
  expect(capitalizeFirst("HELLO")).toBe("HELLO")
})

test("handles mixed case string", () => {
  expect(capitalizeFirst("hELLO")).toBe("HELLO")
})
