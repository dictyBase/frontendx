import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  head as RNEAhead,
  last as RNEAlast,
  init as RNEAinit,
} from "fp-ts/ReadonlyNonEmptyArray"
import { map as RAmap, reduce as RAreduce } from "fp-ts/ReadonlyArray"
import { bindTo as IbindTo, let as Ilet } from "fp-ts/Identity"
import { split } from "fp-ts/string"

const shortenName = (name: string) =>
  pipe(
    name,
    IbindTo("full"),
    Ilet("parts", ({ full }) => pipe(full, split(" "))),
    Ilet("surname", ({ parts }) => RNEAlast(parts)),
    Ilet("given", ({ parts }) => RNEAinit(parts)),
    Ilet("firstInitials", ({ given }) =>
      pipe(
        given,
        RAmap((n) => pipe(n, split(""), RNEAhead)),
        RAreduce("", (b, a) => b + a),
      ),
    ),
    ({ firstInitials, surname }) => `${firstInitials} ${surname}`,
  )

const shortenAllNames = (names: Array<string>) => pipe(names, Amap(shortenName))

export { shortenAllNames }
