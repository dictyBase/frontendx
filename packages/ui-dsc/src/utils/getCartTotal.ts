import { type StrainItems } from "../types"
import { toCurrencyString } from "./toCurrencyString"

const getCartTotal = (items: StrainItems) => {
  const total = items
    .map((item) => Number(item.fee))
    .reduce((accumulator, value) => accumulator + value)
  return toCurrencyString(total)
}

export { getCartTotal }
