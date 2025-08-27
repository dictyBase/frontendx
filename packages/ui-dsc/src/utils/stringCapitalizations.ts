import { flow } from "fp-ts/function"
import { split as Ssplit, toUpperCase } from "fp-ts/string"
import {
  modifyHead as RNEAmodifyHead,
  reduce as RNEAreduce,
} from "fp-ts/ReadonlyNonEmptyArray"
/**
 * capitalizeFirstCharacter converts the first character of a string to uppercase.
 */
const capitalizeFirstCharacter = flow(
  Ssplit(""),
  RNEAmodifyHead(toUpperCase),
  RNEAreduce("", (accumulator, current) => accumulator + current),
)

/**
 * capitalizeEveryWordInString takes a string with spaces (i.e. "other stock centers" and capitalizes each word.
 */
const capitalizeEveryWordInString = (string_: string) =>
  string_
    .split(" ")
    .map((item) => capitalizeFirstCharacter(item))
    .join(" ")

export { capitalizeEveryWordInString, capitalizeFirstCharacter }
