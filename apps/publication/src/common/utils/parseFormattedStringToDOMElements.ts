import { createElement, DOMElement, DOMAttributes } from "react"
import { pipe } from "fp-ts/function"
import { split as Ssplit, Monoid as SMonoid } from "fp-ts/string"
import {
  map as Amap,
  compact as Acompact,
  intercalate as Aintercalate,
} from "fp-ts/Array"
import { fromNullable as OfromNullable } from "fp-ts/Option"
import { map as RNEAmap } from "fp-ts/ReadonlyNonEmptyArray"

const supportedTags = ["i", "b", "sup", "sub", "h1", "h2", "h3", "h4"]

const parseFormattedStringToDOMElements = (
  s: string,
): DOMElement<DOMAttributes<Element>, Element>[] => {
  const formatTagRegex = pipe(
    supportedTags,
    Amap((tag) => `<(${tag})>(.+?)<\\/${tag}>`),
    Aintercalate(SMonoid)("|"),
    (s) => new RegExp(s, "g"),
  )
  const splitRegex = pipe(
    supportedTags,
    Amap((tag) => `<${tag}>.+?<\\/${tag}>`),
    Aintercalate(SMonoid)("|"),
    (s) => new RegExp(s, "g"),
  )
  const formattedTextElements = pipe(
    [...s.matchAll(formatTagRegex)],
    Amap((matches) => pipe(matches, Amap(OfromNullable), Acompact)),
    (a) => {
      return a
    },
    Amap((matches) =>
      createElement(
        matches[1],
        // eslint-disable-next-line unicorn/no-null
        null,
        parseFormattedStringToDOMElements(matches[2]),
      ),
    ),
  )

  const unformattedTextElements = pipe(
    s,
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

export { parseFormattedStringToDOMElements }
