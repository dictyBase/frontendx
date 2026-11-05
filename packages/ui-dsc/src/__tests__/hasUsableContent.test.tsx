import React from "react"
import { test, expect } from "vitest"
import { hasUsableContent } from "../utils/hasUsableContent"

test("returns false for null", () => {
  // eslint-disable-next-line unicorn/no-null
  expect(hasUsableContent(null)).toBe(false)
})

test("returns false for undefined", () => {
  expect(hasUsableContent(undefined)).toBe(false)
})

test("returns false for an empty string", () => {
  expect(hasUsableContent("")).toBe(false)
})

test("returns true for a non-empty string", () => {
  expect(hasUsableContent("AX4")).toBe(true)
})

test("returns false for an empty array", () => {
  expect(hasUsableContent([])).toBe(false)
})

test("returns true for a non-empty array", () => {
  expect(hasUsableContent([<span key="a">item</span>])).toBe(true)
})

test("returns false for an empty React fragment", () => {
  expect(hasUsableContent(<></>)).toBe(false)
})

test("returns true for a React fragment with children", () => {
  expect(hasUsableContent(<>content</>)).toBe(true)
})

test("returns true for a regular React element", () => {
  expect(hasUsableContent(<span>hello</span>)).toBe(true)
})

test("returns true for a React element that is not a fragment, regardless of children", () => {
  expect(hasUsableContent(<div />)).toBe(true)
})
