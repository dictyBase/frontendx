import { pipe } from "fp-ts/function"
import { slice, trimRight } from "fp-ts/string"

const appendEllipses = (input: string) => `${input}...`

const abbreviateStringToLength = (length: number) => (input: string) => {
  if (input.length <= length) return input

  return pipe(input, slice(0, length), trimRight, appendEllipses)
}

export { abbreviateStringToLength }
