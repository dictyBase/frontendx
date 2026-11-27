import type { Endomorphism } from "fp-ts/Endomorphism"
import { constant, flow, getMonoid as FgetMonoid, pipe } from "fp-ts/function"
import { concatAll as MconcatAll, type Monoid } from "fp-ts/Monoid"
import {
  fromPredicate as OfromPredicate,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { not as Pnot } from "fp-ts/Predicate"
import {
  filter as RAfilter,
  intercalate as RAintercalate,
} from "fp-ts/ReadonlyArray"
import {
  isEmpty as SisEmpty,
  Monoid as SMonoid,
  split as Ssplit,
  trim as Strim,
} from "fp-ts/string"

const isNonEmptyString = Pnot(SisEmpty)

/**
 * `Monoid<string>` that puts `separator` between two non-empty strings.
 * An empty operand drops out together with its separator, so an optional
 * part needs no branch. `empty` is `""`.
 */
const separatorMonoid = (separator: string): Monoid<string> => ({
  concat: (first, second) =>
    pipe(
      [first, second],
      RAfilter(isNonEmptyString),
      RAintercalate(SMonoid)(separator),
    ),
  empty: "",
})

const Space = separatorMonoid(" ")
const Comma = separatorMonoid(", ")
const Semicolon = separatorMonoid("; ")
const Colon = separatorMonoid(":")
const Label = separatorMonoid(": ")
const MiddleDot = separatorMonoid(" · ")
const EmDash = separatorMonoid(" — ")
const Newline = separatorMonoid("\n")

const joinSpace = MconcatAll(Space)
const joinComma = MconcatAll(Comma)
const joinSemicolon = MconcatAll(Semicolon)
const joinMiddleDot = MconcatAll(MiddleDot)
const joinLines = MconcatAll(Newline)

/**
 * Trims the string and replaces each run of whitespace with one space.
 */
const collapseWhitespace: Endomorphism<string> = flow(
  Strim,
  Ssplit(/\s+/),
  joinSpace,
)

/**
 * Adds `prefix` before and `suffix` after the string.
 */
const wrap =
  (prefix: string, suffix: string): Endomorphism<string> =>
  (value) =>
    `${prefix}${value}${suffix}`

const parens = wrap("(", ")")
const brackets = wrap("[", "]")
const quote = wrap('"', '"')
const period = wrap("", ".")

/**
 * Applies `f` to a non-empty string. An empty string stays empty, so the
 * result drops out of a separator monoid.
 */
const mapNonEmpty =
  (f: Endomorphism<string>): Endomorphism<string> =>
  (value) =>
    pipe(
      value,
      OfromPredicate(isNonEmptyString),
      Omap(f),
      OgetOrElse(constant("")),
    )

/**
 * Folds a list of field renderers into one renderer with `monoid`.
 */
const concatFields =
  <A>(monoid: Monoid<string>) =>
  (fields: ReadonlyArray<(value: A) => string>): ((value: A) => string) =>
    MconcatAll(FgetMonoid(monoid)<A>())(fields)

export {
  separatorMonoid,
  Space,
  Comma,
  Semicolon,
  Colon,
  Label,
  MiddleDot,
  EmDash,
  Newline,
  joinSpace,
  joinComma,
  joinSemicolon,
  joinMiddleDot,
  joinLines,
  collapseWhitespace,
  wrap,
  parens,
  brackets,
  quote,
  period,
  mapNonEmpty,
  concatFields,
}
