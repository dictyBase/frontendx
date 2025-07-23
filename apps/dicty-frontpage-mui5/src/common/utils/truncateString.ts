import { pipe } from "fp-ts/function"
import { slice as Sslice } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"

const truncateString = (s: string, toLength: number) => {
  const truncate = (a: string) =>
    pipe(a, Sslice(0, toLength), (sliced) => `${sliced}...`)

  return pipe(
    s.length,
    (size) => size > toLength,
    Bmatch(
      () => s,
      () => truncate(s),
    ),
  )
}

export { truncateString }
