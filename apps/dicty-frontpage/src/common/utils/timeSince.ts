import { pipe } from "fp-ts/function"
import { mapSnd as TmapSnd, snd as Tsnd, fst as Tfst } from "fp-ts/Tuple"
import {
  head as Ahead,
  map as Amap,
  sort as Asort,
  filter as Afilter,
} from "fp-ts/Array"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import { Ord as NOrd } from "fp-ts/number"
import { contramap, Ord } from "fp-ts/Ord"

const ordByTimeValue: Ord<[string, number]> = pipe(
  NOrd,
  contramap((tuple) => Tsnd(tuple)),
)

const timeSince = (date: string) => {
  const secondsElapsed = (Date.now() - new Date(date).getTime()) / 1000

  const unitMap: Array<[string, number]> = [
    ["minute", 60],
    ["hour", 60 * 60],
    ["day", 60 * 60 * 24],
    ["week", 60 * 60 * 24 * 7],
    ["month", 60 * 60 * 24 * 31],
    ["year", 60 * 60 * 24 * 365],
  ]

  return pipe(
    unitMap,
    // convert secondsElapsed into each time unit
    Amap(TmapSnd((unit) => secondsElapsed / unit)),
    // Filter out the units where the value is less than 1
    Afilter((tuple) => Tsnd(tuple) >= 1),
    // Sort the array by numerical value of the time units
    Asort(ordByTimeValue),
    // Get the unit with the lowest numerical value
    Ahead,
    // If there are no time units whose value is at least 1, use seconds.
    OgetOrElse(() => ["second", secondsElapsed] as [string, number]),
    // Remove decimals from the time value
    TmapSnd((t) => Math.floor(t)),
    (tuple) =>
      Tsnd(tuple) === 1
        ? `${Tsnd(tuple)} ${Tfst(tuple)}`
        : `${Tsnd(tuple)} ${Tfst(tuple)}s`,
  )
}

export { timeSince }
