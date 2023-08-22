import { type StrainCartItem } from "../types"
import { toCurrencyString } from "./toCurrencyString"

const getCartTotal = (items: Array<StrainCartItem>) => {
  const total = items
    .map((item) => Number(item.fee))
    .reduce((accumulator, value) => accumulator + value, 0)
  return toCurrencyString(total)
}

export { getCartTotal }
