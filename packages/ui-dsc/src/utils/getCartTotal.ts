import { type StrainItem } from "../types"
import { toCurrencyString } from "./toCurrencyString"

const getCartTotal = (items: Array<StrainItem>) => {
  const total = items
    .map((item) => item.quantity * Number(item.fee))
    .reduce((accumulator, value) => accumulator + value)
  return toCurrencyString(total)
}

export { getCartTotal }
