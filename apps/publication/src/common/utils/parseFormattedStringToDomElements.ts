import { createElement, DOMElement, DOMAttributes } from "react"
import { pipe } from "fp-ts/function"
import { replace as Sreplace, split as Ssplit, Monoid as SMonoid } from "fp-ts/string"
import {
  map as Amap,
  compact as Acompact,
  intercalate as Aintercalate,
} from "fp-ts/Array"
import { fromNullable as OfromNullable } from "fp-ts/Option"
import { map as RNEAmap } from "fp-ts/ReadonlyNonEmptyArray"

const supportedTags = ["i", "b", "sup", "sub", "h1", "h2", "h3", "h4"]

const preprocessIrregularTags = (s: string) => {
  const openSquareBracketRegexp = new RegExp(/&lt;/g)
  const closeSquareBracketRegexp = new RegExp(/&gt;/g)
  return pipe(
    s.replaceAll(openSquareBracketRegexp, "<"),
    (next) => next.replaceAll(closeSquareBracketRegexp, ">")
  )
}

const parseFormattedStringToDomElements = (
  s: string,
): DOMElement<DOMAttributes<Element>, Element>[] => {
  const normalizedString = preprocessIrregularTags(s) 
  // Regular Expression used to capture the text content in format tags.
  const formatTagRegex = pipe(
    supportedTags,
    Amap((tag) => `<(${tag})>(.+?)<\\/${tag}>`),
    Aintercalate(SMonoid)("|"),
    (exp) => new RegExp(exp, "g"),
  )
  // Regular Expression used to capture the text content in format tags.
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
        matches[1],
        // eslint-disable-next-line unicorn/no-null
        null,
        parseFormattedStringToDomElements(matches[2]),
      ),
    ),
  )

  const unformattedTextElements = pipe(
    normalizedString,
    Ssplit(splitRegex),
    // eslint-disable-next-line unicorn/no-null
    RNEAmap((text) => createElement("span", null, text)),
  )
  const final = []
  // eslint-disable-next-line unicorn/no-for-loop
  for (let index = 0; index < unformattedTextElements.length; index += 1) {
    final.push(unformattedTextElements[index])
    if (formattedTextElements[index]) final.push(formattedTextElements[index])
  }
  return final
}

export { parseFormattedStringToDomElements }
