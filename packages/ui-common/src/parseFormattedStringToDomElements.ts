/* eslint-disable unicorn/no-null */
import { ReactNode, createElement } from "react"
import { pipe } from "fp-ts/function"
import { split as Ssplit, Monoid as SMonoid } from "fp-ts/string"
import {
  makeBy as AmakeBy,
  map as Amap,
  compact as Acompact,
  intercalate as Aintercalate,
} from "fp-ts/Array"
import { fromNullable as OfromNullable } from "fp-ts/Option"
import { map as RNEAmap } from "fp-ts/ReadonlyNonEmptyArray"
import { toArray as RAtoArray } from "fp-ts/ReadonlyArray"
import { match } from "ts-pattern"

// List of supported HTML tags for formatting
const supportedTags = ["i", "b", "sup", "sub", "h1", "h2", "h3", "h4"]

// Helper functions to check if a number is even or odd
const isEven = (n: number) => n % 2 === 0
const isOdd = (n: number) => n % 2 !== 0

// Function to replace HTML entities with their corresponding characters
const parseIrregularTags = (s: string) =>
  pipe(s.replaceAll("&lt;", "<"), (next) => next.replaceAll("&gt;", ">"))

// Function to interleave two arrays
// Assumes that both primaryArray and secondaryArray do not contain any nullish values
const interleave = (primary: Array<ReactNode>, secondary: Array<ReactNode>) =>
  // Constructs an array whose length is equal to the total of both input arrays.
  AmakeBy(primary.length + secondary.length, (index) =>
    match(index)
      .when(isEven, () => primary[index / 2])
      .when(isOdd, () => secondary[Math.floor(index / 2)])
      .otherwise(() => undefined),
  )

/**
 * Parses a string that contains format tags and returns an array of formatted and unformatted DOM elements.
 *
 * The function first normalizes the input string by replacing HTML entities with their corresponding characters.
 * It then uses regular expressions to capture the formatted text (with tags) and unformatted text.
 * The formatted text is parsed recursively to create nested DOM elements.
 * The unformatted text is wrapped in <span> elements.
 * Finally, the formatted and unformatted elements are interleaved to create the final array of DOM elements.
 */
const parseFormattedStringToDomElements = (s: string): Array<ReactNode> => {
  const normalizedString = parseIrregularTags(s)
  // Regular Expression used to capture the format tag names and the text content inside those format tags.
  const formatTagRegex = pipe(
    supportedTags,
    Amap((tag) => `<(${tag})>(.+?)<\\/${tag}>`),
    Aintercalate(SMonoid)("|"),
    (exp) => new RegExp(exp, "g"),
  )
  // Regular Expression used to capture all unformatted text.
  const splitRegex = pipe(
    supportedTags,
    Amap((tag) => `<${tag}>.+?<\\/${tag}>`),
    Aintercalate(SMonoid)("|"),
    (exp) => new RegExp(exp, "g"),
  )
  const formattedTextElements = pipe(
    [...normalizedString.matchAll(formatTagRegex)],
    Amap((matches) => pipe(matches, Amap(OfromNullable), Acompact)),
    Amap((matches) =>
      createElement(
        matches[1] as string,
        null,
        parseFormattedStringToDomElements(matches[2] as string),
      ),
    ),
  )

  const unformattedTextElements = pipe(
    normalizedString,
    Ssplit(splitRegex),
    RNEAmap((text) => createElement("span", null, text)),
    RAtoArray,
  )

  return pipe(
    interleave(unformattedTextElements, formattedTextElements),
    Amap(OfromNullable),
    Acompact,
  )
}

export { parseFormattedStringToDomElements }
