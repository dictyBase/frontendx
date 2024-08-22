import {
  split as splitString,
  slice as sliceString,
  toUpperCase,
} from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"
import { ReadonlyNonEmptyArray, head, last } from "fp-ts/ReadonlyNonEmptyArray"
import { pipe } from "fp-ts/function"

/**
 * Matches the given array of roles against the expected array of roles.
 */
const matchEntries = (given: Array<string>, expected: Array<string>) =>
  expected.length < given.length
    ? expected.every((entry) => given.includes(entry))
    : given.every((entry) => expected.includes(entry))

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

export { firstLast, upperFirst, nameToUpperInitial, matchEntries }
