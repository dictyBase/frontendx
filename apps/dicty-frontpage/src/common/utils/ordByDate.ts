import { fromCompare } from "fp-ts/Ord"
import { Ordering } from "fp-ts/Ordering"
import { isAfter, isBefore, isEqual } from "date-fns"
import { match } from "ts-pattern"

const dateCompare = (first: Date, second: Date): Ordering =>
  match<{ first: Date; second: Date }, Ordering>({ first, second })
    .when(
      ({ first: f, second: s }) => isAfter(f, s),
      () => -1,
    )
    .when(
      ({ first: f, second: s }) => isEqual(f, s),
      () => 0,
    )
    .when(
      ({ first: f, second: s }) => isBefore(f, s),
      () => 1,
    )
    .otherwise(() => 0)

const ordByDate = fromCompare(dateCompare)

export { ordByDate }
