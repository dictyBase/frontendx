import { createElement, DOMElement, DOMAttributes } from "react"
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
import { match } from "ts-pattern"

const supportedTags = ["i", "b", "sup", "sub", "h1", "h2", "h3", "h4"]

const isEven = (n: number) => n % 2 === 0
const isOdd = (n: number) => n % 2 !== 0

const parseIrregularTags = (s: string) =>
  pipe(s.replaceAll("&lt;", "<"), (next) => next.replaceAll("&gt;", ">"))

// Assumes that both trailing and leading arrays do not contain any nullish values
const interleaf = <A, B>(leading: readonly A[], trailing: readonly B[]) => {
  const totalLength = leading.length + trailing.length
  let cursorL = 0
  let cursorT = 0

  return AmakeBy<A | B | undefined>(totalLength, (index) =>
    match(index)
      .when(isEven, () => {
        if (leading[cursorL]) {
          const next = leading[cursorL]
          cursorL += 1
          return next
        }
        const next = trailing[cursorT]
        cursorT += 1
        return next
      })
      .when(isOdd, () => {
        if (trailing[cursorT]) {
          const next = trailing[cursorT]
          cursorT += 1
          return next
        }
        const next = leading[cursorL]
        cursorL += 1
        return next
      })
      .otherwise(() => undefined),
  )
}

/**
 * Parses a string containing formatting tags and returns an array of formatted and unformatted DOM elements.
 */
const parseFormattedStringToDomElements = (
  s: string,
): DOMElement<DOMAttributes<Element>, Element>[] => {
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
        // eslint-disable-next-line unicorn/no-null
        null,
        parseFormattedStringToDomElements(matches[2] as string),
      ),
    ),
  )

  const unformattedTextElements = pipe(
    normalizedString,
    Ssplit(splitRegex),
    // eslint-disable-next-line unicorn/no-null
    RNEAmap((text) => createElement("span", null, text)),
  )
  return pipe(
    interleaf(unformattedTextElements, formattedTextElements),
    Amap(OfromNullable),
    Acompact,
  )
}

export { parseFormattedStringToDomElements }
