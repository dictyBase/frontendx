import { left as Eleft, right as Eright } from "fp-ts/Either"
import { map as RAmap } from "fp-ts/ReadonlyArray"
import { pipe } from "fp-ts/function"
import { expect, test } from "vitest"
import { parseFloat, parseInt, parseWith } from "../index"

const PARSE_ERROR = "PARSE_ERROR"
const NOT_INTEGER = "not an integer"
const NOT_NUMBER = "not a number"

test("parseInt returns Right for an integer string", () => {
  expect(parseInt("42")).toEqual(Eright(42))
  expect(parseInt(" -7 ")).toEqual(Eright(-7))
})

test("parseInt returns Left for partial, empty, blank and decimal input", () => {
  expect(pipe(["12abc", "", " ", "1.5"], RAmap(parseInt))).toEqual([
    Eleft({ type: PARSE_ERROR, message: NOT_INTEGER, input: "12abc" }),
    Eleft({ type: PARSE_ERROR, message: NOT_INTEGER, input: "" }),
    Eleft({ type: PARSE_ERROR, message: NOT_INTEGER, input: " " }),
    Eleft({ type: PARSE_ERROR, message: NOT_INTEGER, input: "1.5" }),
  ])
})

test("parseFloat returns Right for a decimal string", () => {
  expect(parseFloat("1.5")).toEqual(Eright(1.5))
})

test("parseFloat returns Left for partial, empty and NaN input", () => {
  expect(pipe(["1.5x", "", "NaN"], RAmap(parseFloat))).toEqual([
    Eleft({ type: PARSE_ERROR, message: NOT_NUMBER, input: "1.5x" }),
    Eleft({ type: PARSE_ERROR, message: NOT_NUMBER, input: "" }),
    Eleft({ type: PARSE_ERROR, message: NOT_NUMBER, input: "NaN" }),
  ])
})

test("parseWith keeps the parsed values and drops the failures", () => {
  expect(parseWith(parseInt)(["1", "x", "3"])).toEqual([1, 3])
})

test("parseInt returns Left for an integer outside the safe range", () => {
  expect(parseInt("9007199254740993")).toEqual(
    Eleft({
      type: PARSE_ERROR,
      message: NOT_INTEGER,
      input: "9007199254740993",
    }),
  )
  expect(parseInt("9007199254740991")).toEqual(Eright(9_007_199_254_740_991))
})

test("parseFloat returns Left for a number that overflows to Infinity", () => {
  expect(parseFloat("1e400")).toEqual(
    Eleft({ type: PARSE_ERROR, message: NOT_NUMBER, input: "1e400" }),
  )
})
