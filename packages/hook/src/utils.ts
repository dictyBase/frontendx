import { flow } from "fp-ts/function"
import { Semigroup, split as Ssplit, toUpperCase } from "fp-ts/string"
import { modifyHead, concatAll } from "fp-ts/ReadonlyNonEmptyArray"

const capitalizeFirst = flow(
  Ssplit(""),
  modifyHead(toUpperCase),
  concatAll(Semigroup),
)

export { capitalizeFirst }
