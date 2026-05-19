import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { isEmpty as SisEmpty } from "fp-ts/string"

const appendWithNewline = (base: string, add: string) =>
  pipe(
    base,
    SisEmpty,
    Bmatch(
      () => `${base}\n\n${add}`,
      () => add,
    ),
  )

export { appendWithNewline }
