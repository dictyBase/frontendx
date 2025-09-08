import { test, expect } from "vitest"
import { getPagePath } from "../common/utils/getPagePath"

test("creates path with all three segments", () => {
  expect(getPagePath("about", "team", "researchers")).toBe(
    "about/team/researchers",
  )
})

test("creates path with section and name only", () => {
  expect(getPagePath("about", "team", "")).toBe("about/team")
})

test("creates path with section only", () => {
  expect(getPagePath("about", "", "")).toBe("about")
})

test("filters out empty strings in middle", () => {
  expect(getPagePath("about", "", "researchers")).toBe("about/researchers")
})

test("returns empty string when all segments are empty", () => {
  expect(getPagePath("", "", "")).toBe("")
})
