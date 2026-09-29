import { flow } from "fp-ts/function"
import { split as Ssplit, Monoid as SMonoid } from "fp-ts/string"
import { intercalate as RNEAintercalate } from "fp-ts/ReadonlyNonEmptyArray"

// replace spaces with "+" for the URL segment
const cleanQuery = flow(Ssplit("+"), RNEAintercalate(SMonoid)(" "))

export { cleanQuery }
