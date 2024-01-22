import { pipe } from "fp-ts/function"
import { getOrElse } from "fp-ts/lib/Option"
import { split, isEmpty as stringIsEmpty, Eq as stringEq } from "fp-ts/string"
import { filter as arrayFilter, difference, last } from "fp-ts/ReadonlyArray"

const viewModes = ["show", "editable", "edit"]

const getLastPathSegment = (pathname: string) =>
  pipe(
    pathname,
    split("/"),
    arrayFilter((bs) => !stringIsEmpty(bs)),
    difference(stringEq)(viewModes),
    last,
    getOrElse(() => ""),
  )

export { getLastPathSegment }
