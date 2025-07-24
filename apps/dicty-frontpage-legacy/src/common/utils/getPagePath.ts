import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty, Monoid as SMonoid } from "fp-ts/string"
import { filter as Afilter, intercalate as Sintercalate } from "fp-ts/Array"

const getPagePath = (section: string, name: string, subname: string) =>
  pipe(
    [section, name, subname],
    Afilter((s) => !SisEmpty(s)),
    Sintercalate(SMonoid)("/"),
  )

export { getPagePath }
