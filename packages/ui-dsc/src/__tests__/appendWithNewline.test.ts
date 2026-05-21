import { expect, test } from "vitest"
import { appendWithNewline } from "../utils/appendWithNewline"

test("Should append 2 newline characters to `base`, followed by `add`, if `base` is not an empty string", () => {
  const base = "initial text"
  const add = "appended string"
  expect(appendWithNewline(base, add)).toBe(`${base}\n\n${add}`)
})

test("Should return `add` if `base` is empty", () => {
  const base = ""
  const add = "appended string"
  expect(appendWithNewline(base, add)).toBe(add)
})
