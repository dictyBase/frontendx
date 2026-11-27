import { pipe } from "fp-ts/function"
import { and as Pand } from "fp-ts/Predicate"
import { expect, test } from "vitest"
import {
  containsMatch,
  intBetween,
  intBetweenInclusive,
  lengthEq,
  maxLength,
  maxStringLength,
  minLength,
  minStringLength,
  notEqualNumber,
  notEqualString,
  stringEq,
  stringLengthBetween,
  stringLengthEq,
} from "../index"

test("intBetween includes the lower end and excludes the upper end", () => {
  const isValid = intBetween(1, 10)
  expect([1, 9, 10, 0].map((value) => isValid(value))).toEqual([
    true,
    true,
    false,
    false,
  ])
})

test("intBetween rejects a number that is not an integer", () => {
  expect(intBetween(1, 10)(1.5)).toBe(false)
})

test("intBetweenInclusive includes both ends", () => {
  const isValid = intBetweenInclusive(1, 10)
  expect([1, 10, 11, 0, 2.5].map((value) => isValid(value))).toEqual([
    true,
    true,
    false,
    false,
    false,
  ])
})

test("string length predicates compare the length", () => {
  expect(minStringLength(3)("ab")).toBe(false)
  expect(minStringLength(3)("abc")).toBe(true)
  expect(maxStringLength(3)("abcd")).toBe(false)
  expect(stringLengthEq(2)("ab")).toBe(true)
})

test("string length counts UTF-16 code units, not characters", () => {
  // "𝔸" is one character but two UTF-16 code units.
  expect(stringLengthEq(2)("𝔸")).toBe(true)
})

test("stringLengthBetween includes both ends", () => {
  const isValid = stringLengthBetween(2, 3)
  expect(["a", "ab", "abc", "abcd"].map((value) => isValid(value))).toEqual([
    false,
    true,
    true,
    false,
  ])
})

test("equality predicates compare values", () => {
  expect(stringEq("go")("go")).toBe(true)
  expect(notEqualString("x")("x")).toBe(false)
  expect(notEqualNumber(5)(4)).toBe(true)
})

test("containsMatch tests a regular expression", () => {
  expect(containsMatch(/\d/)("abc1")).toBe(true)
  expect(containsMatch(/\d/)("abc")).toBe(false)
})

test("containsMatch with a global regex gives the same result on each call", () => {
  const hasDigit = containsMatch(/\d/g)
  expect([hasDigit("a1"), hasDigit("a1")]).toEqual([true, true])
})

test("array length predicates compare the length", () => {
  expect(lengthEq<number>(2)([1, 2])).toBe(true)
  expect(minLength<number>(2)([1])).toBe(false)
  expect(maxLength<number>(2)([1, 2, 3])).toBe(false)
})

test("predicates compose with Predicate.and", () => {
  const isUsername = pipe(minStringLength(3), Pand(maxStringLength(5)))
  expect(["ab", "abcd", "abcdef"].map((value) => isUsername(value))).toEqual([
    false,
    true,
    false,
  ])
})
