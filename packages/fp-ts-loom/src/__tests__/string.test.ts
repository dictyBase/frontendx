import { pipe } from "fp-ts/function"
import { expect, test } from "vitest"
import {
  brackets,
  collapseWhitespace,
  Comma,
  concatFields,
  joinComma,
  joinLines,
  joinMiddleDot,
  joinSemicolon,
  joinSpace,
  Label,
  mapNonEmpty,
  MiddleDot,
  parens,
  period,
  quote,
  separatorMonoid,
  Space,
  wrap,
} from "../index"

test("a separator monoid drops an empty operand with its separator", () => {
  expect(Comma.concat("a", "")).toBe("a")
  expect(Comma.concat("", "b")).toBe("b")
  expect(Comma.concat("a", "b")).toBe("a, b")
  expect(Label.concat("Name", "Ada")).toBe("Name: Ada")
})

test("a separator monoid satisfies the identity and associativity laws", () => {
  const { concat: dash, empty } = separatorMonoid("-")
  expect(dash(empty, "x")).toBe("x")
  expect(dash("x", empty)).toBe("x")
  expect(dash(dash("a", "b"), "c")).toBe(dash("a", dash("b", "c")))
  expect(dash(dash("a", ""), "c")).toBe(dash("a", dash("", "c")))
})

test("join functions skip empty elements", () => {
  expect(joinComma(["a", "", "c"])).toBe("a, c")
  expect(joinSpace(["a", "b"])).toBe("a b")
  expect(joinSemicolon(["a", "b"])).toBe("a; b")
  expect(joinMiddleDot(["a", "b"])).toBe("a · b")
  expect(joinLines(["a", "b"])).toBe("a\nb")
  expect(joinComma([])).toBe("")
})

test("collapseWhitespace trims and collapses runs of whitespace", () => {
  expect(collapseWhitespace("  a \n b ")).toBe("a b")
  expect(collapseWhitespace("   ")).toBe("")
})

test("wrap helpers add a prefix and a suffix", () => {
  expect(wrap("<", ">")("x")).toBe("<x>")
  expect([parens("x"), brackets("x"), quote("x"), period("x")]).toEqual([
    "(x)",
    "[x]",
    '"x"',
    "x.",
  ])
})

test("mapNonEmpty does not change an empty string", () => {
  expect(pipe("", mapNonEmpty(parens))).toBe("")
  expect(pipe("2020", mapNonEmpty(parens))).toBe("(2020)")
})

type Citation = Readonly<{ authors: string; year: string; doi: string }>

const citationLine = concatFields<Citation>(MiddleDot)([
  ({ authors }) => authors,
  ({ year }) => pipe(year, mapNonEmpty(parens)),
  ({ doi }) => doi,
])

test("concatFields drops a missing field with its separator", () => {
  expect(citationLine({ authors: "Lee", year: "2020", doi: "" })).toBe(
    "Lee · (2020)",
  )
  expect(citationLine({ authors: "Lee", year: "", doi: "10.1/x" })).toBe(
    "Lee · 10.1/x",
  )
})

test("Space is a separator monoid with a single space", () => {
  expect(Space.concat("a", "b")).toBe("a b")
})
