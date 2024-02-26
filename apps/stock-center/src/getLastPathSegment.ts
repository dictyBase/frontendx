import { pipe } from "fp-ts/function"
import { getOrElse } from "fp-ts/lib/Option"
import { split, isEmpty as stringIsEmpty, Eq as stringEq } from "fp-ts/string"
import { filter as arrayFilter, difference, last } from "fp-ts/ReadonlyArray"

const viewModes = ["show", "editable", "edit"]

/**
 * Returns the last segment of the given pathname after splitting it by '/'.
 * It filters out empty segments, removes any segments that match the viewModes array,
 * and returns the last remaining segment.
 *
 * @param pathname - The pathname to extract the last segment from.
 * @returns The last segment of the pathname, or an empty string if no segment is found.
 */
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
