import { pipe } from "fp-ts/function"
import { capitalizeFirstCharacter } from "./stringCapitalizations"

const appendPayer = (string: string) => `payer${string}`

const convertToPayerField = (name: string) =>
  pipe(name, capitalizeFirstCharacter, appendPayer)

export { convertToPayerField }
