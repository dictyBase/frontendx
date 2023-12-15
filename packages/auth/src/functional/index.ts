import {
  split as splitString,
  slice as sliceString,
  toUpperCase,
  Eq,
} from "fp-ts/string"
import { map as Amap, getEq, elem, every } from "fp-ts/Array"
import { ReadonlyNonEmptyArray, head, last } from "fp-ts/ReadonlyNonEmptyArray"
import { pipe } from "fp-ts/function"

/**
 * Matches the given array of roles against the expected array of roles.
 */
const matchRoles = (given: Array<string>, expected: Array<string>) => {
  switch (true) {
    case expected.length > given.length:
      return false
    case expected.length == given.length:
      return getEq(Eq).equals(expected, given)
  }
  return pipe(
    expected,
    every((v) => pipe(expected, elem(Eq)(v))),
  )
}

const firstLast = (nameArray: ReadonlyNonEmptyArray<string>) => [
  head(nameArray), // Returns the first element of the nameArray
  last(nameArray), // Returns the last element of the nameArray
]

const upperFirst = (fullname: string) =>
  pipe(
    fullname, // The input fullname string
    sliceString(0, 1), // Takes the first character of the string
    toUpperCase, // Converts the first character to uppercase
  )

const nameToUpperInitial = (fullName: string) =>
  pipe(
    fullName, // The input fullName string
    splitString(" "), // Splits the string into an array of words
    firstLast, // Returns an array containing the first and last words
    Amap(upperFirst), // Applies the upperFirst function to each word in the array
  ).join("") // Joins the array of uppercased initials into a single string

export { nameToUpperInitial, matchRoles }
